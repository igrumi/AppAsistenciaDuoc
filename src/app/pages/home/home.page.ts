import { StorageService } from './../../services/storage.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;

  nombreUsuario: string;
  correo: string;

  constructor(
        private activeroute: ActivatedRoute
      , private router: Router
      , private alertController: AlertController,
      private storage: StorageService,
      private auth: AuthService, private animationController: AnimationController) {
  } 

  public ngOnInit() {
    this.storage.getItem('USER_DATA').then(data => {
      this.nombreUsuario = JSON.parse(data.value).nombre;
      console.log(this.nombreUsuario);
    });
  }

  public ngAfterViewInit(): void {
    const animation = this.animationController
      .create()
      .addElement(this.titulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(0%)', 'translate(100%)')
      .fromTo('opacity', 0.2, 1);
  
    animation.play();
  }

  cerrarSesion() {
    this.storage.getItem('USER_DATA').then(data => {
      this.nombreUsuario = JSON.parse(data.value).correo;
      this.auth.cerrarSesion(this.correo);
    });
  }
}

