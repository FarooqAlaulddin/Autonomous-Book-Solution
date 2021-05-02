import axios from 'axios';
//import Cookies from 'js-cookie';

async function GetBooks() {

  var book = arguments[0];
  //console.log(book);

  if(typeof book === 'undefined'){

    let res = await axios.get("http://localhost:8080/abs/books")
    .catch((error) => {console.log(error); return error;});

    //console.log("http://localhost:8080/abs/books",res.status);

    return res.data;

  }else{


    let res = await axios.get("http://localhost:8080/abs/books/"+book)
    .catch((error) => {console.log(error); return error;});

    //console.log("http://localhost:8080/abs/books",res.status);

    return res.data;


  }


}


// Auth_IsLoggedIn().then((value) => {
//   this.setState({IsLoggedIn: value.data.params});
// })

export default GetBooks;
