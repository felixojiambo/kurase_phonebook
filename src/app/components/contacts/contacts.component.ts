import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../core/models/contact.model';
import { Observable } from 'rxjs';
import { ContactDetailComponent } from "../contact-detail/contact-detail.component";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

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
  constructor(private contactService: ContactService) {
    this.contacts$ = this.contactService.contacts$;
  }

  ngOnInit(): void {
    const savedViewMode = localStorage.getItem('viewMode');
    if (savedViewMode === 'grid' || savedViewMode === 'list') {
      this.viewMode = savedViewMode;
    }
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
  }

  onCloseDetail() {
    this.showContactDetail = false;
    this.selectedContact = null;
  }
  onContactUpdated(updatedContact: Contact) {
    this.contactService.updateContact(updatedContact);
    // The BehaviorSubject in the service ensures the UI updates automatically.
  }

  onContactDeleted(id: number) {
    this.contactService.softDeleteContact(id);
    this.showContactDetail = false;
    this.selectedContact = null;
  }
  // Bulk Selection Logic
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

    // Reset after handling
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
}
