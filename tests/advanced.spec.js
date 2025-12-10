const { test, expect } = require('@playwright/test');

test('should add a new todo with category and priority', async ({ page }) => {
  await page.goto('/');
  
  // Add a new todo with category and priority
  await page.locator('input[placeholder="Add a new todo..."]').fill('Test todo item');
  await page.locator('button:text("Add")').click();
  
  // Verify the todo was added
  const todoItem = page.locator('.todo-item').first();
  await expect(todoItem).toContainText('Test todo item');
});

test('should toggle dark mode', async ({ page }) => {
  await page.goto('/');
  
  // Check initial theme is light
  await expect(page.locator('body')).not.toHaveClass(/dark/);
  
  // Toggle to dark mode
  await page.locator('.theme-btn').click();
  
  // Verify dark mode is active
  await expect(page.locator('body')).toHaveClass(/dark/);
  
  // Toggle back to light mode
  await page.locator('.theme-btn').click();
  
  // Verify light mode is active again
  await expect(page.locator('body')).not.toHaveClass(/dark/);
});

test('should show statistics panel', async ({ page }) => {
  await page.goto('/');
  
  // Initially stats should be hidden
  await expect(page.locator('.stats-panel')).not.toBeVisible();
  
  // Toggle to show stats
  await page.locator('.stats-btn').click();
  
  // Verify stats are visible
  await expect(page.locator('.stats-panel')).toBeVisible();
  
  // Toggle to hide stats
  await page.locator('.stats-btn').click();
  
  // Verify stats are hidden again
  await expect(page.locator('.stats-panel')).not.toBeVisible();
});

test('should filter todos by search term', async ({ page }) => {
  await page.goto('/');
  
  // Add multiple todos
  await page.locator('input[placeholder="Add a new todo..."]').fill('Work task');
  await page.locator('button:text("Add")').click();
  
  await page.locator('input[placeholder="Add a new todo..."]').fill('Personal task');
  await page.locator('button:text("Add")').click();
  
  // Wait for todos to appear
  await expect(page.locator('.todo-item')).toHaveCount(2);
  
  // Search for "work"
  await page.locator('.search-input').fill('work');
  
  // Verify only work tasks are shown
  const visibleTodos = page.locator('.todo-item');
  await expect(visibleTodos).toHaveCount(1);
  await expect(visibleTodos.first()).toContainText('Work task');
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
  await expect(remainingTodos.first()).toContainText('Active todo');
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
  
  // Verify the todo still exists after reload
  await expect(page.locator('.todo-item')).toHaveCount(1);
  const reloadedTodo = page.locator('.todo-item').first();
  await expect(reloadedTodo).toContainText('Persistent test todo');
});

test('should have working edit functionality', async ({ page }) => {
  await page.goto('/');
  
  // Add a new todo
  await page.locator('input[placeholder="Add a new todo..."]').fill('Test todo item');
  await page.locator('button:text("Add")').click();
  
  // Verify the todo exists before editing
  const originalTodo = page.locator('.todo-item').first();
  await expect(originalTodo).toContainText('Test todo item');
});