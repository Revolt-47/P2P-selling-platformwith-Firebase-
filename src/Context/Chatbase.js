import { addDoc, collection, doc, updateDoc, getDoc, setDoc, where, getDocs, query , orderBy,serverTimestamp} from 'firebase/firestore';
import { db } from '../firebaseconfig';
import { useSelector } from "react-redux";

const useChatManagement = () => {
  const user = useSelector((state) => state.user.user);

  async function getUserDetailsByUserId(userid) {
    try {
      const docRef = doc(db, 'users', userid);
      const docSnapshot = await getDoc(docRef);
      
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        return userData;
      } else {
        console.log('No user document found with the given ID');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  }

  async function getUserDetailsByUserIdFromFirestore(userid) {
    try {
      const q = query(collection(db, 'users'), where('userid', '==', userid)); // Assuming 'db' is your Firestore instance
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData;
      } else {
        console.log('No user document found with the given ID');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  }

  
 
  
  async function getAdDetailsByADId(id) {
    try {
      const docRef = doc(db, 'ads', id);
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        const adData = docSnapshot.data();
        return adData;
      } else {
        console.log('No ad document found with the given ID');
        return null;
      }
    } catch (error) {
      console.error('Error fetching ad details:', error);
      return null;
    }
  }


  async function getAllChatsForAdSellerBuyer(adid, sellerid, buyerid) {
    try {
      const chatsQuery = query(
        collection(db, 'chats'),
        where('ad.id', '==', adid),
        where('seller.userid', '==', sellerid),
        where('buyer.userid', '==', buyerid),
        orderBy('timestamp','asc') // Assuming 'timestamp' is the field containing the timestamp
      );
  
      const querySnapshot = await getDocs(chatsQuery);
      const chats = querySnapshot.docs.map((doc) => ({
        text: doc.data().messages.text,
        sender: doc.data().messages.sender,
        timestamp: doc.data().timestamp
      }));
      
      console.log(chats)
      return chats;
    } catch (error) {
      console.error('Error fetching chats:', error);
      return [];
    }
  }

  

  
  async function createNewChat(adid, sellerid, buyerid, sender, message) {
    try {
      const chatCollectionRef = collection(db, 'chats');
      await addDoc(chatCollectionRef, {
        ad: { id: adid },
        seller: { userid: sellerid },
        buyer: { userid: buyerid },
        messages: { text: message, sender },
        timestamp: serverTimestamp()
      });
      console.log('Chat created successfully');
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  }

  async function getChatsBySellerId(id) {
    try {
      const chatCollectionRef = collection(db, 'chats');
      const querySnapshot = await getDocs(
        query(
          chatCollectionRef,
          where('seller.userid', '==', id)
        )
      );
  
      const chats = querySnapshot.docs.map((doc) => doc.data());
      return chats;
    } catch (error) {
      console.error('Error fetching seller chats:', error);
      return [];
    }
  }
  
  async function getChatsByBuyerId(id) {
    try {
      const chatCollectionRef = collection(db, 'chats');
      const querySnapshot = await getDocs(
        query(
          chatCollectionRef,
          where('buyer.userid', '==', id)
        )
      );
  
      const chats = querySnapshot.docs.map((doc) => doc.data());
      return chats;
    } catch (error) {
      console.error('Error fetching buyer chats:', error);
      return [];
    }
  }
  
  async function getChatsById(id) {
    try {
      const sellerChats = await getChatsBySellerId(id);
      const buyerChats = await getChatsByBuyerId(id);
      const allChats = sellerChats.concat(buyerChats);
      
      console.log(allChats);
      return allChats;
    } catch (error) {
      console.error('Error fetching chats by ID:', error);
      return [];
    }
  }
  
  
  
  
  return{getUserDetailsByUserId, getAllChatsForAdSellerBuyer, getAdDetailsByADId,createNewChat,getChatsById, getUserDetailsByUserIdFromFirestore}

}

export default useChatManagement;
