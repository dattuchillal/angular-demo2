import { Injectable, ViewContainerRef } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AbandonProcessService } from './abandon-process.service';
import { TdDialogService } from '@covalent/core';

@Injectable()
export class AbandonProcessGuard {

  constructor(private abandonProcessService: AbandonProcessService,
    private tdDialogService: TdDialogService) {
  }
  canDeactivate() {

    if (this.abandonProcessService.isActive()) {

      this.tdDialogService.openConfirm({
        message: this.abandonProcessService.literals.beforeLeaveModal.mensaje,
        disableClose: false, // defaults to false
        title: this.abandonProcessService.literals.beforeLeaveModal.titulo,
        cancelButton: this.abandonProcessService.literals.cancel,
        acceptButton: this.abandonProcessService.literals.confirm,
      }).afterClosed().subscribe(accept => {
        if (accept) {
          this.abandonProcessService.deactivate();
          this.abandonProcessService.beforeLeaveSubject.next(true);
        } else {
          this.abandonProcessService.beforeLeaveSubject.next(false);
        }

      });

      // For gathering the user response
      return this.abandonProcessService.beforeLeaveSubject.asObservable();
    }

    return true;
  }
}
