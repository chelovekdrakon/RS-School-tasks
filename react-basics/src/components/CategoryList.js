import React from 'react';
import styled from 'styled-components';
import CategoryField from '../components/CategoryField';
import Immutable from 'immutable';

const ListWrapper = styled.ul`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-end;
`;

const CategoryList = (props) => {
    const list = Array.from(props.list.values()).reverse();
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
                                pick={props.pick}
                                checked={checked}
                            />
                        );
                    }
                })
            }
        </ListWrapper>
    );
}

export default CategoryList;
