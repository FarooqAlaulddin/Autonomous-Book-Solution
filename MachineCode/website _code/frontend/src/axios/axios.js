import axios from 'axios';
import Cookies from 'js-cookie';
import addHeader from 'axios/addHeader';

export default axios.create({
      headers: addHeader()
  });
