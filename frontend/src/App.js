import React, { useState,useEffect } from "react";
import './App.css'
import NavigationBar from "./components/NavigationBar";
import PubsList from './components/PubsList'
import PubDetail from './components/PubDetail'
import NotFound from './components/NotFound'
import Register from './components/Register'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';



export default function App() {
  
  const [user, setUser] = useState(null);

  useEffect( checkUser, []);

  function checkUser(){
    fetch('http://localhost:8000/auth/check',{
      credentials: 'include',
    })
    .then((response) => response.json())
    .then((data)=> {
      updateUser(data.data);
    })
  }

  const updateUser = (newUser) => {
    setUser(newUser);
  }
  return (
    <BrowserRouter>
      <NavigationBar user={user} updateUser={updateUser} />

      <Switch>
        
        <Route exact path="/" children={<PubsList type="publicaciones" />}/>        
        
        <Route path="/mispublicaciones">
          <PubsList type="mispublicaciones" />
        </Route>

        <Route path="/favoritos">
          <PubsList type="favoritos" />
        </Route>

        <Route exact path="/detail/:id" children={<PubDetail />}/>  

        <Route exact path="/register" children={<Register />}/>

        <NotFound />
      </Switch>

    </BrowserRouter>
  );
}
