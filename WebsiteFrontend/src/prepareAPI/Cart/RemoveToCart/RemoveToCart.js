import axios from 'axios/axios';
//import Cookies from 'js-cookie';

async function RemoveToCart(userId, bookId) {

  let res = await axios.post("http://localhost:8080/abs/removeFromCart/"+userId+"/"+bookId)
  .catch((error) => {console.log(error); return error;});

  return res.data;


}

export default RemoveToCart;
