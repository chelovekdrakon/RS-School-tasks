import React from 'react';
import MainWrapper from '../wrappers/MainWrapper';
import CategorySection from './CategorySection';
import TodoSection from './TodoSection';
import { Route } from 'react-router-dom';

const Main = (props) => {
    return (
        <MainWrapper>
            <CategorySection />
            <Route exact path="/:category" component={TodoSection} />
        </MainWrapper>
    );
}

export default Main;
