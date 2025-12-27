import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isMenuOpen = false;

  
  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  scrollToSection(elementId: string): void {
    this.isMenuOpen = false;

    if (this.router.url === '/') {
      this.doScroll(elementId);
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.doScroll(elementId);
        }, 100);
      });
    }
  }


  private doScroll(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
