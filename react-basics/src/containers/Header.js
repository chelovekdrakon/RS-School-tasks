import React from 'react';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import DisplayFilter from '../components/DisplayFilter';
import { LinearProgress } from 'material-ui';
import { connect } from 'react-redux';
import { restartPage, toggleFilter, adjustDelivery } from '../actions';
import styled from 'styled-components';

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

const getRatio = (categoriesMap) => {
    const booleanArray = [];
    categoriesMap.forEach(todosUnderCategory => {
        todosUnderCategory.forEach(todo => {
            const boolean = todo.get('isDone');
            booleanArray.push(boolean);
        })
    });

    const amountOfTasks = booleanArray.length;
    const amountOfDone = booleanArray.filter(el => el).length;
    return (100 / amountOfTasks) * amountOfDone;
}

const Header = (props) => {
    const linearProgress = getRatio(props.todos);
    return (
        <StyledHeader>
            <Logo restart={props.restart} />
            <DisplayFilter onClick={props.toggle} />
            <SearchBar list={props.selectedList} onTap={props.searchRelevant} />
            <LinearProgress mode="determinate" value={linearProgress || 0} />
        </StyledHeader>
    );
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.get('todos'),
        selectedList: state.todos.get('selectedListMap')
    }
}

const mapActionToProps = (dispatch) => {
    return {
        restart() {
            dispatch(restartPage())
        },
        toggle() {
            dispatch(toggleFilter())
        },
        searchRelevant(value) {
            dispatch(adjustDelivery(value))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(Header);
