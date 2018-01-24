
// TYPE OF ACTIONS

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_SUB_CATEGORY = 'ADD_SUB_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const PICK_CATEGORY = 'PICK_CATEGORY';
export const CATEGORY_INPUT_TAP = 'CATEGORY_INPUT_TAP';

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TODO_INPUT_TAP = 'TODO_INPUT_TAP';

export const RESTART = 'RESTART';


// OTHER CONSTANTS

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_DONE: 'SHOW_DONE'
}


// ACTION CREATORS

export function addCategory(text) {
  return {
      type: ADD_CATEGORY,
      payload: text
  }
}

export function addSubCategory(value) {
  return {
      type: ADD_SUB_CATEGORY,
      payload: value
  }
}

export function pickCategory(value) {
  return {
      type: PICK_CATEGORY,
      payload: value
  }
}

export function deleteCategory(index) {
  return {
      type: DELETE_CATEGORY,
      payload: index
  }
}

export function reflectCategoryInput(text) {
  return {
      type: CATEGORY_INPUT_TAP,
      payload: text
  }
}


export function addTodo(text) {
  return {
      type: ADD_TODO,
      payload: text
  }
}

export function restartPage() {
  return {
      type: RESTART,
      payload: 'Page restart by click on H1'
  }
}

export function toggleTodo(value) {
  return {
      type: TOGGLE_TODO,
      payload: value
  }
}

export function reflectTodoInput(text) {
  return {
      type: TODO_INPUT_TAP,
      payload: text
  }
}
