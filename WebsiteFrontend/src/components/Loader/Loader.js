import React from 'react';
import LinearProgress  from '@material-ui/core/LinearProgress';
import { Grid } from '@material-ui/core';


const Loader = (props) => {
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
      >
      <div>
        <LinearProgress style={{height: '10px'}}/>
        <h4 style={{fontFamily:'monospace'}}>{props.message}</h4>
      </div>
    </Grid>


  );
};

Loader.defaultProps = {
  message : 'Loading ..'
};

export default Loader;
