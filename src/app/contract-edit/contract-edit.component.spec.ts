import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContractEditComponent } from './contract-edit.component';

describe('ContractEditComponent', () => {
  let component: ContractEditComponent;
  let fixture: ComponentFixture<ContractEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractEditComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Add more test cases as needed

  // Example test case for the onCustomerSelected method
  it('should update the form values when a customer is selected', () => {
    const customerId = 1;
    const event = { target: { value: customerId } };

    component.customers = [
      { id: 1, firstName: 'John', lastName: 'Doe', birthDate: '1990-01-01' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', birthDate: '1995-02-02' }
    ];

    component.onCustomerSelected(event);

    expect(component.contractForm.get('id')?.value).toEqual(customerId);
    expect(component.contractForm.get('firstName')?.value).toEqual('John');
    expect(component.contractForm.get('lastName')?.value).toEqual('Doe');
    expect(component.contractForm.get('birthDate')?.value).toEqual('1990-01-01');
  });

  // Example test case for the onVehicleSelected method
  it('should update the form values when a vehicle is selected', () => {
    const vehicleId = 1;
    const event = { target: { value: vehicleId } };

    component.vehicles = [
      { id: 1, brand: 'Toyota', model: 'Camry', modelYear: 2020, vin: '123456789', price: 25000 },
      { id: 2, brand: 'Honda', model: 'Accord', modelYear: 2021, vin: '987654321', price: 28000 }
    ];

    component.onVehicleSelected(event);

    expect(component.contractForm.get('vehicleId')?.value).toEqual(vehicleId);
    expect(component.contractForm.get('brand')?.value).toEqual('Toyota');
    expect(component.contractForm.get('model')?.value).toEqual('Camry');
    expect(component.contractForm.get('modelYear')?.value).toEqual(2020);
    expect(component.contractForm.get('vin')?.value).toEqual('123456789');
    expect(component.contractForm.get('price')?.value).toEqual(25000);
  });

  // Add more test cases for other methods and functionality

});