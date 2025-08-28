/**
 * Dummy API Client for TODO List App
 * Simulates REST API calls but stores data in localStorage
 */

// Type definitions
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoData {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
}

export interface UpdateTodoData {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: "low" | "medium" | "high";
}

export interface TodoFilters {
  status?: boolean;
  priority?: "low" | "medium" | "high";
  createdAfter?: string | Date;
}

export interface StorageData {
  todos: Todo[];
  nextId: number;
  lastUpdated: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
  status: number;
}

export interface StorageStats {
  totalTodos: number;
  completedTodos: number;
  incompleteTodos: number;
  nextId: number;
  lastUpdated: string;
  storageSize: number;
}

export class TodoAPIClient {
  private storageKey: string;
  private baseURL: string;

  constructor() {
    this.storageKey = "todo_app_data";
    this.baseURL = "https://api.todoapp.com"; // Dummy base URL for simulation
    this.initializeStorage();
  }

  /**
   * Initialize localStorage with default data structure
   */
  private initializeStorage(): void {
    if (!localStorage.getItem(this.storageKey)) {
      const defaultData: StorageData = {
        todos: [],
        nextId: 1,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(this.storageKey, JSON.stringify(defaultData));
    }
  }

  /**
   * Get data from localStorage
   */
  private getStorageData(): StorageData {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data
        ? JSON.parse(data)
        : { todos: [], nextId: 1, lastUpdated: new Date().toISOString() };
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return { todos: [], nextId: 1, lastUpdated: new Date().toISOString() };
    }
  }

  /**
   * Save data to localStorage
   */
  private saveStorageData(data: StorageData): boolean {
    try {
      data.lastUpdated = new Date().toISOString();
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  }

  /**
   * Simulate API delay for realistic feel
   */
  private async simulateAPIDelay(ms: number = 100): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Simulate API response structure
   */
  private createAPIResponse<T>(
    data: T,
    success: boolean = true,
    message: string = ""
  ): APIResponse<T> {
    return {
      success,
      data,
      message,
      timestamp: new Date().toISOString(),
      status: success ? 200 : 400,
    };
  }

  /**
   * GET /todos - Get all todos
   */
  async getAllTodos(): Promise<APIResponse<Todo[]>> {
    await this.simulateAPIDelay();
    const storageData = this.getStorageData();

    return this.createAPIResponse(
      storageData.todos,
      true,
      `Retrieved ${storageData.todos.length} todos`
    );
  }

  /**
   * GET /todos/:id - Get a specific todo by ID
   */
  async getTodoById(id: number): Promise<APIResponse<Todo | null>> {
    await this.simulateAPIDelay();
    const storageData = this.getStorageData();
    const todo = storageData.todos.find((t) => t.id === id);

    if (!todo) {
      return this.createAPIResponse(
        null,
        false,
        `Todo with ID ${id} not found`
      );
    }

    return this.createAPIResponse(todo, true, "Todo retrieved successfully");
  }

  /**
   * POST /todos - Create a new todo
   */
  async createTodo(
    todoData: CreateTodoData
  ): Promise<APIResponse<Todo | null>> {
    await this.simulateAPIDelay();

    if (!todoData.title || todoData.title.trim() === "") {
      return this.createAPIResponse(null, false, "Todo title is required");
    }

    const storageData = this.getStorageData();
    const newTodo: Todo = {
      id: storageData.nextId++,
      title: todoData.title.trim(),
      description: todoData.description || "",
      completed: false,
      priority: todoData.priority || "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    storageData.todos.push(newTodo);

    if (this.saveStorageData(storageData)) {
      return this.createAPIResponse(newTodo, true, "Todo created successfully");
    } else {
      return this.createAPIResponse(null, false, "Failed to save todo");
    }
  }

  /**
   * PUT /todos/:id - Update an existing todo
   */
  async updateTodo(
    id: number,
    updateData: UpdateTodoData
  ): Promise<APIResponse<Todo | null>> {
    await this.simulateAPIDelay();

    const storageData = this.getStorageData();
    const todoIndex = storageData.todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      return this.createAPIResponse(
        null,
        false,
        `Todo with ID ${id} not found`
      );
    }

    const updatedTodo: Todo = {
      ...storageData.todos[todoIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    storageData.todos[todoIndex] = updatedTodo;

    if (this.saveStorageData(storageData)) {
      return this.createAPIResponse(
        updatedTodo,
        true,
        "Todo updated successfully"
      );
    } else {
      return this.createAPIResponse(null, false, "Failed to update todo");
    }
  }

  /**
   * DELETE /todos/:id - Delete a todo
   */
  async deleteTodo(id: number): Promise<APIResponse<Todo | null>> {
    await this.simulateAPIDelay();

    const storageData = this.getStorageData();
    const todoIndex = storageData.todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      return this.createAPIResponse(
        null,
        false,
        `Todo with ID ${id} not found`
      );
    }

    const deletedTodo = storageData.todos.splice(todoIndex, 1)[0];

    if (this.saveStorageData(storageData)) {
      return this.createAPIResponse(
        deletedTodo,
        true,
        "Todo deleted successfully"
      );
    } else {
      return this.createAPIResponse(null, false, "Failed to delete todo");
    }
  }

  /**
   * PATCH /todos/:id/toggle - Toggle todo completion status
   */
  async toggleTodoCompletion(id: number): Promise<APIResponse<Todo | null>> {
    await this.simulateAPIDelay();

    const storageData = this.getStorageData();
    const todoIndex = storageData.todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      return this.createAPIResponse(
        null,
        false,
        `Todo with ID ${id} not found`
      );
    }

    const updatedTodo: Todo = {
      ...storageData.todos[todoIndex],
      completed: !storageData.todos[todoIndex].completed,
      updatedAt: new Date().toISOString(),
    };

    storageData.todos[todoIndex] = updatedTodo;

    if (this.saveStorageData(storageData)) {
      return this.createAPIResponse(
        updatedTodo,
        true,
        `Todo marked as ${updatedTodo.completed ? "completed" : "incomplete"}`
      );
    } else {
      return this.createAPIResponse(null, false, "Failed to update todo");
    }
  }

  /**
   * GET /todos/search?q=query - Search todos by title or description
   */
  async searchTodos(query: string): Promise<APIResponse<Todo[]>> {
    await this.simulateAPIDelay();

    if (!query || query.trim() === "") {
      return this.createAPIResponse([], false, "Search query is required");
    }

    const storageData = this.getStorageData();
    const searchTerm = query.toLowerCase().trim();

    const results = storageData.todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchTerm) ||
        todo.description.toLowerCase().includes(searchTerm)
    );

    return this.createAPIResponse(
      results,
      true,
      `Found ${results.length} todos matching "${query}"`
    );
  }

  /**
   * GET /todos/filter?status=completed&priority=high - Filter todos
   */
  async filterTodos(filters: TodoFilters = {}): Promise<APIResponse<Todo[]>> {
    await this.simulateAPIDelay();

    const storageData = this.getStorageData();
    let filteredTodos = [...storageData.todos];

    if (filters.status !== undefined) {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.completed === filters.status
      );
    }

    if (filters.priority) {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.priority === filters.priority
      );
    }

    if (filters.createdAfter) {
      const date = new Date(filters.createdAfter);
      filteredTodos = filteredTodos.filter(
        (todo) => new Date(todo.createdAt) >= date
      );
    }

    return this.createAPIResponse(
      filteredTodos,
      true,
      `Filtered ${filteredTodos.length} todos`
    );
  }

  /**
   * Clear all todos (useful for testing/reset)
   */
  async clearAllTodos(): Promise<APIResponse<null>> {
    await this.simulateAPIDelay();

    const storageData = this.getStorageData();
    storageData.todos = [];
    storageData.nextId = 1;

    if (this.saveStorageData(storageData)) {
      return this.createAPIResponse(
        null,
        true,
        "All todos cleared successfully"
      );
    } else {
      return this.createAPIResponse(null, false, "Failed to clear todos");
    }
  }

  /**
   * Get storage statistics
   */
  async getStorageStats(): Promise<APIResponse<StorageStats>> {
    await this.simulateAPIDelay();

    const storageData = this.getStorageData();
    const stats: StorageStats = {
      totalTodos: storageData.todos.length,
      completedTodos: storageData.todos.filter((t) => t.completed).length,
      incompleteTodos: storageData.todos.filter((t) => !t.completed).length,
      nextId: storageData.nextId,
      lastUpdated: storageData.lastUpdated,
      storageSize: JSON.stringify(storageData).length,
    };

    return this.createAPIResponse(stats, true, "Storage statistics retrieved");
  }
}

export default TodoAPIClient;
