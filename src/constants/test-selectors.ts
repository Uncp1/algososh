import { ElementStates } from "../types/states";

export const inputSelector = '[data-testid="input"]';

export const submitButtonSelector = '[data-testid="submit-button"]';

export const addButtonSelector = '[data-testid="add-button"]';
export const deleteButtonSelector = '[data-testid="delete-button"]';
export const resetButtonSelector = '[data-testid="reset-button"]';

export const circleSelector = '[class*="circle"]';
export const circleContentSelector = '[class*="circle_content"]';
export const circleStateChgSelector = `[class*=circle_${ElementStates.Changing}]`;
export const circleStateDefSelector = `[class*=circle_${ElementStates.Default}]`;
