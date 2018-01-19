import React from 'react';
import TodoList from './TodoList';
import styled from 'styled-components';
import AddField from '../containers/AddField';

const Section = styled.section`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: ${props => props.aside ? '35%' : '65%'};
`;

const MainSection = (props) => {
    return (
        <Section aside={props.aside}>
            <header>
                <AddField
                    placeholder={props.placeholder}
                    onSubmit={props.onAdd}
                    onTap={props.onTap}
                    value={props.value}/>
            </header>
            <TodoList
                category={props.category}
                text={props.todos}
                deleteCategory={props.deleteCategory}
                addSubcategory={props.addSubcategory}
            />
        </Section>
    );
}

export default MainSection;
