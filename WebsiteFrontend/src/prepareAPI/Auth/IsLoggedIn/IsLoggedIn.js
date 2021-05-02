import axios from 'axios';
import Cookies from 'js-cookie';
import addHeader from 'axios/addHeader';

async function IsLoggedIn() {

  //if(!Cookies.get('jwt'))

  let res = await axios.get("http://localhost:8080/auth/isLoggedIn", { headers: addHeader()})
  .catch((error) => {return error})

  return res;

}

export default IsLoggedIn;
