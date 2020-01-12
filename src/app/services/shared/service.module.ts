import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingService, SharedService, SidebarService, UsuarioService, HospitalService, MedicoService, LoginGuard } from '../service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingService,
    SharedService,
    SidebarService,
    UsuarioService,
    HospitalService,
    MedicoService,
    ModalUploadService,
    LoginGuard
  ]
})
export class ServiceModule { }
