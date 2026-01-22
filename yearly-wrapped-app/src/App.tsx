import { Route, Routes } from "react-router-dom";

import { Home, Login, Navbar,
  Year, Month, Day } from "./components";

import { useAuth } from "./hooks/useAuth";

import { logout } from "./lib/api/user";

import './App.css';

function App() {
  const { user } = useAuth();

  return (
    <div className="app d-flex flex-column">
      <header>
        <Navbar />
      </header>

      <div className="main">
        {
          user ? (
            <>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />

                <Route path="/year/:year" element={<Year />} />
                <Route path="/year/:year/month/:month" element={<Month />} />
                <Route path="/year/:year/month/:month/day/:day" element={<Day />} />
              </Routes>
              <button className="btn btn-secondary" onClick={logout}>Logout</button>
            </>) : (
            <>
              <Login />
            </>)
        }
      </div>
    </div>
  );
}

export default App;
