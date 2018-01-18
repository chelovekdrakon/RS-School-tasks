import React, { Component } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'material-ui';
import MaterialIcon from 'material-icons-react';

const CategoryWrapper = styled.li`
    border: 1px solid black;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;

    > div {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
    }

    > div:first-child {
        width: 75%;

        > div:first-child {
            width: 10% !important;
        }

        > div:nth-child(2) {
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;

            &:hover {
                cursor: default;
            }
        }
    }

    > div:nth-child(2) {
        width: 15%;
    }

    > div:last-child {
        width: 15%;
    }
`;


class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoriesIn: ['wow', 'bla'],
        }
    }

    render() {
        return (
            <CategoryWrapper>
                <div>
                    <Checkbox />
                    <div> {this.props.value} </div>
                    <MaterialIcon icon="mode_edit" />
                </div>
                <div></div>
                <div>
                    <MaterialIcon icon="delete" />
                    <MaterialIcon icon="playlist_add" />
                </div>
            </CategoryWrapper>
        );
    }
}

export default Category;
