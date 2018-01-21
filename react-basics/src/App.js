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

const UsersList = (props) => {
    const users = props.users.map( user =>
        <li key={user._id} onClick={() =>  props.onUserClick(user)}>
            {user.name.last}
        </li>
    );

    return (
        <ul> {users} </ul>
    );
}

const App = (props) => {
    const { users } = props;
    let UsersComponent;

    if (!users.length) {
        UsersComponent = <div> Loading... </div>
    } else {
        UsersComponent = (
            <UsersList users={users} onUserClick={ user => props.setCurrentUser(user) }/>
        )
    }

    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <BodyContainer>
                <Header />
                <Main />
                { UsersComponent }
                { props.currentUser ? <UserDetails user={props.currentUser} /> : null }
            </BodyContainer>
        </MuiThemeProvider>
    );
}

const UserDetails = (props) => {
    return (
        <div>
            <div> Name: {props.user.name.first} {props.user.name.last} </div>
            <div> Balance: {props.user.balance}</div>
            <div> Company: {props.user.company}</div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        users: state.users.usersList,
        currentUser: state.users.usersMap.get(state.currentUserID)
    }
}

const mapActionToProps = (dispatch) => {
    return {
        setCurrentUser(user) {
            dispatch({
                type: 'SET_CURRENT_USER_ID',
                payload: user._id
            })
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(App);
