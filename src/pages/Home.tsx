import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';
import TodoAPIClient, { type APIResponse } from '../TodoClient';
const apiClient = new TodoAPIClient();
import '../styles/home.css';

function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<APIResponse>();

  const getAllTodos = async () => {
    const todos = await apiClient.getAllTodos();
    setTodos(todos);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="homepageContainer">
      <h1>Sample Todo List</h1>

      <Button onClick={() => navigate('/add')} type="primary">
        Add Todo
      </Button>

      {todos && <TodoList todos={todos} />}
    </div>
  );
}

export default Home;
