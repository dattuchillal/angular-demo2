import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BREADCRUMB_PATHS } from '../../../core/constants/breadcrumb-paths.const';

@Component({
  selector: 'app-alta-nuevo',
  templateUrl: './alta-nuevo.component.html',
  styleUrls: ['./alta-nuevo.component.scss']
})
export class AltaNuevoComponent implements OnInit {

  breadcrumb: any[];
  breadcrumbPaths: any;
  literals: any = {
    altaNuevoTipo: ''
  };
  constructor(private readonly translationService: TranslateService) { }

  ngOnInit() {
    this.getTranslations();
  }

  private getTranslations() {
    const currentLang = this.translationService.currentLang;
    this.translationService.getTranslation(currentLang).subscribe(translations => {
      this.literals = translations;
      this.breadcrumbPaths = BREADCRUMB_PATHS(this.literals);
      this.breadcrumb = [
        this.breadcrumbPaths.HOME,
        this.breadcrumbPaths.MANTENIMIENTOS,
        this.breadcrumbPaths.TIPOS_TARIFA,
        { name: this.breadcrumbPaths.TIPOS_TARIFA_ALTA.name }
      ];
    });
    this.translationService.onLangChange.subscribe( translations => {
      this.literals = translations.translations;
      this.breadcrumbPaths = BREADCRUMB_PATHS(this.literals);
      this.breadcrumb = [
        this.breadcrumbPaths.HOME,
        this.breadcrumbPaths.MANTENIMIENTOS,
        this.breadcrumbPaths.TIPOS_TARIFA,
        { name: this.breadcrumbPaths.TIPOS_TARIFA_ALTA.name }
      ];
    });
  }

}
