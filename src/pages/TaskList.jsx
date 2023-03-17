import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import TodoContext from "../context/TodoContext";
import { dateFormat } from "../helper";
import { Link } from "react-router-dom";
import { useState, useReducer } from "react";
import Modal from "../components/Modal";

// initial state for useReducer
const initialState = { type: "", data: null };
// reducer function
function reducer(state, action) {
  switch (
    action.type // type is predefined
  ) {
    case "edit":
      return { type: "edit", data: action.payload };
    case "view":
      return { type: "view", data: action.payload };
    case "delete":
      return { type: "delete", data: action.payload };
    default:
      return state;
  }
}

function TaskList(props) {
  // useReducer hook

  const [state, dispatch] = useReducer(reducer, initialState);

  const { taskList, getTaskList, loggedUser } = useContext(TodoContext);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (loggedUser) {
      getTaskList();
    }
  }, [loggedUser]);

  let filteredTask = taskList.filter(
    (task) => task.title.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
  );

  const onSearch = (e) => {
    let str = e.target.value;
    setSearchText(str);
  };

  console.log(state);

  return (
    <div className="container bg-dark h-100">
      <div className="card bg-primary">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <h1 className="text-white">My Task List</h1>
            <Link to={"/create-task"} className="btn btn-info ms-auto">
              Create Task
            </Link>
          </div>
        </div>
        <div className="card-body">
          <p className="text-white mb-1">Search</p>
          <div className="mb-4">
            <input type="text" className="form-control" onChange={onSearch} />
          </div>
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Sr.no</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTask?.map((item) => {
                return (
                  <tr key={item.id} className="rounded bg-dark">
                    <td className="py-3">{item?.id}</td>
                    <td className="py-3">{item?.title}</td>
                    <td className="py-3">{item?.description}</td>
                    <td className="py-3"> {dateFormat(item?.duedate)}</td>
                    <td>
                      <span
                        className="px-2"
                        onClick={() => {
                          dispatch({ type: "view", payload: item });
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </span>
                      <span
                        className="px-2"
                        onClick={() => {
                          dispatch({ type: "edit", payload: item });
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </span>
                      <span
                        className="px-2"
                        onClick={() => {
                          dispatch({ type: "delete", payload: item });
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal type={state.type} data={state.data} />
    </div>
  );
}

export default TaskList;
