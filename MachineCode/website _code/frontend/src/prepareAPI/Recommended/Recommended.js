import axios from 'axios/axios';
//import Cookies from 'js-cookie';

async function Recommended(userId) {

  let res = await axios.get("http://localhost:8080/abs/recommendation/"+userId)
  .catch((error) => {console.log(error); return error;});
  return res.data;
}

export default Recommended;
