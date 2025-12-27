import { Component } from '@angular/core';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mediaCarApp';
}
