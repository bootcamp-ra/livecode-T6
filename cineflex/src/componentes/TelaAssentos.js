import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Assento from './Assento';

function TelaAssentos(props) {
  const { finalizar } = props;
  const { sessaoId } = useParams();

  const navigate = useNavigate();

  const [sessao, setSessao] = useState(null);
  const [assentosSelecionados, setAssentosSelecionados] = useState([]);
  const [dadosCompra, setDadosCompra] = useState({ nome: '', cpf: '' });

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessaoId}/seats`;
    const promise = axios.get(URL);

    promise.then(response => {
      const { data } = response;
      setSessao(data);
    });

    promise.catch(err => {
      const message = err.response.statusText;
      alert(message);
    });
  }, []);

  function toggle(id, numero) {
    const jaSelecionado = assentosSelecionados.some(assento => assento.id === id);
    if (!jaSelecionado) {
      setAssentosSelecionados([...assentosSelecionados, { id, numero }]);
    } else {
      const novosAssentos = assentosSelecionados.filter(assento => assento.id !== id);
      setAssentosSelecionados(novosAssentos);
    }
  }

  function montarAssentos() {
    if (sessao !== null) {
      return sessao.seats.map(seat => {
        const { id, name, isAvailable } = seat;
        const selecionado = assentosSelecionados.some(assento => assento.id === id);
        return (
          <Assento
            key={id}
            id={id}
            numero={name}
            disponivel={isAvailable}
            selecionado={selecionado}
            aoSelecionar={(id, numero) => toggle(id, numero)}
          />
        );
      });
    } else {
      <p>Carregando...</p>;
    }
  }

  function confirmarCompra(event) {
    event.preventDefault();

    if (assentosSelecionados.length > 0) {
      const URL = `https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`;
      const promise = axios.post(URL, {
        ids: assentosSelecionados.map(assento => assento.id),
        name: dadosCompra.nome,
        cpf: dadosCompra.cpf
      });

      promise.then(response => {
        finalizar({
          filme: sessao.movie.title,
          dia: sessao.day.date,
          horario: sessao.name,
          assentos: assentosSelecionados,
          comprador: dadosCompra
        });
        navigate('/sucesso');
      });

      promise.catch(err => alert(err.response.statusText));
    } else {
      alert('Selecione pelo menos um assento!');
    }
  }

  function montarFormularioCompra() {
    return (
      <>
        <label htmlFor="nome">Nome do comprador:</label>
        <input
          type="text"
          id="nome"
          value={dadosCompra.nome}
          placeholder="Digite seu nome..."
          required
          onChange={e => setDadosCompra({ ...dadosCompra, nome: e.target.value })}
        />
        <label htmlFor="cpf">CPF do comprador:</label>
        <input
          type="text"
          id="cpf"
          value={dadosCompra.cpf}
          placeholder="Digite seu CPF..."
          required
          onChange={e => setDadosCompra({ ...dadosCompra, cpf: e.target.value })}
        />
        <div>
          <button>Reservar assento(s)</button>
        </div>
      </>
    );
  }

  const formularioCompra = montarFormularioCompra();
  const assentos = montarAssentos();

  return (
    <Container>
      <h1>Selecione o(s) assento(s)</h1>
      <Assentos>{assentos}</Assentos>
      <FormularioCompra onSubmit={confirmarCompra}>{formularioCompra}</FormularioCompra>
    </Container>
  );
}

const Container = styled.div`
  margin: 70px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    height: 100px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Assentos = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;

const Legenda = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: 60px;
`;

const AssentoLegenda = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1px solid #808f9d;
    background-color: ${({ cor }) => cor || '#C3CFD9'};
  }

  p {
    font-size: 13px;
    margin-top: 5px;
  }
`;

const FormularioCompra = styled.form`
  display: flex;
  flex-direction: column;
  align-self: start;
  width: 100%;
  margin-bottom: 200px;

  * {
    margin: 5px 0;
  }

  input {
    width: 100%;
    height: 50px;
    padding-left: 20px;
  }

  button {
    background-color: var(--cor-laranja);
    width: 225px;
    color: white;
    padding: 10px 5px;
    border: 0;
    cursor: pointer;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default TelaAssentos;
