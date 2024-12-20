import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../core/models/contact.model';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  contacts$: Observable<Contact[]>;
  groups = ['All', 'Family', 'Friends', 'Work', 'Other'];
  selectedGroup: string = 'All';

  // Using definite assignment assertion here:
  filteredContacts$!: Observable<Contact[]>;

  constructor(private contactService: ContactService) {
    this.contacts$ = this.contactService.contacts$;
  }

  ngOnInit(): void {
    this.applyFilter();
  }

  onGroupChange(group: string) {
    this.selectedGroup = group;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredContacts$ = this.contacts$.pipe(
      map(contacts => {
        if (this.selectedGroup === 'All') return contacts;
        return contacts.filter(c => c.group === this.selectedGroup);
      })
    );
  }
}
