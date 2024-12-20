import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  // In-memory contacts data
  private contacts: Contact[] = [
    {
    id: 1,
    firstName: 'Daniel',
    lastName: 'Kurasa',
    email: 'daniel@kurasa.co',
    phone: '+254706129749',
    address: 'Nairobi, Kenya',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Work',
    favorite: false,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    phone: '+123456789',
    address: '123 Main St, Anytown',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Friends',
    favorite: true,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@smith.com',
    phone: '+2345678910',
    address: '456 Elm St, Othertown',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Family',
    favorite: false,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob@johnson.com',
    phone: '+987654321',
    address: '789 Pine St, Anycity',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Work',
    favorite: true,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie@brown.com',
    phone: '+1234509876',
    address: '101 Maple St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Friends',
    favorite: false,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    firstName: 'Daisy',
    lastName: 'Williams',
    email: 'daisy@williams.com',
    phone: '+5678901234',
    address: '202 Oak St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Family',
    favorite: true,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    firstName: 'Eve',
    lastName: 'Davis',
    email: 'eve@davis.com',
    phone: '+3456789012',
    address: '303 Birch St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Work',
    favorite: false,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    firstName: 'Frank',
    lastName: 'Miller',
    email: 'frank@miller.com',
    phone: '+9876543210',
    address: '404 Cedar St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Friends',
    favorite: true,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    firstName: 'Grace',
    lastName: 'Lee',
    email: 'grace@lee.com',
    phone: '+1234567809',
    address: '505 Walnut St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Family',
    favorite: false,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    firstName: 'Henry',
    lastName: 'Clark',
    email: 'henry@clark.com',
    phone: '+9087654321',
    address: '606 Poplar St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Work',
    favorite: true,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    firstName: 'Ivy',
    lastName: 'Walker',
    email: 'ivy@walker.com',
    phone: '+4567890123',
    address: '707 Chestnut St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Friends',
    favorite: false,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12,
    firstName: 'Jack',
    lastName: 'Hill',
    email: 'jack@hill.com',
    phone: '+5678909876',
    address: '808 Willow St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Family',
    favorite: true,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 13,
    firstName: 'Kate',
    lastName: 'Adams',
    email: 'kate@adams.com',
    phone: '+1230984567',
    address: '909 Spruce St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Work',
    favorite: false,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 14,
    firstName: 'Liam',
    lastName: 'Martinez',
    email: 'liam@martinez.com',
    phone: '+7890123456',
    address: '1010 Redwood St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Friends',
    favorite: true,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 15,
    firstName: 'Mia',
    lastName: 'Lopez',
    email: 'mia@lopez.com',
    phone: '+8901234567',
    address: '1111 Ash St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Family',
    favorite: false,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 16,
    firstName: 'Nathan',
    lastName: 'Roberts',
    email: 'nathan@roberts.com',
    phone: '+9012345678',
    address: '1212 Fir St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Work',
    favorite: true,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 17,
    firstName: 'Olivia',
    lastName: 'Perez',
    email: 'olivia@perez.com',
    phone: '+6789012345',
    address: '1313 Cypress St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Friends',
    favorite: false,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 18,
    firstName: 'Paul',
    lastName: 'White',
    email: 'paul@white.com',
    phone: '+7890123456',
    address: '1414 Maple St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Family',
    favorite: true,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 19,
    firstName: 'Quinn',
    lastName: 'Taylor',
    email: 'quinn@taylor.com',
    phone: '+8901234567',
    address: '1515 Oak St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Work',
    favorite: false,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 20,
    firstName: 'Rose',
    lastName: 'Harris',
    email: 'rose@harris.com',
    phone: '+9012345678',
    address: '1616 Pine St, Springfield',
    imageUrl: 'https://via.placeholder.com/150',
    group: 'Friends',
    favorite: true,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
    
  ];
  private recentContactIds: number[] = [];
  // BehaviorSubject to emit current contacts state
  private contactsSubject: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>(
    this.getAllContacts()
  );

  // Observable for components to subscribe to
  public contacts$: Observable<Contact[]> = this.contactsSubject.asObservable();

  constructor() {}

  /**
   * Retrieve all non-deleted contacts, sorted alphabetically by last name and first name.
   */
  getAllContacts(): Contact[] {
    return this.contacts
      .filter((contact) => !contact.deleted)
      .sort((a, b) => {
        const lastNameComparison = a.lastName.localeCompare(b.lastName);
        return lastNameComparison !== 0
          ? lastNameComparison
          : a.firstName.localeCompare(b.firstName);
      });
  }

  /**
   * Retrieve a contact by its ID.
   * @param id Contact's unique identifier
   */
  getContactById(id: number): Contact | undefined {
    return this.contacts.find((contact) => contact.id === id && !contact.deleted);
  }

  /**
   * Add a new contact to the in-memory data store.
   * @param contact The contact to add
   */
  addContact(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'deleted'>): void {
    const newContact: Contact = {
      ...contact,
      id: this.generateUniqueId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
    };
    this.contacts.push(newContact);
    this.refreshContacts();
  }

  /**
   * Update an existing contact's details.
   * @param updatedContact The contact with updated information
   */
  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex((c) => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = {
        ...updatedContact,
        updatedAt: new Date(),
      };
      this.refreshContacts();
    }
  }

  /**
   * Soft delete a contact by setting its 'deleted' flag to true.
   * @param id Contact's unique identifier
   */
  softDeleteContact(id: number): void {
    const contact = this.contacts.find((c) => c.id === id);
    if (contact) {
      contact.deleted = true;
      contact.updatedAt = new Date();
      this.refreshContacts();
    }
  }

  /**
   * Soft delete multiple contacts by their IDs.
   * @param ids Array of contact IDs to delete
   */
  softDeleteMultiple(ids: number[]): void {
    this.contacts.forEach((contact) => {
      if (ids.includes(contact.id)) {
        contact.deleted = true;
        contact.updatedAt = new Date();
      }
    });
    this.refreshContacts();
  }

  /**
   * Search contacts based on a search term.
   * Filters by first name, last name, email, or phone number.
   * @param term The search term
   */
  searchContacts(term: string): void {
    if (!term.trim()) {
      // If no search term, emit all contacts
      this.contactsSubject.next(this.getAllContacts());
      return;
    }

    const lowerTerm = term.toLowerCase();
    const filteredContacts = this.getAllContacts().filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(lowerTerm) ||
        contact.lastName.toLowerCase().includes(lowerTerm) ||
        contact.email.toLowerCase().includes(lowerTerm) ||
        contact.phone.toLowerCase().includes(lowerTerm)
    );

    this.contactsSubject.next(filteredContacts);
  }

  /**
   * Refresh the contacts observable to emit the latest contacts state.
   */
  private refreshContacts(): void {
    this.contactsSubject.next(this.getAllContacts());
  }

  /**
   * Generate a unique ID for a new contact.
   */
  private generateUniqueId(): number {
    return this.contacts.length > 0
      ? Math.max(...this.contacts.map((c) => c.id)) + 1
      : 1;
  }
  toggleFavorite(id: number): void {
    const idx = this.contacts.findIndex(c => c.id === id);
    if (idx > -1) {
      this.contacts[idx].favorite = !this.contacts[idx].favorite;
      this.contacts[idx].updatedAt = new Date();
      this.refreshContacts(); 
    }
  }
  addToRecent(id: number) {
    // Remove if already in list
    this.recentContactIds = this.recentContactIds.filter(cId => cId !== id);
    // Add to front
    this.recentContactIds.unshift(id);
    // Limit to last 5
    if (this.recentContactIds.length > 5) {
      this.recentContactIds.pop();
    }
  }
  getRecentContacts(): Contact[] {
    return this.recentContactIds
      .map(id => this.contacts.find(c => c.id === id && !c.deleted))
      .filter((c): c is Contact => !!c); // filter out null/undefined
  }
  
}
