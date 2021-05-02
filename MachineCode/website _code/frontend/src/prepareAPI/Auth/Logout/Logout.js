import axios from 'axios/axios';
import Cookies from 'js-cookie';

const Logout = () => {

  console.log("jwt deleted in exist");
  //Cookies.remove('jwt')
  localStorage.removeItem('jwt');
  //window.location.reload();

};


export default Logout;
