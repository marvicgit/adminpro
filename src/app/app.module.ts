import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/shared/service.module';
import { DatamartComponent } from './components/datamart/datamart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DatamartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
