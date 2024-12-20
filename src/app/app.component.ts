import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'phonebook-app';

  isDarkMode: boolean = false;
  viewMode: 'list' | 'grid' = 'list';
  isSidenavOpen: boolean = true;

  ngOnInit() {
    // Load dark mode preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    }

    // Load view mode preference
    const savedViewMode = localStorage.getItem('viewMode');
    if (savedViewMode === 'grid' || savedViewMode === 'list') {
      this.viewMode = savedViewMode;
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
    localStorage.setItem('viewMode', this.viewMode);
  }

  onNavigate(route: string) {
    // Placeholder navigation logic
    // For a fully functional navigation:
    // 1. Inject Router in the constructor.
    // 2. Use this.router.navigate([route]) here.
    console.log(`Navigate to ${route}`);
  }

  onSearch(term: string) {
    // Placeholder search logic
    // This could trigger a search filter in your contacts list once implemented.
    console.log(`Search term: ${term}`);
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
