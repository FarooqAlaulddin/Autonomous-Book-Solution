import axios from 'axios';

async function Register(val) {
  console.log('prepareAPI Register')

  let res = await axios.post('http://localhost:8080/register',val)
  .catch(function (error) {
    return error;
  });

  return res;
};

export default Register;
