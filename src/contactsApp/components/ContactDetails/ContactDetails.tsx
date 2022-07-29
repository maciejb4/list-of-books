import {Avatar, Card, CardContent, Checkbox, Grid, Typography} from "@mui/material";
import {useState} from "react";
import {useContacts} from "../ContactsList/ContactsContext"
export const ContactDetails = (props:any) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const { changeCheckedContactsList} = useContacts();
    const contactData = props.contactData;
    const fullName = contactData?.first_name + ' ' + contactData?.last_name;
    const avatarImg = contactData.avatar;

    const handleOnClick = () => {
        changeCheckedContactsList(contactData.id, isChecked);
        setIsChecked(value => !value);

    }

    return (
        <Grid item key={contactData.id} xs={12} sm={12} md={12}>
            <Card sx={{ height: "100%"}} key={contactData.id} onClick={() => handleOnClick()}>
                <CardContent sx={{padding: '12px', display: "flex", justifyContent:"space-start", gap:"15px"}}>
                    <Avatar alt={fullName} src={avatarImg} />
                    <Typography variant="h6" component="h2">
                        {fullName}
                    </Typography>
                    <Checkbox checked={isChecked}/>
                </CardContent>
            </Card>
        </Grid>
    )
}