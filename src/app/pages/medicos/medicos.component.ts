import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  constructor(public medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos(this.desde).subscribe((resp: any) => {
      this.medicos = resp.medicos;
      this.totalRegistros = resp.total;
      this.cargando = false;
    });
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      return;
    }
    this.medicoService.buscarMedico(termino).subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
    });
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta apunto de borrar a' + medico.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico._id).subscribe(() => {
          Swal.fire(
            'Borrado!',
            'El registro fue borrado correctamente.',
            'success'
          );
          this.cargarMedicos();
        });
      }
    });
  }

}
