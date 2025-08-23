# React Todo App Interview Challenge

## 🎯 Objective
Create a fully-featured Todo application using React that demonstrates your understanding of modern React development, state management, and UI/UX best practices.

> **⚠️ IMPORTANT: Please do not use AI tools (like ChatGPT, GitHub Copilot, etc.) during this interview. This challenge is designed to assess your own coding abilities and problem-solving skills.**

## 🔌 Provided API Client

You will be provided with an `APIClient` class that handles all data operations for the todo application. This client abstracts away the complexity of making HTTP requests and provides a clean interface for CRUD operations.

### Basic Usage Examples:

```javascript
// Initialize the API client
const apiClient = new APIClient();

// Get all todos
const todos = await apiClient.getTodos();

// Create a new todo
const newTodo = await apiClient.createTodo({
  title: "Complete interview challenge",
  priority: "high",
  description: "This is an example TODO"
});

// Update a todo
const updatedTodo = await apiClient.updateTodo(todoId, {
  completed: true,
  priority: "medium"
});

// Delete a todo
await apiClient.deleteTodo(todoId);

// Get a single todo by ID
const todo = await apiClient.getTodo(todoId);
```

### Error Handling:
The API client will throw errors for failed requests, so make sure to implement proper error handling in your components.

### Note:
- All methods return Promises, so you'll need to use async/await or .then() syntax
- The client handles authentication and request formatting automatically
- Focus on building the UI and business logic - the API integration is already handled for you

## 🚀 Core Requirements

### 1. Basic Todo Functionality
- [ ] Add new todos
- [ ] Mark todos as complete/incomplete
- [ ] Delete todos
- [ ] Edit existing todos (inline editing)
- [ ] Display list of all todos
- [ ] Use provided APIClient for data persistence

### 2. Enhanced Todo Features
- [ ] Todo priority levels (High, Medium, Low)
- [ ] Due dates for todos
- [ ] Todo categories/tags
- [ ] Search and filter todos
- [ ] Sort todos by different criteria (priority, due date, creation date, alphabetical)
- [ ] Bulk actions (select multiple, mark all complete, delete selected)

### 3. Advanced Features
- [ ] Todo notes/descriptions (expandable)
- [ ] Subtasks within todos
- [ ] Todo completion progress tracking
- [ ] Dark/Light theme toggle
- [ ] Responsive design for mobile and desktop
- [ ] Keyboard shortcuts for power users

## 🎨 UI/UX Requirements

### 4. Visual Design
- [ ] Modern, clean interface
- [ ] Smooth animations and transitions
- [ ] Loading states and skeleton screens
- [ ] Empty states with helpful messaging
- [ ] Toast notifications for user actions

### 5. User Experience
- [ ] Intuitive navigation and layout
- [ ] Accessibility features (ARIA labels, keyboard navigation)
- [ ] Responsive design that works on all screen sizes
- [ ] Smooth scrolling and performance
- [ ] Error handling with user-friendly messages

## ⚡ Technical Requirements

### 6. React Implementation
- [ ] Use functional components with hooks
- [ ] Implement proper state management (useState, useReducer, or Context API)
- [ ] Use custom hooks for reusable logic
- [ ] Implement proper component composition
- [ ] Use React.memo for performance optimization where appropriate

### 7. Code Quality
- [ ] Clean, readable code with meaningful variable/function names
- [ ] Proper TypeScript usage (if applicable)
- [ ] Component prop validation
- [ ] Error boundaries implementation
- [ ] Unit tests for critical functionality
- [ ] ESLint and Prettier configuration

### 8. Performance & Best Practices
- [ ] Lazy loading for large todo lists
- [ ] Debounced search input
- [ ] Optimistic updates for better UX
- [ ] Proper cleanup in useEffect hooks
- [ ] Memoization where beneficial

## 🔧 Bonus Features (Extra Credit)

### 9. Advanced Functionality
- [ ] Todo sharing/collaboration features
- [ ] Export todos to different formats (CSV, JSON)
- [ ] Import todos from external sources
- [ ] Todo templates for recurring tasks
- [ ] Time tracking for todos

### 10. Technical Excellence
- [ ] PWA capabilities (offline support, installable)
- [ ] Enhanced API integration with error handling and retry logic
- [ ] Optimistic updates for better UX

## 📋 Implementation Guidelines

### Project Setup
- [ ] Set up proper project structure
- [ ] Integrate with the provided APIClient for all data operations

### Development Process
- [ ] Start with basic functionality and iterate
- [ ] Commit frequently with meaningful commit messages
- [ ] Test features as you build them
- [ ] Refactor code for better organization
- [ ] Document your code and decisions

### Final Deliverables
- [ ] Working application deployed and accessible
- [ ] Brief explanation of technical decisions
- [ ] List of implemented features vs. stretch goals

## 🎯 Evaluation Criteria

The candidate will be evaluated on:
1. **Functionality**: Does the app work as expected?
2. **Code Quality**: Is the code clean, maintainable, and well-structured?
3. **User Experience**: Is the interface intuitive and pleasant to use?
4. **Technical Implementation**: Are React best practices followed?
5. **Problem Solving**: How well do they handle edge cases and challenges?
6. **Attention to Detail**: Are all requirements met with polish?

## ⏱️ Time Expectations
- **Minimum viable product**: 2-3 hours
- **Full feature set**: 4-6 hours
- **Bonus features**: Additional time as available

## 💡 Tips for Success
- Start simple and build up complexity
- Focus on core functionality first
- Test your app frequently
- Don't over-engineer - keep it practical
- Show your problem-solving process
- Be prepared to explain your technical decisions

Good luck! 🚀
