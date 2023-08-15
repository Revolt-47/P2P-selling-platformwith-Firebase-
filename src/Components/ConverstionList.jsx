import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useChatManagement from "../Context/Chatbase";
import { useSelector } from "react-redux";
import useAddAdToFirebase from "../Context/addAdtoFirbase";

export default function ContactList({ contacts, onSelectContact, onSelectbuyer }) {
  const { getAdDetailsByADId, getUserDetailsByUserId,getUserDetailsByUserIdFromFirestore } = useChatManagement();
  const [adDetails, setAdDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  let user = useSelector((state) => state.user.user);
  const {getAdWithId} = useAddAdToFirebase();

  useEffect(() => {
    const fetchData = async () => {
      for (const contact of contacts) {
        console.log(contact)
        const adData = await getAdDetailsByADId(contact.ad.id);
        // user = await getUserDetailsByUserId(user.userid)
        const otherUserId = contact.seller.userid === user.userid ? contact.buyer.userid : contact.seller.userid;
        let userData = await getUserDetailsByUserId(otherUserId);
        if (!userData){
          userData = await getUserDetailsByUserIdFromFirestore(otherUserId)
        }
        console.log(userData)
        setAdDetails((prevAdDetails) => ({ ...prevAdDetails, [contact.ad.id]: adData }));
        setUserDetails((prevUserDetails) => ({ ...prevUserDetails, [otherUserId]: userData }));
      }
    };

    fetchData();
  }, [contacts, getAdDetailsByADId, getUserDetailsByUserId, user.userid]);

  const handleContactClick = async (contact) => {
    console.log(contact)
    const adData = await getAdWithId(contact.ad.id);
    onSelectContact(adData);
    onSelectbuyer(contact.buyer)
  };

  return (
    <div style={{ backgroundColor: "#ededed", display: "flex", flexDirection: "column", height: "100vh" }}>
      <Typography variant="h6" style={{ margin: "20px 0", paddingLeft: "15px" }}>Contacts</Typography>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <List>
          {contacts.map((contact, index) => (
            <React.Fragment key={contact.id}>
              <ListItem
                button
                onClick={() => handleContactClick(contact)}
                style={{
                  backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={adDetails[contact.ad.id]?.title}
                  //secondary={`Contact: ${userDetails[contact.buyer.userid]?.firstname || userDetails[contact.seller.userid]?.firstname}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
    </div>
  );
}
