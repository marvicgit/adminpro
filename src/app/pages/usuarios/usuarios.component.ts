import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  constructor(public usuarioService: UsuarioService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe((resp) => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.totalRegistros = resp.total;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuarios(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.usuarioService.buscarUsuario(termino).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });
  }

  borrarUsuario(usuario: Usuario){
    if (usuario._id === this.usuarioService.usuario._id) {
      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta apunto de borrar a' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.borrarUsuario(usuario._id).subscribe(() => {
          Swal.fire(
            'Borrado!',
            'El registro fue borrado correctamente.',
            'success'
          );
          this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }
}
