import React from 'react';
import CategorySection from './CategorySection';
import TodoSection from './TodoSection';
import TodoEditSection from './TodoEditSection';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

const MainWrapper = styled.main`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: flex-start;

    font-size: 2rem;
    padding: 0% 5%;
`;

const Main = (props) => {
    return (
        <MainWrapper>
            <CategorySection />
            <Route exact path="/:category" component={TodoSection} />
            <Route exact path="/:category/:todo" component={TodoEditSection} />
        </MainWrapper>
    );
}

export default Main;
