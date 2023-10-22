import { DELAY_IN_MS } from "../../src/constants/delays";
import {
  addButtonSelector,
  addHeadButtonSelector,
  addTailButtonSelector,
  circleContentSelector,
  circleSelector,
  deleteButtonSelector,
  inputIndexSelector,
  inputSelector,
  submitButtonSelector,
} from "../../src/constants/test-selectors";

const initialValues = ["0", "34", "8", "1"];

describe("list test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  afterEach(() => {
    cy.get(inputSelector).should("be.empty");
    cy.get(inputIndexSelector).should("be.empty");
  });

  it("add buttons should be disabled when input is empty", () => {
    cy.get(inputIndexSelector).should("be.empty");
    cy.get(addHeadButtonSelector).should("be.disabled");
    cy.get(addTailButtonSelector).should("be.disabled");
  });

  it("index buttons should be disabled when index input is empty", () => {
    cy.get(inputSelector).type("test");
    cy.get(addButtonSelector).should("be.disabled");
    cy.get(deleteButtonSelector).should("be.disabled");
  });

  it("starting values are displayed correctly", () => {
    cy.get(circleContentSelector).should("have.length", initialValues.length);
  });
});
