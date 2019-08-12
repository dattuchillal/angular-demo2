import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { CoreModule } from '../core.module';
import { StringToDateFormatPipe } from './pipe/string-to-date-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [TableComponent, StringToDateFormatPipe],
  exports: [TableComponent]
})
export class TableModule { }
