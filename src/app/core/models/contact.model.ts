export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    imageUrl?: string;
    group?: 'Family' | 'Friends' | 'Work' | 'Other';
    favorite?: boolean;
    deleted?: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  