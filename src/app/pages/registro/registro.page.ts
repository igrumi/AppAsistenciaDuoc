import { ViewWillEnter } from '@ionic/angular';
import { Usuario } from './../../model/Usuario';
import { DatabaseService } from './../../services/database.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { showAlert, showAlertDUOC, showAlertError } from 'src/app/model/Message';
import { capSQLiteChanges, DBSQLiteValues } from '@capacitor-community/sqlite';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements ViewWillEnter {

  correo = '';
  password = '';
  nombre = '';
  preguntaSecreta = '';
  respuestaSecreta = '';
  sesionActiva = '';
  cantidad = 0;

  constructor(private router: Router, private db: DatabaseService) { }

  ionViewWillEnter(): void {
    this.setUsersLength();
  }

  setUsersLength() {
    this.db.readUsers().then((resp: DBSQLiteValues) => {
      this.cantidad = resp.values.length;
    }).catch((err) => {
      showAlertError('CreateUserPage.setUsersLenght', err);
    });
  }

  async registerNewUser() {

    await this.db.createUser(
      this.correo,
      this.password,
      this.nombre,
      this.preguntaSecreta,
      this.respuestaSecreta,
      'N'
    ).then((resp: capSQLiteChanges) => {
      if (resp.changes.changes === 1) {
        showAlertDUOC('Su cuenta fue creada con éxito');
        this.router.navigate(['login']);
      } else {
        showAlertDUOC('Su cuenta no pudo ser creada con éxito. Comuníquese con el Administrador del Sistema o intente nuevamente más tarde');
      }
    }).catch((err) => {
      showAlertError('CreateUserPage.registerNewUser', err);
    });
  }

  async createTestingUsers() {
    try {
      await this.db.createUser('atorres@duocuc.cl', '1234', 'Ana Torres Leiva', 'Nombre de su mascota', 'gato', 'N');
      await this.db.createUser('avalenzuela@duocuc.cl', 'qwer', 'Alberto Valenzuela Núñez', 'Nombre de su mejor amigo', 'juanito', 'N');
      await this.db.createUser('cfuentes@duocuc.cl', 'asdf', 'Carla Fuentes González', 'Lugar de nacimiento de su madre', 'Valparaíso', 'N');
      showAlertDUOC('Fueron creados 3 usuarios de prueba');
      this.setUsersLength();
    } catch(err) {
      showAlertError('CreateUserPage.createTestingUsers', err);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
