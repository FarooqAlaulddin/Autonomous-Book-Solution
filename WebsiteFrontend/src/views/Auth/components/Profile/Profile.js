import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ParseJWT } from 'common';
import {Auth_UserInfo} from 'prepareAPI';
import { CommentsCard } from "components";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    width: '100%',
  },
  table: {
    minWidth: 350,
  },
  keyname:{
    fontWeight: 600,
    width: '40%'
  },
  comments:{
    maxHeight:'500px',
    overflow: 'auto'
  }

}));

function createData(name, value) {
  return { name, value};
}



 function Profile(){
   const classes = useStyles();
   const [likec, setLikesc] = useState(0);
   const [comments,setComments] = useState([]);
   const [fname, lname, email] = ParseJWT().aud.split('#');
   const userId = ParseJWT().jti;
   const rows = [
     createData('First Name', fname),
     createData('Last Name', lname),
     createData('Email', email),
     createData('Total Likes', likec)

   ];

   console.log(likec)


   useEffect((res) => {
     Auth_UserInfo(userId).then((res)=>{
       setLikesc(res[0])
     })
   },[likec]);

   useEffect((res) => {
     Auth_UserInfo(userId).then((res)=>{
       if(JSON.stringify(res) !== JSON.stringify(comments))
         setComments(res[1])
     })
   },[likec]);


   return (
     <div className={classes.root}>
       <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><h2>User Profile Data</h2></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className={classes.keyname}>{row.name}</TableCell>
                    <TableCell>
                        {typeof row.value === 'string' ? row.value.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }):row.value}
                      </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <br/>
          <Typography variant="h3" gutterBottom>
            User comments History
            <Typography className={classes.comments}>
              <CommentsCard comments={comments}/>
            </Typography>
          </Typography>

        </div>
   );
 };

export default Profile;
