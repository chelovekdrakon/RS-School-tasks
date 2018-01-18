import React, { Component } from 'react';
import CategoryList from './CategoryList';
import styled from 'styled-components';

const Aside = styled.aside`
    display: flex;
    width: 30%;
`;

class AsideBar extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <Aside>
                <CategoryList />
            </Aside>
        );
    }
}

export default AsideBar;
