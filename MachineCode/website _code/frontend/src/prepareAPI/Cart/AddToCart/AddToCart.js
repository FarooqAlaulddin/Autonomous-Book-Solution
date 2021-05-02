import axios from 'axios/axios';
//import Cookies from 'js-cookie';

async function AddToCart(userId, bookId) {

  let res = await axios.post("http://localhost:8080/abs/addToCart/"+userId+"/"+bookId,{
    'pickup_date':null,
    'pickup_time': null,
    'pickup_time_end': null
  })
  .catch((error) => {console.log(error); return error;});

  return res.data;


}

export default AddToCart;
