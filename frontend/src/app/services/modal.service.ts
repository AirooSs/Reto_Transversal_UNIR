// src/app/services/modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showLoginModalSubject = new BehaviorSubject<boolean>(false);
  private showRegistroModalSubject = new BehaviorSubject<boolean>(false);
  
  showLoginModal$ = this.showLoginModalSubject.asObservable();
  showRegistroModal$ = this.showRegistroModalSubject.asObservable();

  openLoginModal() {
    this.showLoginModalSubject.next(true);
  }

  closeLoginModal() {
    this.showLoginModalSubject.next(false);
  }

  openRegistroModal() {
    this.showRegistroModalSubject.next(true);
  }

  closeRegistroModal() {
    this.showRegistroModalSubject.next(false);
  }
}