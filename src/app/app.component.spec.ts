import { Usuario } from './model/Usuario';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('Probar el comienzo de la aplicación', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

});

describe('Probar clase de usuario', () => {

  describe ('Probar que la contraseña sea correcta', () => {
      const usuario = new Usuario();
      usuario.setUser('atorres@duocuc.cl', 'abc123', 'Ana Torres Leiva', '¿Cuál es tu animal favorito?', 'gato', 'N', true);

      it ('Probar que la contraseña no sea vacía', () => {
        usuario.password = '';
        expect(usuario.validatePassword(usuario.password)).toBe('Para entrar al sistema debe ingresar la contraseña.');
      });

      it ('Probar que la contraseña no sea vacía ocupando espacios vacios', () => {
        usuario.password = '                ';
        expect(usuario.validatePassword(usuario.password)).toBe('Para entrar al sistema debe ingresar la contraseña.');
      });

      it ('Probar que se ingreso un correo vacio', () => {
        usuario.correo = '';
        expect(usuario.validateEmail(usuario.correo)).toBe('Para ingresar al sistema debe ingresar el correo del usuario.');
      });

      it ('Probar que se ingreso un correo vacio ocupando espacios vacios', () => {
        usuario.correo = '                        ';
        expect(usuario.validateEmail(usuario.correo)).toBe('Para ingresar al sistema debe ingresar el correo del usuario.');
      });

      it ('Probar que la contraseña es correcta', () => {
        usuario.password = '1234';
        expect(usuario.validatePassword(usuario.password)).toBe('');
      });

      it ('Probar que el correo es correcto', () => {
        usuario.correo = 'atorres@duocuc.cl';
        expect(usuario.validateEmail(usuario.correo)).toBe('');
      });
    });

});