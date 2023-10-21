import {
  inputSelector,
  submitButtonSelector,
} from "../../src/constants/test-selectors";

describe("string test", () => {
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
    cy.get(inputSelector).type("test");
    cy.get(submitButtonSelector).should("not.be.disabled");
  });

  it("animation works correctly for even number of characters", () => {
    cy.get(inputSelector).type("test");
    cy.get(submitButtonSelector).click();
  });
});
