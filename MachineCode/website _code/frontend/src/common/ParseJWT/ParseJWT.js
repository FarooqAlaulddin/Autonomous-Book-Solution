import Cookies from 'js-cookie';

export default function ParseJWT(){


  if(localStorage.getItem('jwt')){
    var token = localStorage.getItem('jwt');
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }else{
    return {
      "sub": "",
      "aud": "",
      "exp": "",
      "iat": "",
      "jti": ""
    }
  }
};
