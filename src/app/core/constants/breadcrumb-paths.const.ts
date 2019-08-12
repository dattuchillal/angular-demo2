import { PATHS } from './paths.const';


export const  BREADCRUMB_PATHS = (literals: any = {}) => {
  return {
    HOME: {
      name: literals.Home,
      link: `/${PATHS.home}`
    },
    PARKING: {
      name: literals.parkingTitle,
      link: `/${PATHS.paramsTarifa}`
    },
    MANTENIMIENTOS: {
      name: literals.mantenimientos
    },
    PARAM_TARIFAS: {
      name: literals.paramsTarifasTitle,
      link: `/${PATHS.paramsTarifa}`
    },
    DETALLE_CENTROS: {
      name: literals.detalleCentrosTitle,
      link: `/${PATHS.detalleCentros}`
    },
    ALTA_TARIFA: {
      name: literals.altaTarifaTitle,
      link: `/${PATHS.altaTarifa}`
    },
    EDICION_TARIFA: {
      name: literals.edicionTarifaTitle,
      link: `/${PATHS.edicionTarifa}`
    },
    TIPOS_TARIFA: {
      name: literals.tiposTarifaTitle,
      link: `/${PATHS.tiposTarifa}`
    },
    MTTO_PARAM: {
      name: literals.paramConfigTitle,
      link: `/${PATHS.confParametros}`
    },
    TIPOS_TARIFA_ALTA: {
      name: literals.altaTipoTarifaTitle
    },
    TIPOS_TARIFA_EDICION: {
      name: literals.edicionTipoTarifaTitle
    },
    TARIFAS_CENTRO: {
      name: literals.tarifasCentroTitle,
      link: `/${PATHS.tarifasCentro}`
    },
    TARIFAS_ASOCIADAS_CENTRO: {
      name: literals.tarifasAsociadasCentroTitle
    },
    CENTROS_ASIGNADOS_TIPO_TARIFA: {
      name: literals.centrosAsignadosTipoTarifa,
      link: `/${PATHS.tiposTarifa}/${PATHS.centrosAsignadosTipoTarifa}`
    },
    ALTA_CENTROS_TIPO_TARIFA: {
      name: literals.altaCentrosTipoTarifa
    },
    ALTA_PARAM_TARIFAS: {
      name: literals.altaTarifaTitle
    },
    CENTROS_ASIGNADOS_TARIFA: {
      name: literals.centrosAsignedTarifaTitle,
      link: `/${PATHS.paramsTarifa}/${PATHS.centrosAsignedTarifa}`
    }
  };
};
