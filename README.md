# Todo App

A feature-rich todo application built with React that persists data using localStorage.

## Features

- Add new todos with enter key or button click
- Mark todos as complete/incomplete
- Delete individual todos
- Filter todos (all, active, completed)
- Clear all completed todos
- Items counter showing remaining tasks
- Edit existing todos by clicking on them
- LocalStorage persistence for data retention
- Responsive design

## Usage

1. Add a new todo using the input field and "Add" button or Enter key
2. Click "Complete" to mark a todo as done, "Undo" to mark as active
3. Click "Delete" to remove individual todos
4. Use filter buttons to view all, active, or completed todos
5. Click "Clear completed" to remove all finished todos
6. Click on any todo text to edit it
7. All data is automatically saved to your browser's localStorage

## Implementation Overview

This application was built using:
- React.js for component-based architecture
- CSS for styling and responsive design
- localStorage API for data persistence
- Playwright for end-to-end testing

The app follows a clean component structure with:
- App.js: Main application component managing state and localStorage
- TodoList.js: Component to render the list of todos
- TodoItem.js: Individual todo item component with editing capability

## System Information

- OpenCode Version: v1.0.141
- Used Model: Qwen3 30B A3B Instruct
- LLM Runtime: LM Studio 0.3.34
- Node.js Version: v18.19.1
- Operating System: Windows 11
- Editor: VSCode 1.106.3
- CPU: AMD Ryzen 7 5700X 80Core 4501 Mhz
- GPU: AMD Radeon RX 9060 XT 16GB VRAM
- System Memory: 64GB

## Getting Started

1. Clone the repository
2. Navigate to the project directory: `cd todo-app`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and visit: http://localhost:8080

## Running Tests

To run end-to-end tests:
1. Make sure the app is running in development mode
2. Run: `npx playwright test`

All tests are written using Playwright and cover core functionality including add, edit, delete, filter, and persistence.