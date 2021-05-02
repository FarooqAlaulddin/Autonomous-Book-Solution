import axios from 'axios';

async function Login(val) {

  let res = await axios.post('http://localhost:8080/authenticate', val)
  .catch(function (error) {
    return error;
  });

  return res;
};

export default Login;
