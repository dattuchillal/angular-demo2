import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import {
  CovalentChipsModule,
  CovalentLayoutModule,
  CovalentExpansionPanelModule,
  CovalentDataTableModule,
  CovalentPagingModule,
  CovalentDialogsModule,
  CovalentLoadingModule,
  CovalentMediaModule,
  CovalentNotificationsModule,
  CovalentCommonModule,
  CovalentBreadcrumbsModule,
  CovalentTabSelectModule,
} from '@covalent/core';
import { HttpRequestInterceptorService } from '../core/security/httpRequestInterceptor.service';
import { AuthService } from '../core/security/auth.service';
import { BusinessOperationsService } from '../core/shared/business-operations.service';
import { LoginService } from '../core/security/login.service';
import { AuthGuard } from '../core/security/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    // BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    CdkTableModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CovalentBreadcrumbsModule,
    CdkTableModule
  ],
  exports: [
    CommonModule,
    CovalentChipsModule,
    CovalentLayoutModule,
    CovalentExpansionPanelModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentMediaModule,
    CovalentNotificationsModule,
    CovalentCommonModule,
    CovalentBreadcrumbsModule,
    CovalentTabSelectModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    LoginService,
    AuthService,
    BusinessOperationsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptorService,
      multi: true,
    },
  ]
})
export class CoreModule {}
