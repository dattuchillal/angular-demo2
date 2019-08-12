import { PATHS } from './paths.const';

export const MENU_SECTIONS = (literals: any = {}): any[] => [
  {
    label: literals.mantenimientos,
    items: [
      {
        label: literals.paramsTarifasTitle,
        routerLink: PATHS.paramsTarifa
      },
      {
        label: literals.tiposTarifaTitle,
        routerLink: PATHS.tiposTarifa
      }
    ]
  },
  {
    label: literals.tarifasCentroTitle,
    routerLink: PATHS.tarifasCentro
  },
  {
    label: literals.paramConfigTitle,
    routerLink: PATHS.confParametros
  }
];
