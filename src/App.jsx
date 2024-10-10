import './App.css'
import UsersList from './components/UsersList'
import UserDetail from './components/UserDetail'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
