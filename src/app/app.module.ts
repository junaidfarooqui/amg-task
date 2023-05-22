import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContractOverviewComponent } from './contract-overview/contract-overview.component';
import { ContractEditComponent } from './contract-edit/contract-edit.component';

// Define your routes
const routes: Routes = [
  { path: '', component: ContractOverviewComponent }, // Example route for ContractOverviewComponent
  { path: 'edit-contract/:id', component: ContractEditComponent }, // Example route for ContractEditComponent
  // Add more routes as needed
];

@NgModule({
  declarations: [
    AppComponent,
    ContractOverviewComponent,
    ContractEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes), // Add RouterModule and configure routes
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}