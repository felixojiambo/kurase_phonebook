import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../core/models/contact.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<Contact[]>;

  constructor(private contactService: ContactService) {
    // Filter contacts to only show those with favorite = true
    this.favorites$ = this.contactService.contacts$.pipe(
      map(contacts => contacts.filter(c => c.favorite))
    );
  }

  ngOnInit(): void {}
}
