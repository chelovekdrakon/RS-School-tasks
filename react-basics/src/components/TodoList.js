import React from 'react';
import styled from 'styled-components';
import TodoField from '../components/TodoField';
import AdjustTodo from '../components/AdjustTodo';
import TodoWrapper from '../components/TodoWrapper';

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
    return (
        <MyList category={props.category}>
            {
                props.text.map( li => {
                    if (Array.isArray(li)) {
                        return (
                            <TodoList key={props.category}
                                category={props.category - 0.1}
                                text={li}
                                deleteCategory={props.deleteCategory}
                                addSubcategory={props.addSubcategory}
                            />
                        );
                    } else {
                        return (
                            <TodoWrapper category={props.category} key={li}>
                                <TodoField value={li} data={li} />
                                {
                                        props.category &&
                                    <AdjustTodo
                                        deleteCategory={props.deleteCategory}
                                        addSubcategory={props.addSubcategory}
                                        data={li}
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
}


export default TodoList;
