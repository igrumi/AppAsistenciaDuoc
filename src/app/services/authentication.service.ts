import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { capSQLiteChanges } from '@capacitor-community/sqlite';
import { capValueResult } from 'capacitor-data-storage-sqlite';
import { BehaviorSubject } from 'rxjs';
import { log, showAlertError, showToast } from '../model/Message';
import { Usuario } from '../model/Usuario';
import { DatabaseService } from './database.service';
import { StorageService } from './storage.service';

@Injectable()

export class AuthService {

    loginState = new BehaviorSubject(false);

    constructor(
        private router: Router,
        private storage: StorageService,
        private db: DatabaseService) 
    { 
        
    }

    async StartAuthService(): Promise<boolean> {
        return await this.storage.StartStorageService('StartAuthenticationService');
    }

    isAuthenticated() {
        return this.loginState.value;
    }

    isLogged() {
        this.db.readActiveSession().then(sess => {
            if(sess.values.length > 0) {
                this.router.navigate(['/nav/inicio']);
                return;
            }
        })
    }

    login(correo: string, password: string) {
        this.db.readUser(correo, password, true).then((res) => {
            if(res !== null) {
                this.db.updateActiveSession(correo, 'S');
                this.storage.setItem('USER_DATA', JSON.stringify(res));
                this.router.navigate(['nav/inicio']);
                this.loginState.next(true);
                return;
            }
            alert('Credenciales incorrectas (o no existe el usuario)');
        });
    }

    async cerrarSesion(correo: string) {
        this.router.navigate(['/login']);
        this.storage.clear();
        this.loginState.next(false);
        this.db.updateActiveSession(correo, 'N');
    }

}
