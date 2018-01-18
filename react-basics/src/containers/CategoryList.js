import React, { Component } from 'react';
import Category from '../components/Category';
import styled from 'styled-components';

const MyList = styled.ul`
    width: 100%;
`;

class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: ['wowaskjhdakjshdjkahskjdhkashdhkasdhasjdh', 'bla'],
        }
    }

    render() {
        return (
            <MyList>
                {
                    this.state.categories.map( li =>
                        <Category value={li} key={li} />
                    )
                }
            </MyList>
        );
    }
}

export default CategoryList;
