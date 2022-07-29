import {Box, Card, Container, Grid, TextField} from "@mui/material";
import { useEffect, useState } from "react";
import {ContactDetails} from "../ContactDetails/ContactDetails";

export const ContactsList = () => {
  const [allContacts, setAllContacts] = useState<any[]>([]);
  const [contactsData, setContactsData] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json")
      .then((res) => res.json())
      .then((data) => {
          console.log('data',data);
          data.sort((a:any, b:any) => a.last_name.localeCompare(b.last_name));
        setAllContacts(data);
        setContactsData(data);
      });
  }, []);

    const searchItems = (searchInput:string) => {
        setContactsData(() => allContacts.filter((item) => {
            return Object.values(item.last_name).join('').toLowerCase().includes(searchInput.toLowerCase())
        }))
    }


  return (
    <>
      <Container maxWidth="sm">
        <Card>
          <Box
            sx={{ p: "8px", display: "flex", justifyContent: "center" }}
          >
            <TextField
                id="filled-hidden-label-small"
                label="Search Contacts"
                fullWidth
                onChange={(e) => searchItems(e.target.value)}
            />
          </Box>
        </Card>
      </Container>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
            {contactsData && contactsData.map((element: any) => (
                <ContactDetails contactData={element} key={element.id}/>
            ))}
        </Grid>
      </Container>
    </>
  );
};
