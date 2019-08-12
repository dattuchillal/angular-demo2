import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CoreModule } from 'src/app/shared/core.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    LoginRoutingModule,
    CoreModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: []
})
export class LoginModule { }
