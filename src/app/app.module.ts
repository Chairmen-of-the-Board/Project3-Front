import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DarkmodeComponent } from './components/darkmode/darkmode.component';
import { SendComponent } from './components/send/send.component';
import { SendHistoryComponent } from './components/send-history/send-history.component';

import { RequestComponent } from './components/request/request.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { ChartsComponent } from './components/charts/charts.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

import { MoneyPipe } from './pipes/moneypipe';
import { TransferComponent } from './components/transfer/transfer.component';
import { TransferListComponent } from './components/transfer-list/transfer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    HomeComponent,
    NavbarComponent,
    DarkmodeComponent,
    RequestListComponent,
    RequestComponent,
    RequestFormComponent,
    ChartsComponent,
    SendComponent,
    SendHistoryComponent,
    UpdateProfileComponent,
    MoneyPipe,
    TransferComponent,
    TransferListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
