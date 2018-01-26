import React from 'react';
import styled from 'styled-components';
import CategoryField from '../components/CategoryField';
import { INPUT_FIELD, ADD_SUBCATEGORY } from '../constants';
import InputContainer from './InputContainer';
import { checkSelection } from '../verifications';
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

            res.push(
                <InputContainer
                    key={`${categoryName}-${INPUT_FIELD}`}
                    placeholder={ADD_SUBCATEGORY}
                    onSubmit={input => props.addSubCategory([...props.pathToNode], input)}
                />
            );

        } else {
            let checked = checkSelection(props, categoryName);
            res.push(
                <CategoryField
                    key={categoryName}
                    category={props.category}
                    pathToNode={[...props.pathToNode, categoryName]}
                    value={categoryName}
                    pick={props.pick}
                    checked={checked}
                />
            );

        }

        if (mapUnderCategory.size > 0) {
            res.push(
                <CategoryList
                    key={`${categoryName}-map`}
                    category={props.category - 0.03}
                    list={mapUnderCategory}
                    selected={props.selected}
                    selectedPath={props.selectedPath}
                    pathToNode={[...props.pathToNode, categoryName]}
                    addSubCategory={props.addSubCategory}
                    pick={props.pick}
                />
            );
        }
    })

    return (
        <ListWrapper>
            {res}
        </ListWrapper>
    );
}

export default withRouter(CategoryList);
