import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  
  canActivate(): boolean {
    if(this.auth.isAuthenticated()) {
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
