import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import {TaskList} from "./pages/TaskList"
import {AddTask} from "./pages/AddTask"
import {Header} from "./component/Header"
import {Footer} from "./component/Footer"
import { TaskDetails } from './pages/TaskDetails'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
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
                <Dashboard/>
              </ProtectedRoute>
              } />
            <Route path="/tasks" element={
              <ProtectedRoute>
                <TaskList/>
              </ProtectedRoute>
              } />
            <Route path="/add-task" element={
              <ProtectedRoute>
                <AddTask/>
              </ProtectedRoute>
              } />
            <Route path="/tasks/:id" element={
              <ProtectedRoute>
                <TaskDetails/>
              </ProtectedRoute>
              } />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
