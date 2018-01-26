export const checkSelection = (props, categoryName) => {
    const selectedLength = props.selectedPath.length;
    const thisLength = [...props.pathToNode, categoryName].length;

    if (props.selected === categoryName
        && selectedLength === thisLength) {
            return true;
        } else {
            return false;
        }
}

export const getRatio = (categoriesMap) => {
    const amountOfCategories = categoriesMap.size;

    let solvedCategories = 0;
    categoriesMap.forEach(todosUnderCategory => {
        const comparisonArray = [];
        todosUnderCategory.forEach(todo => {
            const boolean = todo.get('isDone');
            if (boolean) {
                comparisonArray.push(boolean);
            }
        });
        if (comparisonArray.length === todosUnderCategory.size) {
            solvedCategories++;
        }
    });

    return (100 / amountOfCategories) * solvedCategories;
}
