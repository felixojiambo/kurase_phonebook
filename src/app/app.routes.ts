import { Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';

export const appRoutes: Routes = [
  { path: 'home', component: ContactsComponent },
//   { path: 'favorites', component: FavoritesComponent },
//   { path: 'groups', component: GroupsComponent },
//   { path: 'import-export', component: ImportExportComponent },
//   { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
