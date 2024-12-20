import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule], 
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
