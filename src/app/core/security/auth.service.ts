import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private logged = false;
  private token: string;

  constructor(public router: Router) {}

  public isLogged(): boolean {
    return (localStorage.getItem('logged') === 'true') || false;
  }

  public setLogged(login: boolean): void {
    localStorage.setItem('logged', (login ? 'true' : 'false'));
    this.logged = login;
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string): void {
    this.token = token;
  }
}
