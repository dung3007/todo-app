import { useEffect, useState } from 'react'
import './App.css'
import { addTodo, deleteTodo, getTodos, updateTodoStatus } from './service/todoService';
import Search from './components/Search';
import { Button } from '@mui/material';
import ModalAddTodo from './components/ModalAddTodo';
import ListItem from './components/ListItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [params, setParams] = useState({
    page: 1,
    limit: 15
  })

  const [showModal, setShowModal] = useState("")
  const [itemUpdate, setItemUpdate] = useState({})

  // Lấy danh sách công việc từ API
  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     const data = await getTodos(params);
  //     setTodos([...data]);
  //   };
  //   fetchTodos();
  // }, []);

  // Thêm công việc mới
  const handleAddTodo = async (todo) => {
    const newTodo = await addTodo(todo);
    setTodos([newTodo, ...todos]);
    if (newTodo) {
      setShowModal("")
    }
  };

  // Xóa công việc
  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Cập nhật công việc
  const handleUpdateTodo = async (id, todoUpdated) => {
    const todo = todos.find((t) => t.id === id);
    const updatedTodo = await updateTodoStatus(id, todoUpdated);
    setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    if (updatedTodo) {
      setShowModal("")
    }
  };

  const toggleUpdateTodo = (item) => {
    setShowModal('UPDATE')
    setItemUpdate(item)
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos({ page: 1, limit: 15, search: searchValue });
      setTodos(data?.length ? data : []);
    };
    fetchTodos();
  }, [searchValue])

  return (
    <>
      <div className="p-5 w-md mx-auto bg-white">
        <h1 className="text-2xl text-black font-bold text-center mb-4">Todo App</h1>
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <Button onClick={() => setShowModal('ADD')}>Thêm mới</Button>
        <div>
          <ListItem
            todos={todos}
            setTodos={setTodos}
            handleDeleteTodo={handleDeleteTodo}
            params={params}
            setParams={setParams}
            toggleUpdateTodo={toggleUpdateTodo}
          />
        </div>

        {(showModal == 'ADD' || showModal == 'UPDATE') &&
          <ModalAddTodo
            open={showModal == 'ADD' || showModal == 'UPDATE'}
            onClose={() => setShowModal('')}
            handleAddTodo={handleAddTodo}
            type={showModal}
            itemUpdate={itemUpdate}
            handleUpdateTodo={handleUpdateTodo}
          />
        }
      </div>
    </>
  )
}

export default App
