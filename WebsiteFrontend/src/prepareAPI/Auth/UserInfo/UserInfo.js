import axios from 'axios/axios';
//import Cookies from 'js-cookie';

async function UserInfo(userId) {

  let comments = await axios.get("http://localhost:8080/abs/books/user/"+userId+"/info/comments")
  .catch((error) => {console.log(error); return error;});

  let likes = await axios.get("http://localhost:8080/abs/books/user/"+userId+"/info/likes")
  .catch((error) => {console.log(error); return error;});
  //console.log("http://localhost:8080/abs/books",res.status);

  return [likes.data,comments.data];

}


// Auth_IsLoggedIn().then((value) => {
//   this.setState({IsLoggedIn: value.data.params});
// })

export default UserInfo;
