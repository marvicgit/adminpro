import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard, AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const routes: Routes = [
      { 
        path: 'dashboard',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
        canActivate: [VerificaTokenGuard]
      },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
      { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
      { path: 'promesa', component: PromesaComponent, data: { titulo: 'Promesa' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
      { path: 'account-setting', component: AccountSettingComponent, data: { titulo: 'Ajustes de Tema' } },
      { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },
      { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
      { 
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Usuarios' }
      },
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar de Medico' } },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
