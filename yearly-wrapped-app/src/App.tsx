import { Route, Routes } from "react-router-dom";

import { Home, Login, Navbar,
  Year, Month, Day } from "./components";

import { RedirectToCurrentMonth } from './components';
import { useAuth } from "./hooks/useAuth";

import { logout } from "./lib/api/user";

import './App.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <></>
  }

  return (
    <div className="app d-flex flex-column">
      <header>
        <Navbar user={user} logout={logout} />
      </header>

      <div className="main">
        {
          user ? (
            <>
              <Routes>
                <Route path='/' element={<RedirectToCurrentMonth />} />

                <Route path='/home' element={<Home />} />

                <Route path="/year/:year" element={<Year />} />
                <Route path="/year/:year/month/:month" element={<Month />} />
                <Route path="/year/:year/month/:month/day/:day" element={<Day />} />
              </Routes>
            </>) : (
            <>
              <Login />
            </>
            )
        }
      </div>
    </div>
  );
}

export default App;
