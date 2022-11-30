import { Injectable } from '@angular/core';
import { capSQLiteChanges, DBSQLiteValues} from '@capacitor-community/sqlite';
import { promise } from 'protractor';
import { Usuario } from '../model/Usuario';
import { SQLiteService } from './sqlite.service';

@Injectable()

export class DatabaseService {

    createSchema: string = `
        CREATE TABLE IF NOT EXISTS USUARIO (
            correo TEXT PRIMARY KEY NOT NULL,
            password TEXT NOT NULL,
            nombre TEXT NOT NULL,
            preguntaSecreta TEXT NOT NULL,
            respuestaSecreta TEXT NOT NULL,
            sesionActiva TEXT NOT NULL
        );
    `;
    sqlInsertUser = 'INSERT INTO Usuario (correo, password, nombre, preguntaSecreta, respuestaSecreta, sesionActiva) VALUES (?,?,?,?,?,?)';
    sqlSelectUser = 'SELECT * FROM Usuario WHERE correo=? AND password=? LIMIT 1';
    sqlSelectAllUsers = 'SELECT * FROM Usuario';
    sqlUpdateActiveSesion = 'UPDATE Usuario SET sesionActiva=? WHERE correo=?';
    sqlUpdateUser = `UPDATE USUARIO SET 
                    password = ?,
                    nombre = ?,
                    preguntaSecreta = ?,
                    respuestaSecreta = ?,
                    sesionActiva = ?
                    WHERE 
                        correo = ?`;
    sqlSelectActiveSession = `SELECT correo, sesionActiva FROM Usuario WHERE sesionActiva = 'S' LIMIT 1`;
    sqlDeleteUser = 'DELETE FROM USUARIO WHERE correo =?'; 
    sqlSelectMail = 'SELECT * FROM USUARIO WHERE correo =?'; 
    

    constructor(private sqlite: SQLiteService) { }
    
    StartDatabaseService(createDatabaseFromScratch: boolean): Promise<boolean> {
        return this.sqlite.StartSQLiteService(this.createSchema, createDatabaseFromScratch, 'StartDatabaseService');
    }

    async createUser(correo: string, password: string, nombre: string, preguntaSecreta: string, respuestaSecreta: string, sesionActiva: string): Promise<capSQLiteChanges> {
        return await this.sqlite.run(this.sqlInsertUser, [correo, password, nombre, preguntaSecreta, respuestaSecreta, sesionActiva]);
    }

    async readUsers(): Promise<DBSQLiteValues> {
        return await this.sqlite.query(this.sqlSelectAllUsers);
    }

    async readUser(correo: string, password: string, hideSecrets: boolean): Promise<Usuario> {
        const rs = await this.sqlite.query(this.sqlSelectUser, [correo, password]);
        if (rs.values.length === 0) return Promise.resolve(null);
        const usu = new Usuario();
        const r = rs.values[0];
        usu.setUser(
            r.correo, 
            r.password, 
            r.nombre, 
            r.preguntaSecreta, 
            r.respuestaSecreta, 
            r.sesionActiva, 
            hideSecrets
        );
        return Promise.resolve(usu);
    }

    async logUsers() {
        const rs: DBSQLiteValues = await this.readUsers();
        console.log(`Cantidad de usuarios: ${rs.values.length}`);
        rs.values.forEach((value, index) => {
            console.log(
                `Correo ${index}: ${value.correo}, ${value.password}, ` +
                `${value.nombre}, ${value.preguntaSecreta}, ` +
                `${value.respuestaSecreta}, ` +
                `${value.sesionActiva}`
            );
        });
    }

    async readActiveSession(): Promise<DBSQLiteValues> {
        return await this.sqlite.db.query(this.sqlSelectActiveSession, []);
    }

    async updateActiveSession(correo: string, sesionActiva: string): Promise<capSQLiteChanges> {
        return await this.sqlite.run(this.sqlUpdateActiveSesion, [sesionActiva, correo]);
    }

    async userList(hideSecrets: boolean): Promise<Usuario[]> {
        const lista = [];
        const rs = await this.readUsers();
        rs.values.forEach((r, index) => {
            let usu = new Usuario();
            if (hideSecrets) {
                r.password = '';
                r.preguntaSecreta = '';
                r.respuestaSecreta = '';
            }
            usu.setUser(
                r.correo, 
                r.password, 
                r.nombre, 
                r.preguntaSecreta, 
                r.respuestaSecreta, 
                r.sesionActiva, 
                hideSecrets
            );
            lista.push(usu);
        });
        return lista;
    }

    async deleteUser(correo:string): Promise <capSQLiteChanges> {
        return await this.sqlite.run(this.sqlDeleteUser, [correo]);
    }
}