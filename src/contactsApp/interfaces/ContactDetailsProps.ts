import {DisplayedContact} from "./ContactInterface";

export interface ContactDetailsProps {
  contactData: DisplayedContact,
  onContactClick: (contactId: number, isChecked: boolean) => void
}
