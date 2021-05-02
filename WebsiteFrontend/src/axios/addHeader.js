export default function authHeader() {

  if (localStorage.getItem('jwt') !== null) {
    return { Authorization: 'Bearer ' + localStorage.getItem('jwt') };
  } else {
    return null;
  }
}
