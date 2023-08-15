import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import Navbar from './Navbar';
import useChatManagement from '../Context/Chatbase';
import ContactList from './ConverstionList'; // Assuming you have a ContactList component
import Conversation from './Conversation';
import { useSelector } from 'react-redux';
import useAddAdToFirebase from '../Context/addAdtoFirbase';

export default function ChatPage() {
  const { getChatsById, getUserDetailsByUserId } = useChatManagement();
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user1 = await getUserDetailsByUserId(user.userid);
        const chats = await getChatsById(user1.userid);
        const uniqueChats = [];
        const seenCombinations = new Set();

        for (const chat of chats) {
          const combination1 = `${chat.ad.id}_${chat.seller.userid}_${chat.buyer.userid}`;
          const combination2 = `${chat.ad.id}_${chat.buyer.userid}_${chat.seller.userid}`;

          if (!seenCombinations.has(combination1) && !seenCombinations.has(combination2)) {
            seenCombinations.add(combination1);
            uniqueChats.push(chat);
          }
        }

        setContacts(uniqueChats);
        setIsLoading(false); // Data fetching is complete
      } catch (error) {
        console.error('Error fetching chats:', error);
        setIsLoading(false); // Data fetching is complete, even if it failed
      }
    };

    fetchData();
  }, [user.userid]);

  return (
    <>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {isLoading ? ( // Display a loader while fetching data
            <CircularProgress />
          ) : (
            <ContactList contacts={contacts} onSelectContact={setSelectedContact} onSelectbuyer={setSelectedBuyer} />
          )}
        </Grid>
        <Grid item xs={9}>
          {selectedContact && <Conversation adData={selectedContact} buyer={selectedBuyer} />}
        </Grid>
      </Grid>
    </>
  );
}
