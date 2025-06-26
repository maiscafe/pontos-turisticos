import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../../AppContext";
import config from "../../../../config";
import PrimaryButton from "../buttons/PrimaryButton";
import "./CardPontoTuristico.css";

const CardPontoTuristico = (props) => {
    const { setSelectedPontoTuristico } = useContext(AppContext);
    const navigate = useNavigate();
    const apiUrl = config.apiUrl;

    // Endpoint para recuperar os dados do ponto turístico
    const fetchDetalhes = async () => {
        try {
            const response = await axios.get(`${apiUrl}/pontosturisticos/ponto`, {
                params: { id: props.id },
            });
            setSelectedPontoTuristico(response.data[0]);
            navigate('/detalhes');
        } catch (error) {
            console.error("Erro ao buscar os detalhes do ponto turístico:", error);
        }
    };

    return (
        <div className="card" id={props.id}>
            <div className="card-content">
                <h3>{props.titulo}</h3>
                <p style={{ fontSize: '16px' }}>{props.referencia}</p>
                <div className="descricao">
                    <p className="texto-descricao">{props.descricao}</p>
                </div>
            </div>
            <PrimaryButton style={{ padding: "4px 16px" }} onClick={fetchDetalhes}>
                Ver detalhes
            </PrimaryButton>
        </div >
    );
};

export default CardPontoTuristico;
