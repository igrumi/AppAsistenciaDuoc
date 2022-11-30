import { Usuario } from './../../model/Usuario';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { timingSafeEqual } from 'crypto';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  correo: string = '';
  userForgetData: any;
  constructor(private router: Router,
    private db: DatabaseService,
    private storage: StorageService) { }

  ngOnInit() {
  }

  ingresarPaginaValidarRespuestaSecreta() {
    console.log(this.correo);
    if(this.correo.trim().length === 0) {
      alert('Ingrese un correo valido');
      return;
    }
    this.db.readUsers().then(usuarios => {
      console.log(usuarios.values);
      this.userForgetData = (usuarios.values).filter(usuario => {
        return usuario.correo === this.correo;
      });

      if(this.userForgetData.length === 0) {
        alert('La cuenta no existe');
        return;
      }

      this.storage.setItem('USER_FORGOT_DATA', JSON.stringify(this.userForgetData[0]));
      this.router.navigate(['/pregunta']);
    })
  }

}
