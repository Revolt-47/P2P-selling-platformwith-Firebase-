import { useState, useEffect } from 'react';
import { addDoc, collection , getDocs} from 'firebase/firestore';
import { db, storage } from '../firebaseconfig';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from 'uuid'; // Import uuid for generating unique image filenames
import { useSelector } from 'react-redux';
import { doc,getDoc,query,where} from 'firebase/firestore';

const useAddAdToFirebase = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const user = useSelector((state) => state.user.user);
  
  
  const addAd = async (adData) => {
    setIsAdding(true);
    setError(null);
    try {
      const imageFile = adData.image; // Get the image File from adData
      const imageRef = ref(storage, `adImages/${uuid()}_${imageFile.name}`); // Generate a unique image filename

      // Upload the image to Firebase Storage
      const uploadTask = uploadBytesResumable(imageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress tracking logic if needed
        },
        (err) => {
          console.log("Error uploading image: ", err);
        },
        async () => {
          // Get the image download URL after successful upload
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

          // Add the modified adData to Firestore with the image URL
          const docRef = await addDoc(collection(db, 'ads'), {
            title: adData.title,
            description: adData.description,
            price: adData.price,
            location : adData.location,
            category : adData.category,
            image: imageUrl,
            userid : user.userid
          });

          console.log('Document written with ID: ', docRef.id);
          setSuccess(true);
        }
      );
    } catch (e) {
      console.error('Error adding document: ', e);
      setError(e.message);
    } finally {
      setIsAdding(false);
    }
  };

  const getRandomAds = async (num) => {
    try {
      const querySnapshot = await getDocs(collection(db, "ads"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return newData;
    } catch (error) {
      console.error("Error fetching random ads:", error);
      return [];
    }
  };
  

  const getAdWithId = async (id) => {
    const docRef = doc(db, 'ads', id);
    const docSnapshot = await getDoc(docRef);
  
    if (docSnapshot.exists()) {
      const adData = docSnapshot.data();
      return {...adData,id:id}
    } else {
      console.log('Document not found');
      return null;
    }
  };

  const getAdsWithCategory = async (category) => {
    const q = query(collection(db, "ads"), where("category", "==", category));
  
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return data;
    } else {
      console.log('No documents found with the given category');
      return [];
    }
  };
  
    
  

  useEffect(() => {
    setSuccess(false); // Reset success state when the component unmounts or re-renders
  }, []);

  return { isAdding, success, error, addAd, getRandomAds, getAdWithId, getAdsWithCategory };
};

export default useAddAdToFirebase;
