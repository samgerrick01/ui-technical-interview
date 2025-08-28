import React, { useEffect, useState } from 'react';
import TodoAPIClient, { type Todo } from '../TodoClient';
import { useParams } from 'react-router-dom';
import { Button, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../styles/editPage.css';

const apiClient = new TodoAPIClient();

function EditPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [todo, setTodos] = useState<Todo | null>();

  const getSingleTodo = async () => {
    if (params.id !== undefined) {
      const item = await apiClient.getTodoById(parseInt(params.id));
      setTodos(item.data);
    } else {
      console.error('Todo ID is undefined');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTodos((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };

  const handleEditTodo = async () => {
    try {
      if (params.id !== undefined && todo) {
        await apiClient.updateTodo(parseInt(params.id), todo);
        navigate('/');
      } else {
        console.error('Todo ID is undefined or form data is null');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  useEffect(() => {
    getSingleTodo();
  }, []);

  return (
    <div className="editPageContainer">
      <h1>Add Todo Form</h1>
      <label>Todo: </label>
      <Input
        value={todo?.title}
        onChange={handleInputChange}
        name="title"
        placeholder="Todo"
      />
      <label>Description: </label>
      <Input
        onChange={handleInputChange}
        value={todo?.description}
        name="description"
        placeholder="Description"
      />
      <label>Priority: </label>
      <Select
        value={todo?.priority}
        onChange={(value) =>
          setTodos((prevData) =>
            prevData ? { ...prevData, priority: value } : null
          )
        }
        placeholder="Select Priority"
      >
        <Select.Option value="low">low</Select.Option>
        <Select.Option value="medium">medium</Select.Option>
        <Select.Option value="high">high</Select.Option>
      </Select>
      <Button onClick={handleEditTodo} type="primary">
        Update Todo
      </Button>
    </div>
  );
}

export default EditPage;
