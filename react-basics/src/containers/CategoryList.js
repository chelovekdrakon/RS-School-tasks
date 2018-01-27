import React from 'react';
import styled from 'styled-components';
import CategoryField from './CategoryField';
import { INPUT_FIELD, ADD_SUBCATEGORY } from '../constants';
import InputContainer from '../components/InputContainer';
import { checkSelection } from '../math';
import { withRouter } from 'react-router';

const ListWrapper = styled.ul`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-end;
`;

const CategoryList = (props) => {
    const res = [];

    props.list.forEach( (mapUnderCategory, categoryName) => {
        if (categoryName === INPUT_FIELD) {
            let element = (
                <InputContainer
                    key={`${categoryName}-${INPUT_FIELD}`}
                    placeholder={ADD_SUBCATEGORY}
                    onSubmit={input => props.confirmAdd([...props.pathToNode], input)}
                />
            );
            res.push(element);
        } else {
            let checked = checkSelection(props, categoryName);
            let element = (
                <CategoryField
                    key={categoryName}
                    category={props.category}
                    pathToNode={[...props.pathToNode, categoryName]}
                    value={categoryName}
                    pick={props.pick}
                    checked={checked}
                    selected={props.selected}
                />
            );
            res.push(element);
        }

        if (mapUnderCategory.size > 0) {
            let element = (
                <CategoryList
                    key={`${categoryName}-map`}
                    category={props.category - 0.03}
                    list={mapUnderCategory}
                    selected={props.selected}
                    selectedPath={props.selectedPath}
                    pathToNode={[...props.pathToNode, categoryName]}
                    confirmAdd={props.confirmAdd}
                    pick={props.pick}
                />
            )
            res.push(element);
        }
    })

    return (
        <ListWrapper>
            {res}
        </ListWrapper>
    );
}

export default withRouter(CategoryList);
