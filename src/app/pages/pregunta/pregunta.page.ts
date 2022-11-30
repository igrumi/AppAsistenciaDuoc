import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {
  public nombre: string;
  public respuestaEsperada: string;
  public respuesta: string = '';
  public password: string;
  public pregunta: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: StorageService){
  }

  ngOnInit() {
    this.storage.getItem('USER_FORGOT_DATA').then(data => {
      const dataOlvidada = JSON.parse(data.value);
      this.pregunta = dataOlvidada.preguntaSecreta
      this.nombre = dataOlvidada.nombre;
      this.password = dataOlvidada.password;
      this.respuestaEsperada = dataOlvidada.respuestaSecreta;
      console.log(this.nombre, this.password, this.respuestaEsperada);
    });
  }

  validarRespuestaSecreta() {
    if(this.respuesta.trim().length === 0) {
      alert('Debe ingresar una respuesta');
      return;
    }

    if(this.respuesta.trim() === this.respuestaEsperada) {
      alert(`Respuesta correcta, Tu contraseña: ${this.password}`);
    }else {
      alert(`Respuesta incorrecta :(`);
    }
  }
}
