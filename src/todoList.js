import React from "react";
import { FiEdit, FiDelete } from "react-icons/fi";

const todoList = ({ lists, deleteItem, editItem }) => {
  return (
    <div className="todo-list">
      {lists.map((list) => {
        const { title, id } = list;
        return (
          <div key={id} className="todo-item">
            <p className="title">{title}</p>
            <div className="button-container">
              <button type='button' className="edit-btn" onClick={() => editItem(id)}>
                <FiEdit />
              </button>
              <button type="button" className="delete-btn" onClick={() => deleteItem(id)}>
                <FiDelete />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default todoList;
