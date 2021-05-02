import axios from 'axios/axios';
//import Cookies from 'js-cookie';

async function Post(bookid,comment,userId) {

  let res = await axios.post("http://localhost:8080/abs/books/"+bookid+"/"+"addcomment",{
    'comment':comment,
    'userId': userId
  })
  .catch((error) => {console.log(error); return error;});

  //console.log("http://localhost:8080/abs/books",res.status);

  return res.data;

}

export default Post;
