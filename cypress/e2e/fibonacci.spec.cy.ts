import { DELAY_IN_MS } from "../../src/constants/delays";
import {
  circleContentSelector,
  inputSelector,
  submitButtonSelector,
} from "../../src/constants/test-selectors";

describe("fibonacci test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
  });

  afterEach(() => {
    cy.get(inputSelector).should("be.empty");
  });

  it("button should be disabled when input is empty", () => {
    cy.get(inputSelector).should("be.empty");
    cy.get(submitButtonSelector).should("be.disabled");
  });

  it("button should be disabled if value exceeds max", () => {
    cy.get(inputSelector).type("45");
    cy.get(submitButtonSelector).should("be.disabled");
  });

  it("button should be enabled if value doesn't exceed max", () => {
    const rndValue = Math.round(Math.random() * 19).toString();
    cy.get(inputSelector).type(rndValue);
    cy.get(submitButtonSelector).should("not.be.disabled");
  });

  it("animation works correctly", () => {
    const testValue = 7;
    const expectedArray = [0, 1, 1, 2, 3, 5, 8, 13];

    cy.get(inputSelector).type(testValue.toString());
    cy.get(submitButtonSelector).should("not.be.disabled").click();
    cy.wait(DELAY_IN_MS * testValue);
    cy.get(circleContentSelector)
      .should("have.length", expectedArray.length)
      .each((el, index) => {
        const expectedValue = expectedArray[index];
        expect(el).contain(expectedValue.toString());
      });
  });
});
