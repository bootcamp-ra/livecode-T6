import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Entrada from './pages/Entrada';
import Saida from './pages/Saida';

import UserContext from '../contexts/UserContext';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <header className="App-header">
          MyWallet
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastrar-entrada" element={<Entrada />} />
              <Route path="/cadastrar-saida" element={<Saida />} />
            </Routes>
          </BrowserRouter>
        </header>
      </UserContext.Provider>
    </div>
  );
}
export default App;
