import React from 'react';

import { useState } from "react";
import { client } from "../../lib/supabaseClient";

import './login.css';

interface PageProps {
}

const Login: React.FC<PageProps> = ({ }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="app-page login-page background-background color-primary d-flex flex-column mt-3 px-3 py-3">
        <div className="day-title-container mb-3">
          <h2 className='mb-0 login-title'>Login</h2>
        </div>
        <form onSubmit={handleLogin} className='login-form'>
          <div className="form-group mb-3">
            <p className="mb-1">Email</p>
            <input className='form-control' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <p className="mb-1">Password</p>
            <input className='form-control' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="outline-div w-100 mt-4 mb-4"></div>

          <button type="submit" className='btn' disabled={loading}>Login</button>

          {error && <p className='error-indicator mt-3'>{error}</p>}
        </form>
      </div>
    </>
  )
}

export default Login