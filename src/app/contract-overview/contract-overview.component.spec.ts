import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContractOverviewComponent } from './contract-overview.component';

describe('ContractOverviewComponent', () => {
  let component: ContractOverviewComponent;
  let fixture: ComponentFixture<ContractOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Add the HttpClientTestingModule
      declarations: [ContractOverviewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should fetch contracts on initialization', () => {
    spyOn(component, 'fetchContracts'); // Spy on the fetchContracts method

    fixture.detectChanges(); // Trigger component initialization

    expect(component.fetchContracts).toHaveBeenCalled();
  });
});
