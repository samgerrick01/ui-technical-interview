import { useNavigate } from 'react-router-dom';
import type { Todo } from '../TodoClient';
import '../styles/components/todoItem.css';

function TodoItem(props: Todo) {
  const navigate = useNavigate();
  const item = props;
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        <tr onClick={() => navigate('/edit/' + item.id)} key={item.title}>
          <td>
            <strong>{item.title}</strong>
          </td>
          <td>{item.description}</td>
          <td>
            <em>{item.priority}</em>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TodoItem;
