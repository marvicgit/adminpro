import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  oculto = '';
  imageSubir: File;
  imageTemp: string | ArrayBuffer;
  constructor(public subirArchivoService: SubirArchivoService,
              public modalUploadService: ModalUploadService
             ) { }

  ngOnInit() {
    console.log('modal listo');
  }

  cerrarModal() {
    this.imageTemp = null;
    this.imageSubir = null;
    this.modalUploadService.ocultarModal();
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
    reader.onloadend = () => this.imageTemp = reader.result.toString();
    console.log(this.imageTemp );
  }

  subirImagen() {
    this.subirArchivoService.subirArchivo(this.imageSubir, this.modalUploadService.tipo, this.modalUploadService.id)
    .then((resp) => {
      this.modalUploadService.notificacion.emit(resp);
      this.cerrarModal();
    }).catch((err) => {
      console.log('Error en la carga ...');
    });
  }

}
