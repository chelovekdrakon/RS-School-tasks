import React from 'react';
import styled from 'styled-components';
import TodoField from '../components/TodoField';
import AdjustTodo from '../components/AdjustTodo';
import TodoWrapper from '../components/TodoWrapper';
import Immutable from 'immutable';

const MyList = styled.ul`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: ${props => props.category ? `flex-end` : `stratch`};

    > li {
        padding: ${props => props.category ? `0` : `3% 0%`};
    }
`;

const TodoList = (props) => {
    const lol = <div>hello</div>;
    if (props.list) {
        if (props.list.length === 0) return lol;
    const list = props.category ? Array.from(props.list.values()) : props.list;
    console.log(list, 'list at TodoList');
    return (
        <MyList category={props.category}>
            {
                list.map( element => {
                    if (Immutable.Map.isMap(element)) {
                        return (
                            <TodoList key={props.category}
                                category={props.category - 0.1}
                                list={element}
                                deleteCategory={props.deleteCategory}
                                addSubcategory={props.addSubcategory}
                            />
                        );
                    } else {
                        return (
                            <TodoWrapper category={props.category} key={element}>
                                <TodoField value={element} data={element} />
                                {
                                        props.category &&
                                    <AdjustTodo
                                        deleteCategory={props.deleteCategory}
                                        addSubcategory={props.addSubcategory}
                                        data={element}
                                    />
                                }
                            </TodoWrapper>
                        );
                    }
                }
                )
            }
        </MyList>
    );
} else {
    return lol;
}
}


export default TodoList;
