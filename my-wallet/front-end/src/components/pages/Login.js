import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useContext(UserContext);
  const navigator = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const body = { email, password };
    try {
      const { data } = await axios.post('http://localhost:5009/login', body);

      setUser(data);
      navigator('/home');
    } catch (error) {
      console.error('Deu erro ao fazer o login');
    }
  }

  return (
    <div className="">
      <form>
        <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <br />
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <br />
        <button type="submit" onClick={handleSubmit}>
          Entrar
        </button>
        <p>
          <Link to="/cadastro" style={{ fontSize: 14, color: 'white' }}>
            Primeira vez? Cadastrate-se!
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Login;
