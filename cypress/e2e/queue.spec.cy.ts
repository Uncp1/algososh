import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  addButtonSelector,
  circleStateChgSelector,
  circleStateDefSelector,
  circleContentSelector,
  deleteButtonSelector,
  inputSelector,
  resetButtonSelector,
  circleSelector,
} from "../../src/constants/test-selectors";

const addCircle = (value: string) => {
  cy.get(inputSelector).type(value).should("have.value", value);
  cy.get(addButtonSelector).should("not.be.disabled").click();
  cy.get(circleStateChgSelector).contains(value);
  cy.wait(SHORT_DELAY_IN_MS);
  cy.get(circleStateDefSelector).contains(value);
};

const deleteCircle = (value: string) => {
  cy.get(deleteButtonSelector).should("not.be.disabled").click();
  cy.get(circleStateChgSelector).contains(value);
  cy.wait(SHORT_DELAY_IN_MS);
};

describe("queue test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
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
      cy.get(circleContentSelector).each((circle, circleIndex) => {
        cy.wrap(circle)
          .should("contain", circleIndex === index ? value : "")
          .and("contain", circleIndex === index ? "tail" : "")
          .and("contain", circleIndex === 0 ? "head" : "");
      });
    });
  });

  it("delete function works correctly", () => {
    ["1", "2"].forEach((value: string) => addCircle(value));
    deleteCircle("1");
    cy.get(circleSelector).first().should("not.have.value");
    cy.get(circleContentSelector)
      .eq(1)
      .should("contain", "2")
      .should("contain", "head")
      .should("contain", "tail");
    deleteCircle("2");
    cy.get(circleSelector).should("not.have.value");
    cy.get(deleteButtonSelector).should("be.disabled");
    cy.get(resetButtonSelector).should("be.disabled");
  });

  it("reset function works correctly", () => {
    ["1", "2"].forEach((value: string) => addCircle(value));
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(resetButtonSelector).should("not.be.disabled").click();
    cy.get(circleSelector).should("not.have.value");
  });
});
