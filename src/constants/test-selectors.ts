import { ElementStates } from "../types/states";

export const inputSelector = '[data-testid="input"]';
export const inputIndexSelector = '[data-testid="input-index"]';
export const submitButtonSelector = '[data-testid="submit-button"]';

export const addButtonSelector = '[data-testid="add-button"]';
export const deleteButtonSelector = '[data-testid="delete-button"]';
export const resetButtonSelector = '[data-testid="reset-button"]';

export const addHeadButtonSelector = '[data-testid="add-head"]';
export const addTailButtonSelector = '[data-testid="add-tail"]';
export const deleteHeadButtonSelector = '[data-testid="delete-head"]';
export const deleteTailButtonSelector = '[data-testid="delete-tail"]';

export const circleSelector = '[class*="circle_circle"]';
export const circleContentSelector = '[class*="circle_content"]';
export const circleStateChgSelector = `[class*=circle_${ElementStates.Changing}]`;
export const circleStateDefSelector = `[class*=circle_${ElementStates.Default}]`;
