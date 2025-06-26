import React, { useEffect, useState, Fragment, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { AppContext } from '../../AppContext';
import config from '../../../config';
import Navbar from '../../components/ui/navbar/Navbar';
import PrimaryButton from '../../components/ui/buttons/PrimaryButton';
import Input from '../../components/ui/inputs/Input';
import CardPontoTuristico from '../../components/ui/cards/CardPontoTuristico';
import './HomePage.css';

const HomePage = () => {
    // Infos dos pontos
    const { state, clearContext } = useContext(AppContext);
    const [pontosTuristicos, setPontosTuristicos] = useState([]);
    const [pontosTuristicosOriginais, setPontosTuristicosOriginais] = useState(pontosTuristicos);

    // Controle e URL
    const [busca, setBusca] = useState(false);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [itensPorPagina] = useState(3);
    const [termoBusca, setTermoBusca] = useState('');
    const apiUrl = config.apiUrl;

    // Reset do context e fetch dos pontos
    useEffect(() => {
        document.title = 'Início';
        getPontosTuristicos();
        clearContext();
    }, []);

    const getPontosTuristicos = async () => {
        axios.get(`${apiUrl}/pontosturisticos/lista`)
            .then((response) => {
                setPontosTuristicos(response.data);
                setPontosTuristicosOriginais(response.data);
            })
            .catch((error) => console.error('Erro:', error));
    };

    /* HANDLERS */
    const handleBusca = () => {

        if (termoBusca !== '') {
            setBusca(true);
            document.title = 'Resultados';
        } else {
            setBusca(false);
            document.title = 'Início';
        }

        const pontosFiltro = pontosTuristicosOriginais.filter((ponto) =>
            ponto.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
            ponto.referencia.toLowerCase().includes(termoBusca.toLowerCase()) ||
            ponto.descricao.toLowerCase().includes(termoBusca.toLowerCase())
        );
        setPontosTuristicos(pontosFiltro);
    };

    const handleBuscaBotao = () => {

        setBusca(true);
        document.title = 'Resultados';

        const pontosFiltro = pontosTuristicosOriginais.filter((ponto) =>
            ponto.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
            ponto.referencia.toLowerCase().includes(termoBusca.toLowerCase()) ||
            ponto.descricao.toLowerCase().includes(termoBusca.toLowerCase())
        );
        setPontosTuristicos(pontosFiltro);
    };

    const handleCliquePagina = ({ selected }) => {
        setPaginaAtual(selected);
    };

    const inicioIndex = paginaAtual * itensPorPagina;
    const fimIndex = inicioIndex + itensPorPagina;
    const itensExibir = pontosTuristicos.slice(inicioIndex, fimIndex);

    return (
        <Fragment>
            <header>
                <Navbar />
            </header>
            <div className="container">
                <div className="busca">
                    <Input
                        type="text"
                        style={{ marginRight: '10px' }}
                        placeholder="Digite um termo para buscar um ponto turístico..."
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                        onKeyUp={handleBusca}
                    />
                    <PrimaryButton onClick={handleBuscaBotao}>Buscar</PrimaryButton>
                </div>
                <div className="lista-content">
                    {busca && itensExibir.length > 0 ? (
                        itensExibir.map((ponto) => (
                            <CardPontoTuristico
                                key={ponto.idPontoTuristico}
                                id={ponto.idPontoTuristico}
                                titulo={ponto.nome}
                                referencia={ponto.referencia}
                                descricao={ponto.descricao}
                            />
                        ))
                    ) : (
                        busca && (<div className='nenhum-ponto'><p style={{ fontSize: '18px', fontWeight: 'bold', color: '#444' }}>Não encontrei nenhum resultado para a sua busca :(</p></div>)
                    )}
                </div>
                {busca && pontosTuristicos.length > itensPorPagina && (
                    <ReactPaginate
                        previousLabel={"Anterior"}
                        nextLabel={"Próximo"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(pontosTuristicos.length / itensPorPagina)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handleCliquePagina}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                )}
            </div>
        </Fragment>
    );
};

export default HomePage;
