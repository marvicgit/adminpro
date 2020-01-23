import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService) {

  }
  canActivate(): Promise<boolean> | boolean {
    let token = this.usuarioService.token;
    let payLoad= JSON.parse(atob(token.split('.')[1]));
    let expirado =  this.expirado(payLoad.exp);
    if (expirado) {
      this.usuarioService.logout();
      return false;
    }
    return this.verificaRefreshToken(payLoad.exp);
  }

  verificaRefreshToken(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(fechaExp*1000);
      let ahora = new Date();
      ahora.setTime(ahora.getTime()+ (4*60*60*100));
      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.usuarioService.refreshToken().subscribe(() => {
          resolve(true);
        }, () => {
          reject(false);
        });
      }
      resolve(true);
    });
  }
  expirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;
    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }
}
