import React from 'react';
import Logo from '../components/Logo';
import Search from '../components/Search';
import DisplayFilter from '../components/DisplayFilter';
import { LinearProgress } from 'material-ui';
import { connect } from 'react-redux';
import { restartPage } from '../actions';
import styled from 'styled-components';
import Immutable from 'immutable';

const StyledHeader = styled.header`
    display: flex;
    width: 100%;
    flex-flow: wrap row;
    justify-content: space-between;
    align-items: center;
    padding: 2% 7%;
    color: grey;

    > div:last-child {
        margin: 4% 0 0 !important;
        height: 0.7rem !important;
    }
`;

const getRatio = (map) => {
    const values = map.values();
    console.log(values);
    const allTodos = map.size;
    const done = values.filter(el => el).length;
    const linearProgress = (100 / allTodos) * done;
    return linearProgress;
}

const Header = (props) => {
    const linearProgress = 0;
    return (
        <StyledHeader>
            <Logo restart={props.restart} />
            <DisplayFilter />
            <Search />
            <LinearProgress mode="determinate" value={linearProgress || 0} />
        </StyledHeader>
    );
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

const mapActionToProps = (dispatch) => {
    return {
        restart() {
            dispatch(restartPage())
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(Header);
