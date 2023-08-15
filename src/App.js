import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import {Routes , Route, BrowserRouter } from "react-router-dom"
import HomePage from './Components/Home';
import Signup from './Components/Signup';
import ProtectedRoute from './Components/ProtectedRoute'
import { UserAuthContextProvider } from './Context/UserAuthContext';
import Product from './Components/Product';
import ProductList from './Components/ProductList';
import ChatPage from './Components/ChatPage';
function App() {
  return (
    <BrowserRouter>
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/products/:id" element={<ProtectedRoute><Product/></ProtectedRoute>} />
        <Route path="/productlist/:category" element={<ProductList/>} />
        <Route path="/chat" element={<ChatPage/>}/>
      </Routes>
      </UserAuthContextProvider>
      </BrowserRouter>
  );
}

export default App;
