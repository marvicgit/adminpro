import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http: HttpClient,
              public usuarioService: UsuarioService) { }

  cargarMedicos(desde: number = 0) {
    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url);
  }

  obtenerMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => resp.medico)
    );
  }

  buscarMedico(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe( map((resp: any) => resp.medicos));
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url);
  }

  crearMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';
    url += '?token=' + this.usuarioService.token;
    return this.http.post(url, medico).pipe(
      map((resp: any) => {
        Swal.fire('Medico Creado!', resp.nombre, 'success');
        return resp.body;
      }));
  }

  actualizarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico/' + medico._id;
    url += '?token=' + this.usuarioService.token;
    return this.http.put(url, medico).pipe(
      map((resp: any) => {
        Swal.fire('Medico Actualizado!', resp.nombre, 'success');
        return resp.body;
      }));
  }
}
