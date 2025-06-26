import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from "./AppContext";
import HomePage from './containers/HomePage/HomePage';
import CadastrarPontoTuristico from './containers/CadastrarPontoTuristico/CadastrarPontoTuristicoPage';
import DetalhesPontoTuristico from './containers/DetalhesPontoTuristico/DetalhesPontoTuristicoPage';
import './App.css'

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cadastrar" element={<CadastrarPontoTuristico />} />
          <Route path="/detalhes" element={<DetalhesPontoTuristico />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App
