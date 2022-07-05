import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigator = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const body = { name, email, password, confirmPassword };
    try {
      await axios.post('http://localhost:5009/cadastro', body);

      navigator('/');
    } catch (error) {
      console.error('Deu erro ao cadastrar o usuario');
    }
  }

  return (
    <div className="">
      <form>
        <input type="text" onChange={e => setName(e.target.value)} placeholder="Name" />
        <br />
        <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <br />
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <br />
        <input
          type="password"
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirmar Senha"
        />
        <button type="submit" onClick={handleSubmit}>
          Cadastrar
        </button>
        <p>
          <Link to="/" style={{ fontSize: 14, color: 'white' }}>
            Já tem uma conta? Entre agora!
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Cadastro;
