import axios from 'axios';
import { ParseJWT } from 'common';
import addHeader from 'axios/addHeader';

async function LikeBook(bookId) {

  var req = "http://localhost:8080/abs/books/"+bookId+"/like/"+ParseJWT().jti;
  let res = await axios.post(req,'',{ headers: addHeader()})
  .catch((error) => console.log("HERE",error));

  //console.log(req,res.status);
  return res;
}


// Auth_IsLoggedIn().then((value) => {
//   this.setState({IsLoggedIn: value.data.params});
// })

export default LikeBook;
