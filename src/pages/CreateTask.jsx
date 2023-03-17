import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import TaskForm from "../components/TaskForm";
import TodoContext from "../context/TodoContext";
import { dateFormat } from "../helper";

function CreateTask(props) {
  const { getTaskList, taskList, loggedUser } = useContext(TodoContext);

  const [latestTask, setLatestTask] = useState();

  const [recentTasks, setRecentTasks] = useState();

  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      getTaskList();
    }
  }, [loggedUser]);

  useEffect(() => {
    const latest = taskList[taskList.length - 1];
    setLatestTask(latest);

    const sliceArr = taskList.slice(-3);
    setRecentTasks(sliceArr);
    // sliceArr.reverse(); for reverse order...
  }, [taskList]);

  const onEditLatest = () => {
    setIsUpdate(true);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-md-6 bg-primary text-white h-100 d-flex flex-column align-items-center justify-content-center">
          <TaskForm
            taskInfo={latestTask}
            fillForm={isUpdate}
            changeUpdate={setIsUpdate}
            isModal={false}
          />{" "}
          {/* creating more properties */}
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="card bg-primary w-75">
            <div className="card-header d-flex justify-content-between">
              <h3 className="text-white">Latest Task</h3>
              <button onClick={onEditLatest} className="btn btn-info">
                Edit Task
              </button>
            </div>
            <div className="card-body text-white">
              <h5>{latestTask?.title}</h5>
              <p>{latestTask?.description}</p>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-between text-warning">
                <p>Created: {dateFormat(latestTask?.createdOn)}</p>
                <p>Duedate: {dateFormat(latestTask?.duedate)}</p>
              </div>
            </div>
          </div>

          <div className="card bg-primary w-75 mt-5">
            <div className="card-header d-flex">
              <h3 className="text-white">Recentely Added</h3>
            </div>
            <div className="card-body text-white">
              {recentTasks?.map((item) => {
                return (
                  <div key={item.id} className="d-flex justify-content-between">
                    <p>{item.title}</p>
                    <p>{dateFormat(item.duedate)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
