import React, { Fragment, useEffect } from 'react';
import Navbar from '../../components/ui/navbar/Navbar';
import PontosTuristicosForm from '../../components/ui/pontosTuristicos/PontosTuristicosForm';
import './CadastrarPontoTuristicoPage.css';

const CadastrarPontoTuristico = () => {

    useEffect(() => {
        document.title = 'Cadastrar';
    }, []);

    return (
        <Fragment>
            <header>
                <Navbar />
            </header>
            <div className="container">
                <div className="form-pontos-turisticos">
                    <PontosTuristicosForm cadastro={true} />
                </div>
            </div>
        </Fragment>
    );
}

export default CadastrarPontoTuristico;