import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const { user } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getUserTransaction() {
      try {
        const { data } = await axios.get('http://localhost:5009/transacoes', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        console.log(data);
        setTransactions(data);
      } catch (error) {
        alert('Ops! Infelizmente aconteceu um erro! Tente novamente!');
        console.error(error.response);
      }
    }

    getUserTransaction();
  }, []);

  function renderizaTransacoes() {
    return transactions.map((t, index) => (
      <p key={index} style={t.type === 'entrada' ? { color: 'green' } : { color: 'red' }}>
        {t.createAt} | {t.description} | {t.value}
      </p>
    ));
  }

  function pegaSaldo() {
    if (transactions.length > 0) {
      return transactions.reduce((previous, current) => {
        if (current.type === 'entrada') {
          return previous + current.value;
        }

        return previous - current.value;
      }, 0);
    } else {
      return 0;
    }
  }

  const saldo = pegaSaldo();

  return (
    <div className="">
      <p>Olá {user.name}</p>
      <Link to="/"> Sair </Link>
      <div style={{ backgroundColor: 'white', width: 200, height: 250 }}>
        {transactions.length > 0 ? (
          <p style={{ color: 'gray', fontSize: 12 }}>
            Minhas transacoes
            <p>{renderizaTransacoes()}</p>
          </p>
        ) : (
          <span style={{ color: 'gray', fontSize: 12 }}>
            não há registros de entrada e saída
          </span>
        )}
        <h4>Saldo: {saldo}</h4>
      </div>
      <p>
        <Link to="/cadastrar-entrada">Nova Entrada</Link> |{' '}
        <Link to="/cadastrar-saida">Nova Saída</Link>
      </p>
    </div>
  );
}
export default Home;
