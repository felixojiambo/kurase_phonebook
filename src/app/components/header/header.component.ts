import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() toggleView = new EventEmitter<void>();
  @Output() toggleDarkMode = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';

  onSearchChange() {
    this.search.emit(this.searchTerm);
  }

  onToggleView() {
    this.toggleView.emit();
  }

  onToggleDarkMode() {
    this.toggleDarkMode.emit();
  }
}
