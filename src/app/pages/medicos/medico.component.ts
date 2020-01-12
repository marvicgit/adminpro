import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');
  constructor(public medicoService: MedicoService,
              public hospitalService: HospitalService,
              public router: Router,
              public route: ActivatedRoute,
              public modalUploadService: ModalUploadService) {
                this.route.params.subscribe(params => {
                  let id = params['id'];
                  if (id !== 'nuevo') {
                    this.cargarMedico(id);
                  }
                });
               }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe((resp) => {
      this.medico.img = resp.medico.img;
    });
  }

  cargarHospitales() {
    //this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
      //this.cargando = false;
    });
  }

  cargarMedico(id: string) {
    //this.cargando = true;
    this.medicoService.obtenerMedico(id).subscribe((medico: any) => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
      //this.cargando = false;
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    if (this.medico._id) {
      this.medicoService.actualizarMedico(this.medico).subscribe((medico: any) => {
        this.medico._id = medico._id;
      });
    } else {
      this.medicoService.crearMedico(this.medico).subscribe((medico: any) => {
        this.medico._id = medico._id;
      });
    }
    this.router.navigate(['/medico', this.medico._id]);
  }

  cambioHospital(id: string) {
    this.hospitalService.obtenerHospital(id).subscribe((hospital) => this.hospital = hospital);
  }

  mostrarModal() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
