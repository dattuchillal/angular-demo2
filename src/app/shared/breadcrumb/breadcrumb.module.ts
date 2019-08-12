import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { CoreModule } from '../core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ],
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule { }
