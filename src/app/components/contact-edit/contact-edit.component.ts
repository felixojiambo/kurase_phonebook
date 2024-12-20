import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../core/models/contact.model';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnChanges {
  @Input() contact: Contact | null = null;
  @Output() save = new EventEmitter<Contact>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(7)]],
      address: ['', Validators.required],
      imageUrl: [''],
      group: [''],
      favorite: [false],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contact'] && this.contact) {
      this.form.patchValue({
        firstName: this.contact.firstName,
        lastName: this.contact.lastName,
        email: this.contact.email,
        phone: this.contact.phone,
        address: this.contact.address,
        imageUrl: this.contact.imageUrl,
        group: this.contact.group || '',
        favorite: this.contact.favorite || false,
      });
    }
  }

  onSave() {
    if (this.form.valid && this.contact) {
      const updated = { ...this.contact, ...this.form.value };
      this.save.emit(updated);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
