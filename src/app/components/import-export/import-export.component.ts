import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-import-export',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css'],
})
export class ImportExportComponent {
  constructor(private contactService: ContactService) {}

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

        // Convert favorite to boolean
        contactData.favorite = (contactData.favorite === 'true');

        // Add contact using contactService
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
