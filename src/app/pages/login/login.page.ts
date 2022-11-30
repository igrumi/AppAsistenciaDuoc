import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { showAlertDUOC } from 'src/app/model/Message';
import { AuthService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  correo: string = '';
  password: string = '';
  darkMode: boolean = false;

  constructor(private auth: AuthService, private readonly dbService:  DatabaseService, 
    private readonly router: Router) {
    this.correo = '';
    this.password = '';
    //mostrarEjemplosDeMensajes();
    const prefersDark = window.matchMedia('prefers-color-scheme: dark');
    this.darkMode = prefersDark.matches;
  }

  intercambiarModoOscuro(event) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }

  async ingresar() {
    console.log("asd  ")
    //this.auth.login(this.correo, this.password);
    this.auth.login(this.correo, this.password)
    /*
    this.dbService.readUsers().then(res => {
      console.log(res);
    })*/
  }

  recuperar() {
    this.router.navigate(['/correo']);
  }

  registrar() {
    // showAlertDUOC('Programa aquí el registro de nuevos usuarios.');
    this.router.navigate(['/registro']);
  }

  gestUsuarios() {
    this.router.navigate(['/users']);
  }

  
}
