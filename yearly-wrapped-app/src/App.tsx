import { Route, Routes } from "react-router-dom";

import { Home, Login, Navbar } from "./components";

import { useAuth } from "./hooks";

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

      <div className="main mt-5">
        {
          user ? (
            <>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
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
