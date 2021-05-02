import axios from 'axios/axios';
//import Cookies from 'js-cookie';

async function QrCode(orderId) {

  let res = await axios.get("http://localhost:8080/abs/qrcode/"+orderId)
  .catch((error) => {console.log(error); return error;});
  //console.log("http://localhost:8080/abs/books",res.status);
  return res.data;
}
export default QrCode;
