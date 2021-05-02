import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import './assets/scss/index.scss';
import Routes from './Routes';
import { Loader } from 'components';
//import { Auth_IsLoggedIn } from 'prepareAPI';
import packageJson from '../package.json';

const browserHistory = createBrowserHistory({
  basename: packageJson.basename
});

class App extends Component {

    state = {
      IsLoggedIn: true,
    }

    // componentDidMount(){
    //   Auth_IsLoggedIn().then(res=>
    //     this.setState({IsLoggedIn: res })
    //   );
    // }
    //
    // componentDidUpdate(){
    //   Auth_IsLoggedIn().then((res) =>{
    //     if(res !== this.state.IsLoggedIn)
    //       this.setState({IsLoggedIn: res });
    //   });
    // }

     AppDisplay(){
       if(this.state.IsLoggedIn === true){
         return(
         <ThemeProvider theme={theme}>
           <Router history={browserHistory}>
             <Routes />
           </Router>
         </ThemeProvider>
         );
       }else{
         return(
           <Loader message="Please login first ..."/>
         );
       }
    }

  render() {
    return (
      <div>
        {this.AppDisplay()}
      </div>
    );
  }
}



export default App;
