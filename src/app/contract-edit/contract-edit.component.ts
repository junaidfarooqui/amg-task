declare var require: any;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
const updateJsonService = require('../../update-json-service/update-json-service');

@Component({
  selector: 'app-edit-contract',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.scss']
})
export class ContractEditComponent implements OnInit {
  vehicleAlreadyAssigned: boolean = false;
  contractId: string = '';
  contractForm!: FormGroup;
  customers: any[] = [];
  vehicles: any[] = [];

  constructor(
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private router: Router
  ) {}

  ngOnInit() {
    this.contractForm = this.formBuilder.group({
      // Customer fields
      firstName: [''],
      lastName: [''],
      birthDate: [''],

      // Vehicle fields
      brand: [''],
      model: [''],
      modelYear: [''],
      vin: [''],
      price: [''],

      // Contract fields
      id: [''],
      customerId: [''],
      vehicleId: [''],
      monthlyRate: ['']
    });

    this.route.paramMap.subscribe((params: { get: (arg0: string) => any; }) => {
      const id = params.get('id');
      this.contractId = id !== null ? id : '';
      console.log('Contract ID:', this.contractId);

      // Fetch the existing contract data based on the contract ID
      this.http.get<any>('assets/data/contracts.json').subscribe(
          (response: any) => {
            const existingContract = response.find((contract: { id: any; }) => contract.id == this.contractId);
            if (existingContract) {
              // Populate the form with the existing contract data
              this.contractForm.patchValue({
                firstName: existingContract.customer.firstName,
                lastName: existingContract.customer.lastName,
                birthDate: existingContract.customer.birthDate,
                brand: existingContract.vehicle.brand,
                model: existingContract.vehicle.model,
                modelYear: existingContract.vehicle.modelYear,
                vin: existingContract.vehicle.vin,
                price: existingContract.vehicle.price,
                id: existingContract.id,
                customerId: existingContract.customer.id,
                vehicleId: existingContract.vehicle.id,
                monthlyRate: existingContract.monthlyRate
              });
            }
          },
          (error: any) => {
            console.error('Failed to fetch contract:', error);
          }
      );
    });

    this.fetchCustomers();
    this.fetchVehicles();
  }

  onCustomerSelected(event: any) {
    const customerId = parseInt(event.target.value); // Convert to number if necessary
    const selectedCustomer = this.customers.find((customer: { id: any; }) => customer.id === customerId);

    if (selectedCustomer) {
      // Set the customer values in the form
      this.contractForm.patchValue({
        id: customerId,
        firstName: selectedCustomer.firstName,
        lastName: selectedCustomer.lastName,
        birthDate: selectedCustomer.birthDate
      });
    }
  }

  onVehicleSelected(event: any) {
    const vehicleId = parseInt(event.target.value);
    const selectedVehicle = this.vehicles.find((vehicle: { id: any; }) => vehicle.id === vehicleId);

    if (selectedVehicle) {
      // Set the vehicle values in the form
      this.contractForm.patchValue({
        vehicleId: vehicleId,
        brand: selectedVehicle.brand,
        model: selectedVehicle.model,
        modelYear: selectedVehicle.modelYear,
        vin: selectedVehicle.vin,
        price: selectedVehicle.price
      });
    }
  }

  fetchCustomers() {
    this.http.get<any[]>('assets/data/customers.json').subscribe(
        (response: any[]) => {
          this.customers = response;
        },
        (error: any) => {
          console.error('Failed to fetch customers:', error);
        }
    );
  }

  fetchVehicles() {
    this.http.get<any[]>('assets/data/vehicles.json').subscribe(
        (response: any[]) => {
          this.vehicles = response;
        },
        (error: any) => {
          console.error('Failed to fetch vehicles:', error);
        }
    );
  }

  populateFormWithData() {
    // Fetch the existing contract data based on the contractId
    this.http.get<any>('assets/data/contracts.json').subscribe(
        (response: any) => {
          const contract = response.find((contract: { id: string; }) => contract.id === this.contractId);

          if (contract) {
            // Set the form values with the existing contract data
            this.contractForm.patchValue({
              // Customer fields
              firstName: contract.customer.firstName,
              lastName: contract.customer.lastName,
              birthDate: contract.customer.birthDate,

              // Vehicle fields
              brand: contract.vehicle.brand,
              model: contract.vehicle.model,
              modelYear: contract.vehicle.modelYear,
              vin: contract.vehicle.vin,
              price: contract.vehicle.price,

              // Contract fields
              id: contract.id,
              customerId: contract.customer.id,
              vehicleId: contract.vehicle.id,
              monthlyRate: contract.monthlyRate
            });
          }
        },
        (error: any) => {
          console.error('Failed to fetch contract data:', error);
        }
    );
  }

  getSelectedCustomerName(): string {
    const selectedCustomerId = this.contractForm.get('customerId')?.value;
    const selectedCustomer = this.customers.find((customer: { id: any; }) => customer.id == selectedCustomerId);
    return selectedCustomer ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}` : '';
  }

  getSelectedVehicleInfo(): string {
    const selectedVehicleId = this.contractForm.get('vehicleId')?.value;
    const selectedVehicle = this.vehicles.find(vehicle => vehicle.id == selectedVehicleId);
    return selectedVehicle ? `${selectedVehicle.brand} ${selectedVehicle.model}` : '';
  }

  saveContract() {
    // Get the form values
    const formData = this.contractForm.value;
    const monthlyRate = formData.monthlyRate;

    // Update the contract with the new values
    const updatedContract = {
      id: this.contractId,
      monthlyRate: monthlyRate,
      vehicle: {
        id: formData.vehicleId,
        brand: formData.brand,
        model: formData.model,
        modelYear: formData.modelYear,
        vin: formData.vin,
        price: formData.price
      },
      customer: {
        id: formData.customerId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.birthDate
      },
    };

    const host = 'http://localhost:443';
    const vehiclesUrl = host + '/api/vehicles';

    // Check if the vehicle is already assigned to a contract
    this.http.get<any[]>(vehiclesUrl + '/' + formData.vehicleId).subscribe(
        (vehicleResponse: any[]) => {
          const assignedContractId = vehicleResponse.length > 0 ? vehicleResponse[0].id : null;
          if (assignedContractId && assignedContractId !== this.contractId) {
            console.error('Vehicle is already assigned to a contract');
            this.vehicleAlreadyAssigned = true;
            return;
          }

          // Send the updated contract data to the API
          this.http.put(host + '/api/contract', updatedContract).subscribe(
              (response: any) => {
                console.log('Contract updated successfully', response);
                // Handle any additional logic or UI updates here
                // Redirect to the contract overview page or any other desired page
                this.router.navigate(['/']);
              },
              (error: any) => {
                console.error('Failed to update contract', error);
                // Handle error cases and display appropriate messages
              }
          );
        },
        (error: any) => {
          console.error('Failed to check vehicle assignment', error);
          // Handle error cases and display appropriate messages
        }
    );
  }


}