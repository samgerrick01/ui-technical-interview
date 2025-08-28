import { Button, Input, Select } from 'antd';
import '../styles/addPage.css';
import React, { useState } from 'react';
import TodoAPIClient, { type CreateTodoData } from '../TodoClient';
import { useNavigate } from 'react-router-dom';

const apiClient = new TodoAPIClient();

function AddPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateTodoData>({
    title: '',
    description: '',
    priority: 'low',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTodo = async () => {
    try {
      await apiClient.createTodo(formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div className="addPageContainer">
      <h1>Add Todo Form</h1>
      <label>Todo: </label>
      <Input onChange={handleInputChange} name="title" placeholder="Todo" />
      <label>Description: </label>
      <Input
        onChange={handleInputChange}
        name="description"
        placeholder="Description"
      />
      <label>Priority: </label>
      <Select
        onChange={(value) =>
          setFormData((prevData) => ({ ...prevData, priority: value }))
        }
        placeholder="Select Priority"
      >
        <Select.Option value="Low">Low</Select.Option>
        <Select.Option value="Medium">Medium</Select.Option>
        <Select.Option value="High">High</Select.Option>
      </Select>
      <Button onClick={handleAddTodo} type="primary">
        Add Todo
      </Button>
    </div>
  );
}

export default AddPage;
