import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey300 } from 'material-ui/styles/colors';
import Header from './containers/Header';
import Main from './containers/Main';
import { connect } from 'react-redux';
import styled from 'styled-components';

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey300,
  }
});

const MainWrapper = styled.div`
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
`;


const App = (props) => {
        return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <MainWrapper>
                <Header />
                <Main />
            </MainWrapper>
        </MuiThemeProvider>
    );
}


export default connect()(App);
