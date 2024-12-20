import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../core/models/contact.model';
import { ContactEditComponent } from '../contact-edit/contact-edit.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, ContactEditComponent, ConfirmationDialogComponent],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent {
  @Input() contact: Contact | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<Contact>();
  @Output() deleted = new EventEmitter<number>();

  showEditForm = false;
  showDeleteConfirm = false;

  onClose() {
    this.close.emit();
  }

  onEdit() {
    this.showEditForm = true;
  }

  onCancelEdit() {
    this.showEditForm = false;
  }

  onSave(updatedContact: Contact) {
    this.updated.emit(updatedContact);
    this.showEditForm = false;
  }

  onDelete() {
    this.showDeleteConfirm = true;
  }

  onCancelDelete() {
    this.showDeleteConfirm = false;
  }

  onConfirmDelete() {
    if (this.contact) {
      this.deleted.emit(this.contact.id);
    }
    this.showDeleteConfirm = false;
  }
}
