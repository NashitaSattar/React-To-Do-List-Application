import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import {AddTask} from "./pages/AddTask"
import {Header} from "./component/Header"
import {Footer} from "./component/Footer"
import { TaskDetails } from './pages/TaskDetails'
import { Login } from './pages/Login'
import { DashboardLayout } from './pages/DashboardLayout'
import { DashBoardTasks } from './pages/DashBoardTasks'
import { UserProfile } from './pages/UserProfile'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './component/ProtectedRoute'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout/>
              </ProtectedRoute>
              }>
              <Route path="tasks" element={<DashBoardTasks/>} />
              <Route path="profile" element={<UserProfile/>} />
              <Route path="add-task" element={<AddTask/>} />
              <Route path="tasks/:id" element={<TaskDetails/>} />
            </Route>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
