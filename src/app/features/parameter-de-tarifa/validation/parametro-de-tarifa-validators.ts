import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ParametroDeTarifaValidators {
    static numberShouldGreaterThanZero(control: AbstractControl): ValidationErrors | null {
            if (control && control.value) {
              return control.value > 0 ? null : { numberShouldGreaterThanZero: true };
            }
    }
}
