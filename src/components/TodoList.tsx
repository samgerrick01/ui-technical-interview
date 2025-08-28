import type { APIResponse, Todo } from '../TodoClient';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: APIResponse;
}

function TodoList(props: TodoListProps) {
  const { todos } = props;

  return (
    <>
      {todos?.data &&
        todos.data.map((item: Todo) => <TodoItem key={item.id} {...item} />)}
    </>
  );
}

export default TodoList;
