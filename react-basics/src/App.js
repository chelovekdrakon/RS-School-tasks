import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey300 } from 'material-ui/styles/colors';
import BodyContainer from './components/BodyContainer';
import Header from './containers/Header';
import Main from './containers/Main';
import { connect } from 'react-redux';

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey300,
  }
});


const App = (props) => {
        return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <BodyContainer>
                <Header />
                <Main />
            </BodyContainer>
        </MuiThemeProvider>
    );
}


export default connect()(App);
