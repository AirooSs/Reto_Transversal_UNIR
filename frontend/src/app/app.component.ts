// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ModalService } from './services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LoginComponent, RegistroComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-web';
  showLoginModal = false;
  showRegistroModal = false;

  constructor(private modalService: ModalService) {
    this.modalService.showLoginModal$.subscribe(show => {
      this.showLoginModal = show;
      this.manageBodyScroll(show || this.showRegistroModal);
    });
    
    this.modalService.showRegistroModal$.subscribe(show => {
      this.showRegistroModal = show;
      this.manageBodyScroll(show || this.showLoginModal);
    });
  }

  private manageBodyScroll(modalOpen: boolean) {
    if (modalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }

  closeLoginModal() {
    this.modalService.closeLoginModal();
  }

  closeRegistroModal() {
    this.modalService.closeRegistroModal();
  }
}