import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'phonebook-app';

  isDarkMode: boolean = false;
  viewMode: 'list' | 'grid' = 'list';

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
    // Optionally, persist the preference using a service
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
    // Optionally, persist the preference using a service
  }

  onNavigate(route: string) {
    // Implement navigation logic using Angular Router
    // For example:
    // this.router.navigate([route]);
    console.log(`Navigate to ${route}`);
  }

  onSearch(term: string) {
    // Implement search functionality or emit an event to child components
    console.log(`Search term: ${term}`);
  }
}
