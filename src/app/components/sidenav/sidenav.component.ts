import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  @Output() navigate = new EventEmitter<string>();

  isOpen: boolean = true;

  toggleSidenav() {
    this.isOpen = !this.isOpen;
  }

  onNavigate(route: string) {
    this.navigate.emit(route);
  }
}
