import { useEffect, useState } from "react";
import TodoList from "./todoList";
import Alert from "./alert";

const getStorage = () => {
  let lists = localStorage.getItem("list");
  if (lists) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [lists, setLists] = useState(getStorage());
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false,type: "", Msg: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "danger", "please enter the value");
    } else if (name && isEdit) {
      setLists(
        lists.map((list) => {
          if (list.id === editID) {
            return { ...list, title: name };
          }
          return list;
        })
      );
      setName("");
      setEditID(null);
      setIsEdit(false);
      showAlert(true,"success", "item changed");
    } else {
      showAlert(true, "success", "new item added");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setLists([...lists, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type="", Msg = "") => {
    setAlert({ show,type, Msg });
  };
  const clearList = () => {
    showAlert(true, "danger", "there is no items left");
    setLists([]);
  };
  const deleteItem = (id) => {
    showAlert(true, "success" , "item removed");
    const newlist = lists.filter((item) => item.id !== id);
    setLists(newlist);
  };

  const editItem = (id) => {
    const specificItem = lists.find((item) => item.id === id);
    setIsEdit(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(lists));
  }, [lists]);
  return (
    <section className="section-center">
      <form className="todo-form" onSubmit={handleSubmit}>
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert} lists={lists} />
        )}
        <h1>todo app</h1>
        <div className="form-control">
          <input
            type="text"
            className="todo"
            placeholder="Read Books"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEdit ? "Edit" : "Add"}
          </button>
        </div>
      </form>
      {lists.length > 0 && (
        <div className="todo-container">
          <TodoList lists={lists} deleteItem={deleteItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>clear List</button>
        </div>
      )}
    </section>
  );
}

export default App;
