import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imageSubir: File;
  imageTemp: string | ArrayBuffer;
  constructor(public usuarioService: UsuarioService ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(data: Usuario) {
    this.usuario.nombre = data.nombre;
    if (this.usuario.google) {
      this.usuario.email = data.email;
    }
    this.usuarioService.actualizarUsuario(this.usuario).subscribe((resp) => {
      console.log(resp);
    });
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imageSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo Imagenes!', 'El archivo seleccionado no es imagen', 'error');
      this.imageSubir = null;
      return;
    }
    this.imageSubir = archivo;
    const reader = new FileReader();
    const urlImageTemp =  reader.readAsDataURL(archivo);
    //reader.onloadend =  () => this.imageTemp = reader.result;
    reader.onloadend = () => this.imageTemp = reader.result.toString();
    console.log(this.imageTemp );
  }

  cambiarImagen() {
    this.usuarioService.cambiarImagen(this.imageSubir, this.usuario._id);
  }
}
