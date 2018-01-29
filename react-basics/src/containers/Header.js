import React from 'react';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import DisplayFilter from '../components/DisplayFilter';
import HistoryAPI from '../components/HistoryAPI';
import { LinearProgress } from 'material-ui';
import { connect } from 'react-redux';
import { restartPage, toggleFilter, adjustDelivery } from '../actions';
import styled from 'styled-components';
import { getRatio } from '../math';
import { withRouter } from 'react-router';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

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

const Header = (props) => {
    const linearProgress = getRatio(props.todos);
    return (
        <StyledHeader>
            <Logo restart={props.restart} />
            <DisplayFilter onClick={props.toggle} />
            <SearchBar list={props.todos} onTap={props.searchRelevant} />
            <HistoryAPI
                canUndo={props.canUndo}
                canRedo={props.canRedo}
                onUndo={props.onUndo}
                onRedo={props.onRedo}
            />
            <LinearProgress mode="determinate" value={linearProgress || 0} />
        </StyledHeader>
    );
}

const mapStateToProps = (state) => {
    return {
        todos: state.present.todos.get('todos'),
        selectedList: state.present.todos.get('selectedListMap'),
        canUndo: state.past.length > 0,
        canRedo: state.future.length > 0
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
        },
        onUndo() {
            dispatch(UndoActionCreators.undo())
        },
        onRedo() {
            dispatch(UndoActionCreators.redo())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapActionToProps)(Header));
