import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import TelaSucesso from './TelaSucesso';
import TelaAssentos from './TelaAssentos';
import TelaSessoes from './TelaSessoes';
import TelaInicial from './TelaInicial';

import Header from './layouts/Header';

function App() {
  const [reserva, setReserva] = useState(null);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<TelaInicial />} />
        <Route path="/sessoes/:filmeId" element={<TelaSessoes />} />
        <Route
          path="/assentos/:sessaoId"
          element={<TelaAssentos finalizar={reserva => setReserva(reserva)} />}
        />
        <Route path="/sucesso" element={<TelaSucesso reserva={reserva} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
