import React from 'react';
import TodoList from '../containers/TodoList';
import styled from 'styled-components';
import InputContainer from '../containers/InputContainer';

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
                <InputContainer
                    placeholder={props.placeholder}
                    onSubmit={props.onAdd}
                />
            </header>
            <TodoList
                category={props.category}
                list={props.list}
            />
        </Section>
    );
}

export default MainSection;
