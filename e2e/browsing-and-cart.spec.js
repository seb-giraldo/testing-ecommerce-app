import { test, expect } from "@playwright/test";

test.describe("Browing and adding to cart", () => {
  test("loads the product listing and adds an item to the cart", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();

    const addButton = page.getByRole("button", {
      name: "Add Wireless Headphones to cart",
    });
    await addButton.click();

    await expect(page.getByRole("link", { name: "Cart (1)" })).toBeVisible();
  });

  test("increases the cart count when the same product is added twice", async ({
    page,
  }) => {
    await page.goto("/");
    const addButton = page.getByRole("button", {
      name: "Add Ceramic Mug to cart",
    });
    await addButton.click();
    await addButton.click();

    await expect(page.getByRole("link", { name: "Cart (2)" })).toBeVisible();
  });

  test("tracks two different products added to the cart", async ({ page }) => {
    await page.goto("/");

    page.getByRole("button", { name: "Add Ceramic Mug to cart" }).click();
    page.getByRole("button", { name: "Add Desk Lamp to cart" }).click();

    await expect(page.getByRole("link", { name: "Cart (2)" })).toBeVisible();
  });
});

test.describe("Cart Management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Add Desk Lamp to cart" }).click();

    //Navigate to the cart the way a real user would
    await page.getByRole("link", { name: "Cart (1)" }).click();

    await expect(
      page.getByRole("heading", { name: "Your Cart" }),
    ).toBeVisible();
  });

  test("increases and dereases the quantity of an item", async ({ page }) => {
    const quantity = page.locator('[aria-label="Quantity of Desk Lamp"]');

    await page
      .getByRole("button", { name: "Increase quantity of Desk Lamp" })
      .click();
    await expect(quantity).toHaveText("2");

    await page
      .getByRole("button", { name: "Decrease quantity of Desk Lamp" })
      .click();
    await expect(quantity).toHaveText("1");
  });

  test("does not let quantity drop below 1", async ({ page }) => {
    const quantity = page.locator('[aria-label="Quantity of Desk Lamp"]');

    const decreaseButton = page.getByRole("button", {
      name: "Decrease quantity of Desk Lamp",
    });

    //Quantity already at 1, and clicking 'decrease' should not do anything
    await decreaseButton.click();
    await decreaseButton.click();

    await expect(quantity).toHaveText("1");
  });

  test("removes an item from the cart", async ({ page }) => {
    await page
      .getByRole("button", { name: "Remove Desk Lamp from cart" })
      .click();

    await expect(page.getByText("Your cart is empty")).toBeVisible();
  });

  test("applies a valid discount code and updates the total", async ({
    page,
  }) => {
    await page.getByLabel("Discount Code").fill("SAVE10");
    await page.getByRole("button", { name: "Apply" }).click();

    await expect(page.getByRole("status")).toHaveText("Code SAVE10 applied!");
    await expect(page.getByText("-$3.23", { exact: true })).toBeVisible();
  });

  test("shows an error for an invalid discount code", async ({ page }) => {
    await page.getByLabel("Discount code").fill("invalidcode10");
    await page.getByRole("button", { name: "Apply" }).click();

    await expect(page.getByRole("alert")).toHaveText(
      "That discount code is not valid.",
    );
  });
});
