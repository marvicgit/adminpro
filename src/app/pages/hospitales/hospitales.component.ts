import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { HospitalService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  constructor(public hospitalService: HospitalService,
              public modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe((resp) => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde).subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
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
    this.cargarHospitales();
  }

  buscarHospitales(termino: string) {
    if (termino.length <= 0) {
      return;
    }
    this.hospitalService.buscarHospital(termino).subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    });
  }

  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta apunto de borrar a' + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.hospitalService.borrarHospital(hospital._id).subscribe(() => {
          Swal.fire(
            'Borrado!',
            'El registro fue borrado correctamente.',
            'success'
          );
          this.cargarHospitales();
        });
      }
    });
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe();
  }

  crearHospital() {
    Swal.fire({
      title: 'Crear Hospital',
      input: 'text',
      showCancelButton: true
    }).then((result) => {
        if (!result.value || result.value.length === 0) {
            return;
        }
        this.hospitalService.crearHospital(result.value).subscribe(() => this.cargarHospitales());
    });
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('hospitales', id);
  }
}
