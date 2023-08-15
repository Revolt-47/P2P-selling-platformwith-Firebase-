import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth,db } from "../firebaseconfig"; // Note: Use the auth object directly from the firebaseconfig.js file
import { addDoc, collection,getDocs, query, where,getDoc,setDoc,doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { signin, signout } from '../features/user/userslice';

const userAuthContext = createContext();


export function UserAuthContextProvider({ children }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  async function signUp(email, password,firstname , lastname) {
    return createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          firstname : firstname,
          lastname : lastname ,
          userid : res.user.uid,
          email : email  
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
    });
  }

 async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then( async (res)=>{

      const q = query(collection(db,"users"),where(
        "userid","==",res.user.uid
      )) ;

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const userData = { ...doc.data(), userid: doc.id };
        dispatch(signin(userData));
      }

    });
  }

  async function logout(){
    return await signOut(auth).then(()=>{
      dispatch(signout())
    })
  }

 async function googlesignin(){
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth,googleAuthProvider).then(async res => {
      const user = {
        firstname : res.user.displayName,
        lastname : " ",
        email : res.user.email,
        userid : res.user.uid
      }
      dispatch(signin(user));
      const userDocRef = doc(db, "users", user.userid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      // User doesn't exist, add them to the database
      await setDoc(userDocRef, user);
      dispatch(signin(user));
    } else {
      // User already exists, no need to add a duplicate record
      console.log("User already exists in the database");
    }

    })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <userAuthContext.Provider value={{ user, signUp,login,logout,googlesignin }}>{children}</userAuthContext.Provider>;
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
