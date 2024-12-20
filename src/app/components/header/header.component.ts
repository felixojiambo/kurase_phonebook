import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports:[CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleView = new EventEmitter<void>();
  @Output() toggleDarkMode = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';
  viewMode: 'list' | 'grid' = 'list';
  isSidenavOpen: boolean = false;

  onToggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.toggleSidenav.emit();
  }

  onToggleView() {
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
    this.toggleView.emit();
  }

  onToggleDarkMode() {
    this.toggleDarkMode.emit();
  }

  onSearchChange() {
    this.search.emit(this.searchTerm);
  }
}
