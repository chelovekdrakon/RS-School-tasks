import React from 'react';
import styled from 'styled-components';
import TodoField from '../components/TodoField';
import { withRouter } from 'react-router';

const ListWrapper = styled.ul`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stratch;
`;

const TodoList = (props) => {
    const list = Array.from(props.list.keys());
    return (
        <ListWrapper>
            {
                list.map( element => {
                    let done = props.list.getIn([`${element}`, 'isDone']);
                    return !props.showDone && done ? null : (
                        <TodoField
                            key={element}
                            value={element}
                            onClick={() => props.pick(element)}
                            checked={done}
                        />
                    );
                })
                .reverse()
            }
        </ListWrapper>
    );
}

export default withRouter(TodoList);
