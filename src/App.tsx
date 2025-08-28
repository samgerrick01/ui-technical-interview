import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import Home from './pages/Home';
import { TodoAPIClient } from './TodoClient';
import { Route, Routes } from 'react-router-dom';

const todoApiClient = new TodoAPIClient();

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </div>
  );
}

export default App;
