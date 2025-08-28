import { Button, Input } from 'antd';
import '../styles/addPage.css';
import React, { useState } from 'react';
import TodoAPIClient, { type CreateTodoData } from '../TodoClient';
import { useNavigate } from 'react-router-dom';
import Select from '../components/Select';

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

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      priority: value as 'low' | 'medium' | 'high',
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
        onChange={handleSelectChange}
        placeholder="Select Priority"
        options={[
          { label: 'low', value: 'low' },
          { label: 'medium', value: 'medium' },
          { label: 'high', value: 'high' },
        ]}
      />
      <Button onClick={handleAddTodo} type="primary">
        Add Todo
      </Button>
    </div>
  );
}

export default AddPage;
