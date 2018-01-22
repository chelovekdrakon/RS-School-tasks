import React from 'react';
import TodoList from './TodoList';
import styled from 'styled-components';
import AddField from '../containers/AddField';
import { connect } from 'react-redux';

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
                />
            </header>
            <TodoList
                category={props.category}
                list={props.list}
            />
        </Section>
    );
}

export default connect()(MainSection);
