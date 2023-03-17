import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import TodoContext from "../context/TodoContext";

function TaskForm(props) {
  const init = {
    title: "", // initializing the  values #blank
    description: "",
    duedate: "",
  };

  const { taskInfo, fillForm, changeUpdate, isModal } = props; // desrtucture
  const [formData, setFormData] = useState(init);

  useEffect(() => {
    if (fillForm) setFormData(taskInfo);
  }, [fillForm, taskInfo]);

  const { loggedUser, createTask, message, updateTask } =
    useContext(TodoContext); // fetching from todocontext.....

  console.log(props.taskInfo);

  const handleChange = (e) => {
    // to get value of input ,, e is object creates all the events
    const { name, value } = e.target;
    const myDate = new Date();
    setFormData((prev) => ({
      //spred operator
      ...prev,
      [name]: value,
      userId: loggedUser.user.id,
      createdOn: myDate,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTask(formData);
  };

  const cancel = (e) => {
    e.preventDefault();
    changeUpdate(false);
    setFormData(init);
  };

  const update = (e) => {
    e.preventDefault();
    updateTask(formData, taskInfo.id);
  };

  return (
    <>
      <h2 className="text-start">Create Title</h2>
      <div className="card text-primary d-flex task-form p-5">
        <form>
          <div className="mb-3">
            <label htmlFor="task-title" className="">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="task-title"
              onChange={handleChange}
              value={formData.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="task-desc" className="">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              id="task-desc"
              onChange={handleChange}
              value={formData.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="task-duedate" className="">
              Date
            </label>
            <input
              type="datetime-local"
              className="form-control"
              name="duedate"
              id="task-duedate"
              onChange={handleChange}
              value={formData.duedate}
            />
          </div>
          <p>{message}</p>
          {!fillForm ? (
            <div className="mb-3">
              <button className="btn btn-primary" onClick={onSubmit}>
                Create Task
              </button>
            </div>
          ) : (
            <div className="mb-3">
              <button className="btn btn-primary" onClick={update}>
                Update Task
              </button>

              {isModal ? (
                <button
                  className="btn btn-warning"
                  data-bs-dismiss="modal"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Cancel Task
                </button>
              ) : (
                <button className="btn btn-warning" onClick={cancel}>
                  Cancel Task
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default TaskForm;
