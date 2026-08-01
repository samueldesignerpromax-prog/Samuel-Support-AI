import { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', { email, password });
      onLogin(res.data.token, res.data.user);
    } catch (err) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, background: '#fff', borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{width:'100%', padding:8, marginBottom:8}} />
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required style={{width:'100%', padding:8, marginBottom:8}} />
        <button type="submit" style={{width:'100%', padding:8, background:'#007bff', color:'#fff', border:'none', borderRadius:4}}>Entrar</button>
        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
      <p style={{fontSize:12}}>Use admin@admin.com / 123456</p>
    </div>
  );
}
