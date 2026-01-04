import axiosInstance from "../api/axiosInstance"

// GET - fetch all tasks
export const getTasks = () =>{
    return axiosInstance.get("/tasks");
}

// GET - fetch task by id
export const getTaskById = (id) =>{
    return axiosInstance.get(`/tasks/${id}`);
}

// POST - create a new task
export const createTask = (taskData) => {
    return axiosInstance.post("/tasks", taskData);
}

// Patch - update existing task
export const updateTask = (id, updatedTaskData) => {
    console.log("id : ", id)
    console.log("updatedTaskData : ", updatedTaskData)
    return axiosInstance.patch(`/tasks/${id}`, updatedTaskData);
} 

// Delete - Remove existing task
export const deleteTask = (id) => {
    return axiosInstance.delete(`/tasks/${id}`);
}

// POST - create a new activity
export const createActivity = (activityData) => {
    return axiosInstance.post("/activities", activityData);
}

// GET - fetch all activities
export const getActivities = () =>{
    return axiosInstance.get("/activities");
}
