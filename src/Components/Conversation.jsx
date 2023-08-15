import React, { useEffect, useState } from "react";
import { Paper, Typography, Avatar, ListItem, ListItemAvatar, ListItemText, Container, TextField, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import useChatManagement from "../Context/Chatbase";
import { useSelector } from "react-redux";

export default function Conversation({ adData,buyer }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { getUserDetailsByUserId, getAdDetailsByADId, getAllChatsForAdSellerBuyer, createNewChat } = useChatManagement();
  const [adInfo, setAdInfo] = useState();
  const [receiver, setReceiver] = useState();
  const [sender1,setSender] = useState();

  const ad = adData;
  const user = useSelector((state) => state.user.user);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    try {

      const check = await getUserDetailsByUserId(ad.userid)
      // Determine the sender based on user role (buyer or seller)
      const sender = sender1.userid === check ? "seller" : "buyer";

      // Create a new chat with the message and details
      await createNewChat(ad.id, receiver.userid, sender1.userid, sender, `${sender1.firstname} : ${message}` );

      // Add the new message to the messages state
      const newMessage = { text:`${sender1.firstname} : ${message} `, sender: sender };
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  const handleFileSelect = (event) => {
    // Logic to handle file selection
    console.log("Selected file:", event.target.files[0]);
  };

  useEffect(() => {
    console.log(buyer)
    const fetchData = async () => {
      const res1 = await getAdDetailsByADId(ad.id);
      setAdInfo(res1);
      
      const res2 = await getUserDetailsByUserId(user.userid);
      setSender(res2);
      
      let receiverData = null;
  
      if (buyer) {
        receiverData = buyer;
      } else {
        const res = await getUserDetailsByUserId(ad.userid);
        receiverData = res;
      }
      
      setReceiver(receiverData);
  
      const chatsFromSender = await getAllChatsForAdSellerBuyer(ad.id, receiverData.userid, res2.userid);
      const chatsToSender = await getAllChatsForAdSellerBuyer(ad.id, res2.userid, receiverData.userid);
  
      // Concatenate the two arrays of chats
      const allChats = [...chatsFromSender, ...chatsToSender];

      allChats.sort((a, b) => a.timestamp - b.timestamp)
  
  
      setMessages(allChats);
    };
  
    fetchData();
  }, [ad.id, ad.userid, getUserDetailsByUserId, getAdDetailsByADId, getAllChatsForAdSellerBuyer, user.userid, buyer]);
  
  

  return (
    <Container
      component={Paper}
      elevation={3}
      sx={{ padding: "20px", height: "99vh", position: "relative", display: "flex", flexDirection: "column" }}
    >
      {(receiver && adInfo) ? (
        <>
          <div style={{ flexGrow: 1, overflowY: "auto" }}>
            <div style={{ padding: "20px" }}> 
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={receiver.firstname} secondary={`Product: ${adInfo.title}`} />
              </ListItem>
            </div>
            {/* Display messages */}
            <div style={{ padding: "20px" }}>
            {messages.map((msg, index) => (
  <div key={index} style={{ textAlign: msg.sender === "buyer" ? "right" : "left" }}>
    <Typography
      variant="body1"
      style={{
        backgroundColor: msg.sender === "buyer" ? "#e1eaf5" : "#f0f0f0",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "5px",
        display: "inline-block"
      }}
    >
      {msg.text} {/* Access the 'text' property of msg.text */}
    </Typography>
  </div>
))}
            </div>
          </div>
          <TextField
            label="Type a message"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            style={{ marginTop: "10px" }}
            InputProps={{
              endAdornment: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="file"
                    id="file-input"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                  />
                  <label htmlFor="file-input">
                    <IconButton component="span">
                      <AttachFileIcon />
                    </IconButton>
                  </label>
                  <IconButton>
                    <EmojiEmotionsIcon />
                  </IconButton>
                  <IconButton onClick={handleSendMessage}>
                    <AccountCircleIcon />
                  </IconButton>
                </div>
              ),
            }}
          />
        </>
      ) : (
        <Typography>Select a contact to start a conversation.</Typography>
      )}
    </Container>
  );
}
