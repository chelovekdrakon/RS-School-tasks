import React from 'react';
import CategorySection from './CategorySection';
import TodoSection from './TodoSection';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

const MainWrapper = styled.main`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: flex-start;

    font-size: 2rem;
    padding: 0% 5%;

    > section {
        padding: 0% 2%;

        & > header {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: flex-start;

            width: 100%;
            padding: 1rem 7% 3rem;

            > div {
                display: flex;
                flex-wrap: nowrap;

                > input {
                    border: 1px solid;
                    border-radius: 5px 0 0 5px;
                    border-color: Gainsboro transparent Gainsboro Gainsboro;
                }
            }
        }
    }
`;

const Main = (props) => {
    return (
        <MainWrapper>
            <CategorySection />
            <Route exact path="/:category" component={TodoSection} />
        </MainWrapper>
    );
}

export default Main;
