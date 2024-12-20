import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  isDarkMode: boolean = false;
  defaultViewMode: 'list' | 'grid' = 'list';

  ngOnInit(): void {
    // Load dark mode preference
    const darkMode = localStorage.getItem('darkMode');
    this.isDarkMode = (darkMode === 'true');

    // Load default view mode
    const savedViewMode = localStorage.getItem('viewMode');
    if (savedViewMode === 'grid' || savedViewMode === 'list') {
      this.defaultViewMode = savedViewMode;
    }
  }

  onDarkModeChange() {
    localStorage.setItem('darkMode', this.isDarkMode.toString());
   
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }

  onViewModeChange() {
    localStorage.setItem('viewMode', this.defaultViewMode);
  }

  clearRecentContacts() {
  
    console.log('Recent contacts cleared!');
    
  }
}
