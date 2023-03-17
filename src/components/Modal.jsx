import React from "react";
import { useContext } from "react";
import { dateFormat } from "../helper";
import TaskForm from "./TaskForm";
import TodoContext from "../context/TodoContext";
function Modal(props) {
  const { type, data } = props; // destructure
  const { deleteTask, message, getTaskList } = useContext(TodoContext);

  const onDelete = () => {
    deleteTask(data.id);
    getTaskList();
  };

  return (
    <div>
      <div className="modal" tabIndex="-1" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {type === "view" ? (
                <div className="card">
                  <h5>{data?.title}</h5>
                  <p>{data?.description}</p>
                  <div className="d-flex justify-content-between">
                    <p>Created On: {dateFormat(data?.createdOn)}</p>
                    <p>Due Date: {dateFormat(data?.duedate)}</p>
                  </div>
                </div>
              ) : type === "edit" ? (
                <TaskForm taskInfo={data} fillForm={true} isModal={true} />
              ) : (
                <div className="p-5">
                  <p>DO you want to delete the task?</p>
                  <button className="btn btn-white" onClick={onDelete}>
                    Yes
                  </button>
                  <button data-bs-dismiss="modal" className="btn btn-info">
                    NO
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
