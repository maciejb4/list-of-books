import { createContext, FC, useContext } from 'react';
import {useContactsList} from "./UseContactsList";

const ContactsContext = createContext<any>([]);

type ContactsContextProviderProps = {
    children:React.ReactNode
}

export const ContactsContextProvider = (props:ContactsContextProviderProps) => {
    return <ContactsContext.Provider value={useContactsList()}>{props.children}</ContactsContext.Provider>;
};

export const useContacts = () => useContext(ContactsContext);

