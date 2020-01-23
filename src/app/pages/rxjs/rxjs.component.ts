import { Component, OnInit, OnDestroy } from '@angular/core';

import { retry, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

suscripcion: Subscription;
  constructor() {
    this.suscripcion = this.regresaObserable().pipe(
      retry(2)
    )
    .subscribe(
      numero => console.log('Sub', numero),
      error => console.error('error', error),
      () => console.log('obserador termino')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.suscripcion.unsubscribe();
  }
  regresaObserable(): Observable<number> {
    return new Observable( observe => {
      let contador = 0;
      let interval = setInterval(() => {
        contador += 1;
        let salida = {
          valor: contador
        };
        observe.next(salida);
        // if (contador === 3) {
        //   clearInterval(interval);
        //   observe.complete();
        // }
        //if (contador === 2) {
          //clearInterval(interval);
         // observe.error('auxilio');
        //}
      }, 1000);
    }).pipe(
      map((resp: any) => resp.valor),
      filter((valor, index) => {
        console.log('filter', valor, index);
        return true;
      })
    );
  }

}
