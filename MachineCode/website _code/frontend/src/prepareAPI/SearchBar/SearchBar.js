import axios from 'axios/axios';
//import Cookies from 'js-cookie';

async function SearchBar(keyword) {

  let res = await axios.post("http://localhost:8080/abs/search?keyword="+keyword)
  .catch((error) => {console.log(error); return error;});
  //console.log("http://localhost:8080/abs/books",res.status);
  return res.data;
}

export default SearchBar;
