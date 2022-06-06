import { useState } from 'react'; // Biblioteca para usar o estado

import { Home } from './Home';
import { Login } from './Login';
import { Signup } from './Signup';


export function App() {
  const [user, setUser]= useState();
  if(user){
    return <Home/>;
  }
  
  return window.location.pathname === '/signup' 
    ? <Signup signUpUser={setUser}/> 
    : <Login signInUser={setUser}/>
}