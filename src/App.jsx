import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import {TaskList} from "./pages/TaskList"
import {AddTask} from "./pages/AddTask"
import {Header} from "./component/Header"
import {Footer} from "./component/Footer"

function App() {

  return (
    <>
      <BrowserRouter>
        {<Header/>}
        <Routes>
          <Route path="/tasks" element={<TaskList/>} />
          <Route path="/add-task" element={<AddTask/>} />
        </Routes>
        {<Footer/>}
      </BrowserRouter>
    </>
  )
}

export default App
