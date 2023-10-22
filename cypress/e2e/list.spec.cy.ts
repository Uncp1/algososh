import { DELAY_IN_MS } from "../../src/constants/delays";
import {
  circleContentSelector,
  circleSelector,
  inputSelector,
  submitButtonSelector,
} from "../../src/constants/test-selectors";

describe("list test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
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

  it("animation works correctly for odd number of characters", () => {
    cy.get(inputSelector).type("react");
    cy.get(submitButtonSelector).click();

    cy.get(circleSelector).each((circle, index) => {
      cy.wrap(circle).should(
        "have.css",
        "border",
        index === 0 || index === 4
          ? "4px solid rgb(210, 82, 225)"
          : "4px solid rgb(0, 50, 255)"
      );
    });

    cy.wait(DELAY_IN_MS);

    cy.get(circleSelector)
      .eq(1)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get(circleSelector)
      .eq(3)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get(circleSelector)
      .eq(2)
      .should("have.css", "border", "4px solid rgbrgb(0, 50, 255)");
    cy.get(circleSelector)
      .eq(0)
      .should("have.css", "border", "4px solid rgb(127, 224, 81)");
    cy.get(circleSelector)
      .eq(4)
      .should("have.css", "border", "4px solid rgb(127, 224, 81)");

    cy.get(circleSelector).eq(0).should("contain", "t");
    cy.get(circleSelector).eq(4).should("contain", "r");
  });

  it("animation works correctly for even number of characters", () => {
    cy.get(inputSelector).type("buba");
    cy.get(submitButtonSelector).click();

    cy.get(circleSelector).each((circle, index) => {
      cy.wrap(circle).should(
        "have.css",
        "border",
        index === 0 || index === 3
          ? "4px solid rgb(210, 82, 225)"
          : "4px solid rgb(0, 50, 255)"
      );
    });

    cy.get(circleSelector).eq(0).should("contain", "a");
    cy.get(circleSelector).eq(3).should("contain", "b");
    cy.get(circleSelector)
      .eq(1)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get(circleSelector)
      .eq(2)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get(circleSelector)
      .eq(0)
      .should("have.css", "border", "4px solid rgb(127, 224, 81)");
    cy.get(circleSelector)
      .eq(3)
      .should("have.css", "border", "4px solid rgb(127, 224, 81)");

    cy.wait(DELAY_IN_MS);

    cy.get(circleSelector).eq(1).should("contain", "b");
    cy.get(circleSelector).eq(2).should("contain", "u");
    cy.get(circleSelector).each((circle, index) => {
      cy.wrap(circle).should(
        "have.css",
        "border",
        "4px solid rgb(127, 224, 81)"
      );
    });
  });
});
