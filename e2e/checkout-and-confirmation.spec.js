import { test, expect } from "@playwright/test";

test.describe("Checkout access guards", () => {
  test("redirects to the homepage when checkout is visited with an empty cart", async ({
    page,
  }) => {
    await page.goto("/checkout");

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
  });

  test("redirects to the homepage when confirmation is visited directly", async ({
    page,
  }) => {
    await page.goto("/confirmation");

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
  });
});

test.describe("Shipping selection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Add Desk Lamp to cart" }).click();

    //Navigate to the cart the way a real user would
    await page.getByRole("link", { name: "Cart (1)" }).click();
    await expect(
      page.getByRole("heading", { name: "Your Cart" }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Proceed to Checkout" }).click();
    await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
  });

  test("defaults to domestic shipping", async ({ page }) => {
    const summary = page.getByRole("region", { name: "Order summary" });

    await expect(page.getByLabel("Domestic")).toBeChecked();
    await expect(summary.getByText("Shipping (Domestic)")).toBeVisible();
  });

  test("updates the shipping cost when switching to international shipping", async ({
    page,
  }) => {
    const summary = page.getByRole("region", { name: "Order summary" });

    await page.getByLabel("International").check();

    await expect(summary.getByText("Shipping (International)")).toBeVisible();
    await expect(summary.getByText("$19.99", { exact: true })).toBeVisible();
  });
});

test.describe("Full purchase journey", () => {
  test("completes a purchase from browsing to confirmation", async ({
    page,
  }) => {
    await test.step("browse and add a product to the cart", async () => {
      await page.goto("/");
      await page
        .getByRole("button", { name: "Add Ceramic Mug to cart" })
        .click();
      await expect(page.getByRole("link", { name: "Cart (1)" })).toBeVisible();
    });

    await test.step("apply a discount code in the cart", async () => {
      await page.getByRole("link", { name: "Cart (1)" }).click();
      await page.getByLabel("Discount code").fill("SAVE10");
      await page.getByRole("button", { name: "Apply" }).click();
      await expect(page.getByRole("status")).toHaveText("Code SAVE10 applied!");
    });

    await test.step("choose shipping and submit the order", async () => {
      await page.getByRole("link", { name: "Proceed to Checkout" }).click();
      await page.getByLabel("International").check();
      await page.getByRole("button", { name: "Submit Order" }).click();
    });

    await test.step("see the correct labels on confirmation page", async () => {
      await expect(
        page.getByRole("heading", { name: "Order Confirmed" }),
      ).toBeVisible();

      const summary = page.getByRole("region", { name: "Order summary" });
      await expect(summary.getByText("-$1.45", { exact: true })).toBeVisible();
      await expect(summary.getByText("Shipping (International)")).toBeVisible();
      await expect(summary.getByText("$34.08", { exact: true })).toBeVisible();
    });
  });
});
