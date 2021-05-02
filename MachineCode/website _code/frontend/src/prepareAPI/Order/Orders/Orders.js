import axios from 'axios/axios';
//import Cookies from 'js-cookie';

async function Orders(userId) {

  let res = await axios.get("http://localhost:8080/abs/myorders/"+userId)
  .catch((error) => {console.log(error); return error;});

  //console.log("http://localhost:8080/abs/books",res.status);

  return res.data;

}

export default Orders;
