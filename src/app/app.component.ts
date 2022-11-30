import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { log } from './model/Message';
import { AuthService } from './services/authentication.service';
import { DatabaseService } from './services/database.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private db: DatabaseService,
    private auth: AuthService,
    private storage: StorageService,
    private router: Router
  ) {
    this.StartApp();
  }

  async StartApp() {

    log('StartApp', 'Iniciando aplicación');
    
    this.platform.ready().then(async () => {

      log('StartApp', 'Plataforma lista');

      await this.db.StartDatabaseService(true).then(async (isRunning) => {

        log('StartApp', isRunning? 'Servicio de BD iniciado': 'Servicio de BD no iniciado');

      });

      await this.storage.StartStorageService('asd');
      log('Storage', 'Iniciado');

      this.auth.isLogged();
    });



  }

}
