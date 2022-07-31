import { Box, Card, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ContactDetails } from "../ContactDetails/ContactDetails";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContactsList } from "./UseContactsList";
import { debounce } from "ts-debounce";
import { Contact, DisplayedContact } from "../../interfaces/ContactInterface";

export const ContactsList = () => {
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [croppedContacts, setCroppedContacts] = useState<Contact[]>([]);
  const [displayedContacts, setDisplayedContacts] = useState<
    DisplayedContact[]
  >([]);
  const [offset, setOffset] = useState<number>(50);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { changeCheckedContactsList, getCheckedContactsIds } =
    useContactsList();

  useEffect(() => {
    fetch(
      "https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        data.sort((a: Contact, b: Contact) =>
          a.last_name.localeCompare(b.last_name)
        );
        setAllContacts(data);
        setFilteredContacts(data);
      });
  }, []);

  useEffect(() => {
    filteredContacts && setCroppedContacts(filteredContacts.slice(0, 50));
  }, [filteredContacts]);

  useEffect(() => {
    console.log("useEffect");
    const checkedContactsIds = getCheckedContactsIds();
    croppedContacts &&
      setDisplayedContacts(
        croppedContacts.map((el) => {
          if (checkedContactsIds.includes(el.id)) {
            return { ...el, isChecked: true };
          }
          return { ...el, isChecked: false };
        })
      );
  }, [croppedContacts]);

  const searchItems = (searchInput: string) => {
    debouncedSearch(searchInput);
  };

  const search = (searchInput: string) => {
    setFilteredContacts(() =>
      allContacts.filter((item) => {
        return Object.values([item.last_name, item.first_name])
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      })
    );
    setOffset(50);
  };

  const debouncedSearch = debounce(search, 300);

  const loadMoreData = () => {
    if (filteredContacts.length < offset) {
      setHasMore(false);
      return;
    }
    setCroppedContacts(filteredContacts.slice(0, offset + 30));
    setOffset((prevOffset) => prevOffset + 30);
  };

  const handleContactClick = (contactId: number, isChecked: boolean) => {
    changeCheckedContactsList(contactId, isChecked);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Card>
          <Box sx={{ p: "8px", display: "flex", justifyContent: "center" }}>
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
        {/*<Grid container spacing={4}>*/}
        <InfiniteScroll
          dataLength={offset}
          next={loadMoreData}
          hasMore={hasMore}
          loader={
            <Typography variant="h6" component="h2">
              Loading
            </Typography>
          }
        >
          {displayedContacts &&
            displayedContacts.map((element: DisplayedContact) => (
              <ContactDetails
                onContactClick={handleContactClick}
                contactData={element}
                key={element.id}
              />
            ))}
        </InfiniteScroll>
        {/*</Grid>*/}
      </Container>
    </>
  );
};
