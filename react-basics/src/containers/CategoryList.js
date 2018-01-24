import React from 'react';
import styled from 'styled-components';
import CategoryField from '../components/CategoryField';
import Immutable from 'immutable';
import { pickCategory } from '../actions';
import { connect } from 'react-redux';

const ListWrapper = styled.ul`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-end;
`;

const CategoryList = (props) => {
    const list = Array.from(props.list.values());
    return (
        <ListWrapper>
            {
                list.map( element => {
                    if (Immutable.Map.isMap(element)) {
                        return (
                            <CategoryList
                                key={element}
                                category={props.category - 0.1}
                                list={element}
                            />
                        );
                    } else {
                        let checked = props.selected === element ? true : false;
                        return (
                            <CategoryField
                                key={element}
                                category={props.category}
                                value={element}
                                pick={props.pickCategoryField}
                                checked={checked}
                            />
                        );
                    }
                })
            }
        </ListWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        selected: state.todos.get('selectedCategory')
    }
}

const mapActionToProps = (dispatch) => {
    return {
        pickCategoryField(value) {
            dispatch(pickCategory(value))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(CategoryList);
