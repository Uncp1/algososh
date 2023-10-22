import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  addButtonSelector,
  circleStateChgSelector,
  circleStateDefSelector,
  circleContentSelector,
  deleteButtonSelector,
  inputSelector,
  resetButtonSelector,
} from "../../src/constants/test-selectors";

const addCircle = (value: string) => {
  cy.get(inputSelector).type(value).should("have.value", value);
  cy.get(addButtonSelector).should("not.be.disabled").click();
  cy.get(circleStateChgSelector).contains(value);
  cy.wait(SHORT_DELAY_IN_MS);
  cy.get(circleStateDefSelector).contains(value);
};

const deleteCircle = (value: string, length: number) => {
  cy.get(deleteButtonSelector).should("not.be.disabled").click();
  cy.get(circleStateChgSelector).contains(value);
  cy.wait(SHORT_DELAY_IN_MS);
  cy.get(circleStateDefSelector).each((circle, circleIndex) => {
    cy.wrap(circle)
      .should("contain", circleIndex === length - 1 ? value : "")
      .and("contain", circleIndex === length - 1 ? "top" : "");
  });
};

describe("stack test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
  });

  afterEach(() => {
    cy.get(inputSelector).should("be.empty");
  });

  it("buttons should be disabled on page load", () => {
    cy.get(inputSelector).should("be.empty");
    cy.get(addButtonSelector).should("be.disabled");
    cy.get(deleteButtonSelector).should("be.disabled");
    cy.get(resetButtonSelector).should("be.disabled");
  });

  it("add function works correctly", () => {
    ["1", "2", "3"].forEach((value: string, index: number) => {
      addCircle(value);
      cy.get(circleContentSelector)
        .should("have.length", index + 1)
        .each((circle, circleIndex) => {
          cy.wrap(circle)
            .should("contain", circleIndex === index ? value : "")
            .and("contain", circleIndex === index ? "top" : "")
            .and("contain", circleIndex === index ? index : "");
        });
    });
  });

  it("delete function works correctly", () => {
    ["1", "2", "3"].forEach((value: string) => addCircle(value));
    deleteCircle("3", 3);
    cy.get(circleContentSelector).should("have.length", 2);
  });

  it("reset function works correctly", () => {
    ["1", "2", "3"].forEach((value: string) => addCircle(value));
    cy.get(resetButtonSelector).should("not.be.disabled").click();
    cy.get(circleContentSelector).should("have.length", 0);
  });
});
