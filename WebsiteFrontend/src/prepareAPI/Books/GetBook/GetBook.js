import axios from 'axios/axios';
//import Cookies from 'js-cookie';

async function GetBook(bookid) {

  let res = await axios.get("http://localhost:8080/abs/books/"+bookid)
  .catch((error) => {console.log(error); return error;});

  //console.log("http://localhost:8080/abs/books",res.status);

  return res.data;

}


// Auth_IsLoggedIn().then((value) => {
//   this.setState({IsLoggedIn: value.data.params});
// })

export default GetBook;
