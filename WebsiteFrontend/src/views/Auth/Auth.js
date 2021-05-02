import React,{useState,useEffect} from 'react';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { Auth_IsLoggedIn } from 'prepareAPI';

import{
  Login,
  Register,
  Profile
} from './components'

import {
  SubRoutes as SubRoute
} from 'components';

export default function Auth() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  Auth_IsLoggedIn().then(res=>{
    if(res.data){
      setIsLoggedIn(res.data);
    }
    else{
      setIsLoggedIn(false);
    }
  })


  useEffect(() => {
    Auth_IsLoggedIn().then(res=>{
      if(res.data){
        setIsLoggedIn(res.data);
      }
      else{
        setIsLoggedIn(false);
      }
    })
  },[isLoggedIn]);


  console.log("Auth: isLoggedIn => ",isLoggedIn)


  let notAuth = [

    {
      label: 'Login',
      icon: <PersonIcon/>,
    component: <Login setIsLoggedIn={setIsLoggedIn}/>
    },
    {
      label: 'Register',
      icon: <AddIcon/>,
      component: <Register/>
    },

  ];

  if(isLoggedIn !== null){
    if(!isLoggedIn){
      return (
        <SubRoute
          components={notAuth}
        />
      );
    }else if(isLoggedIn){
      return (
        <Profile/>
      )
    }
  }else{
    return(
      <div></div>
    )
  }
}
