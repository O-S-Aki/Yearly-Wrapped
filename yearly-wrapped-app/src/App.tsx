import { Route, Routes } from "react-router-dom";

import { Toaster } from 'react-hot-toast';

import { useAuth } from "./hooks";
import { logout } from "./lib/api/user";

import { DayMobile, Home, Login, Navbar } from "./components";

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

                <Route path='/day'>
                  <Route path=':date' element={<DayMobile editMode={false} />} />
                  <Route path=':date/edit' element={<DayMobile editMode={true} />} />
                </Route>
              </Routes>
            </>) : (
            <>
              <Login />
            </>
            )
        }
        <Toaster position="bottom-center" />
      </div>

      <footer className="mt-3 mx-3 py-2 text-center text-smaller">
        <p className="m-0">This application was created by <span className="weight-700">Dami Akiode</span></p>
      </footer>
    </div>
  );
}

export default App;
