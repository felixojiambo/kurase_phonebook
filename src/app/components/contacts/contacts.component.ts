import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../core/models/contact.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts$: Observable<Contact[]>;

  constructor(private contactService: ContactService) {
    this.contacts$ = this.contactService.contacts$;
  }

  ngOnInit(): void {
    // If needed, we can initialize or refresh data here
  }

  addContact() {
    // Example contact to add
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
}
