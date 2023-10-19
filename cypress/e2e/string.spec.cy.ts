import {
  inputSelector,
  submitButtonSelector,
} from "../../src/constants/test-selectors";

describe("string", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  afterEach(() => {
    cy.get(inputSelector).should("be.empty");
  });

  it("button should be disabled when input is empty", () => {
    cy.get(inputSelector).should("be.empty");
    cy.get(submitButtonSelector).should("be.disabled");
  });

  it("button should be enabled when input isn't empty", () => {
    cy.get(inputSelector).should("have.value", "string");
    cy.get(submitButtonSelector).should("not.be.disabled");
  });
});
