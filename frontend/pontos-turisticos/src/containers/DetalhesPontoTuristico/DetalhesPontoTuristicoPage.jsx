import React, { Fragment, useEffect } from 'react';
import Navbar from '../../components/ui/navbar/Navbar';
import PontosTuristicosForm from '../../components/ui/pontosTuristicos/PontosTuristicosForm';
import './DetalhesPontoTuristicoPage.css';

const DetalhesPontoTuristico = () => {

    useEffect(() => {
        document.title = 'Detalhes';
    }, []);

    return (
        <Fragment>
            <header>
                <Navbar />
            </header>
            <div className="container">
                <div className="form-pontos-turisticos">
                    <PontosTuristicosForm cadastro={false} />
                </div>
            </div>
        </Fragment>
    );
}

export default DetalhesPontoTuristico;