import * as routes from "../../src/constants/routes";

describe("main page links", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  afterEach(() => {
    cy.get(routes.LINK_HOME_PAGE).click();
  });

  it("rout /recursion", () => {
    cy.get(routes.LINK_STRING_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_STRING_TEST_ID);
  });

  it("rout /fibonacci", () => {
    cy.get(routes.LINK_FIBONACCI_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_FIBONACCI_TEST_ID);
  });

  it("rout /sorting", () => {
    cy.get(routes.LINK_ARRAY_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_ARRAY_TEST_ID);
  });

  it("rout /stack", () => {
    cy.get(routes.LINK_STACK_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_STACK_TEST_ID);
  });

  it("rout /queue", () => {
    cy.get(routes.LINK_QUEUE_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_QUEUE_TEST_ID);
  });

  it("rout /list", () => {
    cy.get(routes.LINK_LIST_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_LINKED_LIST_TEST_ID);
  });
});
