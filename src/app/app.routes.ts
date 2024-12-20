import { Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';

export const appRoutes: Routes = [
  { path: 'home', component: ContactsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
