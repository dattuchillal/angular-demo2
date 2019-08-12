import { Injectable } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import { Subject } from 'rxjs';

@Injectable()
export class AbandonProcessService {
  beforeLeaveModal: any;
  active: boolean;
  userHasTriedToLeave: boolean;
  literals: any;
  beforeLeaveSubject: any;

  constructor() {
    this.beforeLeaveSubject = new Subject();

  }


  setBeforeUnloadListener() {
    window.onbeforeunload = (beforeUnloadEvent) => {
      beforeUnloadEvent.returnValue = this.literals.beforeLeaveModal.mensaje;
    };
  }


  unsetBeforeUnloadListener() {
    window.onbeforeunload = null;
  }


  setBeforeLeaveModalContent(beforeLeaveModalContent) {
    this.beforeLeaveModal = beforeLeaveModalContent;
  }


  activate(literals) {
    this.active = true;
    this.setBeforeUnloadListener();
    this.literals = literals;
  }


  deactivate() {
    if (this.active) {
      this.active = false;
      this.unsetBeforeUnloadListener();
    }
  }


  isActive() {
    return this.active;
  }
}
