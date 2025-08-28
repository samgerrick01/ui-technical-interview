import type { APIResponse, Todo } from '../TodoClient';
import TodoItem from './TodoItem';

import '../styles/components/todoItem.css';

interface TodoListProps {
  todos: APIResponse;
}

function TodoList(props: TodoListProps) {
  const { todos } = props;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
          </tr>
        </thead>
        {todos?.data &&
          todos.data.map((item: Todo) => <TodoItem key={item.id} {...item} />)}
      </table>
    </>
  );
}

export default TodoList;
