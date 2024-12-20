import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../core/models/contact.model';
import { ContactDetailComponent } from "../contact-detail/contact-detail.component";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { Observable, map } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactDetailComponent, ConfirmationDialogComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts$: Observable<Contact[]>;
  viewMode: 'list' | 'grid' = 'list';
  selectedContact: Contact | null = null;

  showContactDetail = false;
  selectedIds: number[] = [];
  showBulkDeleteConfirm = false;

  filterGroup: string = 'All'; // 'All' | 'Family' | 'Friends' | 'Work' | 'Other'
  showFavoritesOnly: boolean = false;

  filteredContacts$!: Observable<Contact[]>;
  recentContacts: Contact[] = [];

  constructor(private contactService: ContactService) {
    this.contacts$ = this.contactService.contacts$;
  }

  ngOnInit(): void {
    const savedViewMode = localStorage.getItem('viewMode');
    if (savedViewMode === 'grid' || savedViewMode === 'list') {
      this.viewMode = savedViewMode;
    }
    this.updateRecentContacts();
    this.applyFilter();
  }

  applyFilter() {
    this.filteredContacts$ = this.contacts$.pipe(
      map(contacts => {
        let result = contacts;
        if (this.showFavoritesOnly) {
          result = result.filter(c => c.favorite);
        }
        if (this.filterGroup !== 'All') {
          result = result.filter(c => c.group === this.filterGroup);
        }
        return result;
      })
    );
  }

  addContact() {
    const newContact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'deleted'> = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@smith.com',
      phone: '+1987654321',
      address: '456 Elm St, Othertown',
      imageUrl: 'https://via.placeholder.com/150',
      group: 'Friends',
      favorite: false,
    };
    this.contactService.addContact(newContact);
  }

  deleteContact(id: number) {
    this.contactService.softDeleteContact(id);
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
    localStorage.setItem('viewMode', this.viewMode);
  }

  onContactClick(contact: Contact) {
    this.selectedContact = contact;
    this.showContactDetail = true;
    this.contactService.addToRecent(contact.id);
    this.updateRecentContacts();
  }

  updateRecentContacts() {
    this.recentContacts = this.contactService.getRecentContacts();
  }

  onCloseDetail() {
    this.showContactDetail = false;
    this.selectedContact = null;
  }

  onContactUpdated(updatedContact: Contact) {
    this.contactService.updateContact(updatedContact);
  }

  onContactDeleted(id: number) {
    this.contactService.softDeleteContact(id);
    this.showContactDetail = false;
    this.selectedContact = null;
  }

  isCheckboxEvent = false;
  onCheckboxClick(event: Event, contactId: number) {
    event.stopPropagation();
    this.isCheckboxEvent = true;
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedIds.push(contactId);
    } else {
      this.selectedIds = this.selectedIds.filter(id => id !== contactId);
    }
    setTimeout(() => this.isCheckboxEvent = false, 0);
  }

  confirmBulkDelete() {
    this.showBulkDeleteConfirm = true;
  }

  cancelBulkDelete() {
    this.showBulkDeleteConfirm = false;
  }

  bulkDelete() {
    this.contactService.softDeleteMultiple(this.selectedIds);
    this.selectedIds = [];
    this.showBulkDeleteConfirm = false;
  }

  onToggleFavorite(event: Event, contact: Contact) {
    event.stopPropagation();
    this.contactService.toggleFavorite(contact.id);
  }

  onGroupChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.filterGroup = select.value;
    this.applyFilter();
  }

  toggleFavoritesOnly() {
    this.showFavoritesOnly = !this.showFavoritesOnly;
    this.applyFilter();
  }

  exportContacts() {
    this.contactService.contacts$.subscribe(contacts => {
      const header = ['firstName','lastName','email','phone','address','group','favorite'];
      const rows = contacts.map(c => [
        c.firstName,
        c.lastName,
        c.email,
        c.phone,
        c.address,
        c.group || '',
        c.favorite ? 'true' : 'false'
      ]);

      const csvContent = [header, ...rows]
        .map(e => e.map(val => `"${(val||'').replace(/"/g,'""')}"`).join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'contacts_export.csv');
    });
  }

  onImportContacts(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').map(l => l.trim()).filter(l => l);
      const [headerLine, ...dataLines] = lines;
      const headers = headerLine.split(',').map(h => h.replace(/"/g,'').trim());

      dataLines.forEach(line => {
        const values = line.split(',').map(v => v.replace(/"/g,'').trim());
        const contactData: any = {};
        headers.forEach((h, i) => contactData[h] = values[i]);

        contactData.favorite = (contactData.favorite === 'true');

        this.contactService.addContact({
          firstName: contactData.firstName || '',
          lastName: contactData.lastName || '',
          email: contactData.email || '',
          phone: contactData.phone || '',
          address: contactData.address || '',
          imageUrl: '',
          group: contactData.group || '',
          favorite: !!contactData.favorite,
        });
      });
      input.value = '';
      alert('Contacts imported successfully!');
    };
    reader.readAsText(file);
  }
}
