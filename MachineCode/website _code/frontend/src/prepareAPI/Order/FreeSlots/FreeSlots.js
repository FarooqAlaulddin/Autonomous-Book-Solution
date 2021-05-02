import axios from 'axios/axios';

async function FreeSlots(date) {

  let res = await axios.post("http://localhost:8080/abs/freeSlots",{
    "date": date
  })
  .catch((error) => {console.log(error); return error;});

  return res.data;
}

export default FreeSlots;
