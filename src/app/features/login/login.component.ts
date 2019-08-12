import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/core/security/login.service';
import { AuthService } from 'src/app/core/security/auth.service';
import { environment } from 'src/environments/environment';
import { PATHS } from 'src/app/core/constants/paths.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  literals: any;
  constructor(
    private translate: TranslateService,
    private loginService: LoginService,
    public authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {
    this.getTranslations();
  }

  private getTranslations() {
    const currentLang = this.translate.currentLang;
    this.translate.getTranslation(currentLang).subscribe(translations => {
      this.literals = translations;
    });
    this.translate.onLangChange.subscribe( translations => {
      this.literals = translations.translations;
    });
  }

  login(login: any): void {
    this.loginService
      .login(login.value.username, login.value.password)
      .subscribe(
        (res: any) => {

          // CSRF
          if (environment.security === 'csrf') {
            this.loginService.getCsrf().subscribe((data: any) => {
              this.authService.setToken(data.token);
              this.authService.setLogged(true);
              this.router.navigate(['/' + PATHS.tiposTarifa]);
            });
          }

          // JWT
          if (environment.security === 'jwt') {
            this.authService.setToken(res.headers.get('Authorization'));
            this.authService.setLogged(true);
            this.router.navigate(['/' + PATHS.tiposTarifa]);
          }
        },
        (err: any) => {
          this.authService.setLogged(false);
          this.translate.get('login.errorMsg').subscribe((res: string) => {
            this.snackBar.open(res, 'OK', {
              duration: 5000,
            });
          });
        },
      );
  }
}
