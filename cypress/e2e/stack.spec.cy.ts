import {
  addButtonSelector,
  deleteButtonSelector,
  inputSelector,
  resetButtonSelector,
} from "../../src/constants/test-selectors";

const addCircle = (value: string) => {
  cy.get(inputSelector).type(value).should("have.value", value);
  cy.get(addButtonSelector).should("not.be.disabled").click();
};

describe("stack test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
  });

  afterEach(() => {
    cy.get(inputSelector).should("be.empty");
  });

  it("buttons should be enabled and disabled according to input", () => {
    cy.get(inputSelector).should("be.empty");
    cy.get(addButtonSelector).should("be.disabled");
    cy.get(deleteButtonSelector).should("be.disabled");
    cy.get(resetButtonSelector).should("be.disabled");
    //???
    cy.get(inputSelector).type("buba");
    cy.get(addButtonSelector).should("not.be.disabled");
    cy.get(deleteButtonSelector).should("be.disabled");
    cy.get(resetButtonSelector).should("be.disabled");

    cy.get(addButtonSelector).click();
    cy.get(addButtonSelector).should("be.disabled");
    cy.get(deleteButtonSelector).should("not.be.disabled");
    cy.get(resetButtonSelector).should("not.be.disabled");
  });
});
