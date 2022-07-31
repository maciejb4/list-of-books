import {
  Avatar,
  Card,
  CardContent,
  Checkbox,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ContactDetailsProps } from "../../interfaces/ContactDetailsProps";
export const ContactDetails = (props: ContactDetailsProps) => {
  const [isCheckbox, setIsCheckbox] = useState<boolean>(false);
  let isChecked = props.contactData.isChecked;
  const contactData = props.contactData;
  const fullName = contactData?.first_name + " " + contactData?.last_name;
  const avatarImg = contactData.avatar;

  useEffect(() => {
    isChecked && setIsCheckbox(isChecked);
  }, []);

  const handleOnClick = () => {
    props.onContactClick(contactData.id, isCheckbox);
    setIsCheckbox((value) => !value);
  };

  return (
    <Grid item key={contactData.id} xs={12} sm={12} md={12}>
      <Card
        sx={{ height: "100%", margin: "10px" }}
        onClick={() => handleOnClick()}
        key={contactData.id}
      >
        <CardContent
          sx={{
            padding: "12px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Avatar alt={fullName} src={avatarImg} />
          <Typography sx={{ width: "200px" }} variant="h6" component="h2">
            {fullName}
          </Typography>
          <Checkbox checked={isCheckbox} />
          <Typography variant="h6" component="h2"></Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
