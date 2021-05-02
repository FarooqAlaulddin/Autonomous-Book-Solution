import axios from 'axios/axios';
//import Cookies from 'js-cookie';

async function CheckedoutOrders(userId) {

  let res = await axios.get("http://localhost:8080/abs/mycheckedoutorders/"+userId)
  .catch((error) => {console.log(error); return error;});
  //console.log("http://localhost:8080/abs/books",res.status);
  return res.data;
}

export default CheckedoutOrders;
