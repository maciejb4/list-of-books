import React, {createContext, useContext} from 'react';
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import './App.css';
import { PageHeader } from './contactsApp/components/PageHeader/PageHeader';
import {ContactsList} from "./contactsApp/components/ContactsList/ContactsList";
import {ContactsContextProvider} from "./contactsApp/components/ContactsList/ContactsContext";


const App = () => {
  const theme = createTheme();
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
              <ContactsContextProvider>
                <PageHeader/>
                <ContactsList/>
              </ContactsContextProvider>
          </main>
        </Container>
      </ThemeProvider>
  );
}

export default App;
