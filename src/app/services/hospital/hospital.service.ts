import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  hospital: Hospital;
  constructor(public router: Router,
              public http: HttpClient,
              public subirArchivo: SubirArchivoService,
              public usuarioService: UsuarioService) { }

  cargarHospitales(desde: number = 0) {
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url);
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => resp.hospital)
    );
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url);
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.usuarioService.token;
    return this.http.post(url, { nombre: nombre }).pipe(
      map((resp: any) => {
        Swal.fire('Hospital Creado!', resp.nombre, 'success');
        return resp.usuario;
      }));
  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe( map((resp: any) => resp.hospitales));
  }

  actualizarHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.usuarioService.token;
    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        Swal.fire('Hospital Actualizado!', hospital.nombre, 'success');
        return true;
      }));
  }
}
