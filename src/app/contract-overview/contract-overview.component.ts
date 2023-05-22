import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Contract {
  id: number;
  monthlyRate: number;
  vehicle: {
    id: number;
    brand: string;
    model: string;
    modelYear: number;
    vin: string;
    price: number;
  };
  customer: {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
  };
}

@Component({
  selector: 'app-contract-overview',
  templateUrl: './contract-overview.component.html',
  styleUrls: ['./contract-overview.component.scss']
})
export class ContractOverviewComponent implements OnInit {
  contracts: Contract[] = [];
  private Object: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchContracts();
  }

  fetchContracts() {
    this.http.get<any[]>('../../assets/data/contracts.json').subscribe(
        (response: Contract[]) => {
          console.log('response overview', response)
          this.contracts = response;
        },
        (error: any) => {
          console.error('Failed to fetch contracts:', error);
        }
    );
  }
}
