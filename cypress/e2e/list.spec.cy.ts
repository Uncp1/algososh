import { DELAY_IN_MS } from "../../src/constants/delays";
import {
  addButtonSelector,
  addHeadButtonSelector,
  addTailButtonSelector,
  circleContentSelector,
  circleStateChgSelector,
  circleStateDefSelector,
  deleteButtonSelector,
  deleteHeadButtonSelector,
  deleteTailButtonSelector,
  inputIndexSelector,
  inputSelector,
} from "../../src/constants/test-selectors";

const initialValues = ["0", "34", "8", "1"];

describe("test linked list", () => {
  beforeEach(() => {
    cy.visit("/list");
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
    initialValues.forEach((value, index) => {
      cy.get(circleContentSelector).each((el, id) => {
        index === id && expect(el).contain(value);
      });
    });

    cy.get(circleContentSelector).eq(0).should("contain", "head");

    cy.get(circleContentSelector).eq(3).should("contain", "tail");
  });

  it("add to head works correctly", () => {
    const testValue = "5";
    cy.get(inputSelector).should("be.empty").type(testValue);
    cy.get(addHeadButtonSelector).should("not.be.disabled").click();
    cy.get(circleStateChgSelector).should("contain", testValue);
    cy.wait(DELAY_IN_MS);
    cy.get(circleContentSelector).eq(0).should("contain", "head");
    cy.get(circleStateDefSelector).should("contain", testValue);
  });

  it("add to tail works correctly", () => {
    const testValue = "13";
    cy.get(inputSelector).should("be.empty").type(testValue);
    cy.get(addTailButtonSelector).should("not.be.disabled").click();
    cy.get(circleStateChgSelector).should("contain", testValue);
    cy.wait(DELAY_IN_MS);
    cy.get(circleContentSelector)
      .eq(initialValues.length)
      .should("contain", "tail");
    cy.get(circleStateDefSelector).should("contain", testValue);
  });

  it("add at index works correctly", () => {
    const testValue = "69";
    const testIndex = "2";
    cy.get(inputSelector).should("be.empty").type(testValue);
    cy.get(inputIndexSelector).should("be.empty").type(testIndex);
    cy.get(addButtonSelector).should("not.be.disabled").click();
    cy.get(circleStateChgSelector).should("contain", testValue);
    cy.wait(DELAY_IN_MS * initialValues.length);
    cy.get(circleContentSelector).eq(0).should("contain", "head");
    cy.get(circleContentSelector)
      .eq(initialValues.length)
      .should("contain", "tail");
    cy.get(circleStateDefSelector).should("contain", testValue);
  });

  it("delete head works correctly", () => {
    cy.get(deleteHeadButtonSelector).should("not.be.disabled").click();
    cy.get(circleStateChgSelector).should("contain", initialValues[0]);
    cy.wait(DELAY_IN_MS);
    cy.get(circleContentSelector).should(
      "have.length",
      initialValues.length - 1
    );
    cy.get(circleContentSelector).eq(0).should("contain", "head");
    cy.get(circleContentSelector)
      .eq(initialValues.length - 2)
      .should("contain", "tail");
  });

  it("delete tail works correctly", () => {
    cy.get(deleteTailButtonSelector).should("not.be.disabled").click();
    cy.get(circleStateChgSelector).should(
      "contain",
      initialValues[initialValues.length - 1]
    );
    cy.wait(DELAY_IN_MS);
    cy.get(circleContentSelector).should(
      "have.length",
      initialValues.length - 1
    );
    cy.get(circleContentSelector).eq(0).should("contain", "head");
    cy.get(circleContentSelector)
      .eq(initialValues.length - 2)
      .should("contain", "tail");
  });

  it("delete at index works correctly", () => {
    const testIndex = "2";
    cy.get(inputIndexSelector).should("be.empty").type(testIndex);
    cy.get(deleteButtonSelector).should("not.be.disabled").click();
    cy.get(circleContentSelector).eq(+testIndex).should("not.have.value");
    cy.get(circleStateChgSelector).contains(initialValues[testIndex]);
    cy.wait(DELAY_IN_MS);
    cy.get(circleContentSelector).should(
      "have.length",
      initialValues.length - 1
    );
  });
});
