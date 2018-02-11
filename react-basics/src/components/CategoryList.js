import React from 'react';
import styled from 'styled-components';
import CategoryField from './CategoryField';
import { INPUT_FIELD } from '../constants';
import { checkSelection } from '../math';
import { withRouter } from 'react-router';


const ListWrapper = styled.ul`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-end;
`;

const getCategoryList = (props, categoryName, mapUnderCategory) => {
    let pathToThisNode = [...props.pathToNode, categoryName];
    return (
        <CategoryList
            {...props}
            key={`${categoryName}-map`}
            indexCorrection={props.indexCorrection - 0.03}
            list={mapUnderCategory}
            pathToNode={pathToThisNode}
        />
    );
}


const CategoryList = (props) => {
    const res = [];

    const onPick = (pathToNode, categoryName) => () => {
        return props.checked ? console.log('not today, bro') : props.onPick(pathToNode, categoryName);
    }
    const onDelete = (pathToNode) => () => props.onDelete(pathToNode);
    const onAdd = (pathToNode) => () => props.onAdd(pathToNode);
    const onEdit = (pathToNode) => () => props.onEdit(pathToNode);
    const onConfirm = (pathToNode) => input => props.onConfirm([...pathToNode], input);
    const onTransit = (pathToNode, todoName) => () => props.onTransit(pathToNode, todoName);


    props.list.forEach( (mapUnderCategory, categoryName) => {
        let checked = checkSelection(props, categoryName);
        let pathToThisNode = [...props.pathToNode, categoryName];
        let inputField = categoryName === INPUT_FIELD ? true : false;

        let element = (
            <CategoryField
                key={categoryName}
                indexCorrection={props.indexCorrection}
                value={categoryName}
                path={categoryName === props.selected ? `/` : `/${props.selected}`}
                onPick={onPick(pathToThisNode, categoryName)}
                checked={checked}
                onDelete={onDelete(pathToThisNode)}
                onAdd={onAdd(pathToThisNode)}
                onEdit={onEdit(pathToThisNode)}
                onConfirm={onConfirm(props.pathToNode)}
                onTransit={onTransit(pathToThisNode, props.match.params.todo)}
                inputField={inputField}
            />
        );
        res.push(element);

        if (mapUnderCategory.size > 0) {
            let nestedList = getCategoryList(props, categoryName, mapUnderCategory);
            res.push(nestedList);
        }
    })

    return (
        <ListWrapper>
            {res}
        </ListWrapper>
    );
}

export default withRouter(CategoryList);
