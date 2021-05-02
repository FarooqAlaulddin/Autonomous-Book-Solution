import axios from 'axios/axios';
//import Cookies from 'js-cookie';

async function Order(orderId, pickup_date, pickup_time, pickup_time_end) {

  let res = await axios.post("http://localhost:8080/abs/order/"+orderId,{
    'pickup_date':pickup_date,
    'pickup_time': pickup_time,
    'pickup_time_end': pickup_time_end
  })
  //.catch((error) => {console.log(error); return error;});


  return res.data;

}

export default Order;
