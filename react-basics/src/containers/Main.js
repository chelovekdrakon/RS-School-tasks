import React, { Component } from 'react';
import MainWrapper from '../components/StyledMain';
import MainHeader from './MainHeader';
import MainContent from './MainContent';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <MainWrapper>
                <MainHeader />
                <MainContent />
            </MainWrapper>
        );
    }
}

export default Main;
