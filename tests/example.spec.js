const { test, expect } = require('@playwright/test');

test('should add a new todo', async ({ page }) => {
  await page.goto('/');
  
  // Add a new todo
  await page.locator('input[placeholder="Add a new todo..."]').fill('Test todo item');
  await page.locator('button:text("Add")').click();
  
  // Verify the todo was added
  const todoItem = page.locator('.todo-item').first();
  await expect(todoItem).toContainText('Test todo item');
});

test('should mark a todo as complete', async ({ page }) => {
  await page.goto('/');
  
  // Add a new todo
  await page.locator('input[placeholder="Add a new todo..."]').fill('Test todo item');
  await page.locator('button:text("Add")').click();
  
  // Mark as complete
  await page.locator('.toggle-btn:text("Complete")').first().click();
  
  // Verify it's marked as completed
  const todoItem = page.locator('.todo-item').first();
  await expect(todoItem).toHaveClass(/completed/);
});

test('should delete a todo', async ({ page }) => {
  await page.goto('/');
  
  // Add a new todo
  await page.locator('input[placeholder="Add a new todo..."]').fill('Test todo item');
  await page.locator('button:text("Add")').click();
  
  // Delete the todo
  await page.locator('.delete-btn:text("Delete")').first().click();
  
  // Verify it's deleted
  const todoItems = page.locator('.todo-item');
  await expect(todoItems).toHaveCount(0);
});

test('should edit a todo', async ({ page }) => {
  await page.goto('/');
  
  // Add a new todo
  await page.locator('input[placeholder="Add a new todo..."]').fill('Test todo item');
  await page.locator('button:text("Add")').click();
  
  // Edit the todo - click on the text to activate edit mode
  await page.locator('.todo-text').first().click();
  
  // Wait for input field to appear and fill it
  const editInput = page.locator('input[type="text"]').first();
  await expect(editInput).toBeVisible();
  await editInput.fill('Edited test todo item');
  await editInput.press('Enter');
  
  // Verify it's edited
  const todoItem = page.locator('.todo-item').first();
  await expect(todoItem).toContainText('Edited test todo item');
});

test('should filter todos', async ({ page }) => {
  await page.goto('/');
  
  // Add multiple todos
  await page.locator('input[placeholder="Add a new todo..."]').fill('Active todo');
  await page.locator('button:text("Add")').click();
  await page.locator('input[placeholder="Add a new todo..."]').fill('Completed todo');
  await page.locator('button:text("Add")').click();
  
  // Complete one todo
  await page.locator('.toggle-btn:text("Complete")').nth(1).click();
  
  // Check all filter
  await page.locator('button:has-text("All")').first().click();
  const allTodos = page.locator('.todo-item');
  await expect(allTodos).toHaveCount(2);
  
  // Check active filter
  await page.locator('button:has-text("Active")').first().click();
  const activeTodos = page.locator('.todo-item');
  await expect(activeTodos).toHaveCount(1);
  
  // Check completed filter
  await page.locator('button:has-text("Completed")').first().click();
  const completedTodos = page.locator('.todo-item');
  await expect(completedTodos).toHaveCount(1);
});

test('should clear completed todos', async ({ page }) => {
  await page.goto('/');
  
  // Add multiple todos
  await page.locator('input[placeholder="Add a new todo..."]').fill('Active todo');
  await page.locator('button:text("Add")').click();
  await page.locator('input[placeholder="Add a new todo..."]').fill('Completed todo');
  await page.locator('button:text("Add")').click();
  
  // Complete one todo
  await page.locator('.toggle-btn:text("Complete")').nth(1).click();
  
  // Clear completed todos
  await page.locator('button:has-text("Clear completed")').first().click();
  
  // Verify only active todo remains
  const remainingTodos = page.locator('.todo-item');
  await expect(remainingTodos).toHaveCount(1);
});

test('should persist todos in localStorage', async ({ page }) => {
  await page.goto('/');
  
  // Add a new todo
  await page.locator('input[placeholder="Add a new todo..."]').fill('Persistent test todo');
  await page.locator('button:text("Add")').click();
  
  // Wait for the todo to appear before reloading
  const todoItem = page.locator('.todo-item').first();
  await expect(todoItem).toContainText('Persistent test todo');
  
  // Refresh the page
  await page.reload();
  
  // Verify the todo still exists
  await expect(todoItem).toContainText('Persistent test todo');
});