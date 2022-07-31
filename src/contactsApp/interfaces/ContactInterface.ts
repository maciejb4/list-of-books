export interface Contact {
  avatar: string;
  email: string;
  first_name: string;
  gender: string;
  id: number;
  last_name: string;
}

export interface DisplayedContact extends Contact {
  isChecked?: boolean;
}
