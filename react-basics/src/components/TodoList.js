import React from 'react';
import styled from 'styled-components';
import TodoField from '../components/TodoField';
import AdjustTodo from '../components/AdjustTodo';
import TodoWrapper from '../components/TodoWrapper';

const MyList = styled.ul`
    width: 100%;
`;

const TodoList = (props) => {
    return (
        <MyList>
            {
                props.text.map( li =>
                    <TodoWrapper category={props.category} key={li}>
                        <TodoField value={li} />
                        {
                            props.category && <AdjustTodo
                                deleteCategory={props.deleteCategory}
                                addSubcategory={props.addSubcategory}
                                              />
                        }
                    </TodoWrapper>

                )
            }
        </MyList>
    );
}


export default TodoList;
