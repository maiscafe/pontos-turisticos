import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../../AppContext';
import config from '../../../../config';
import Modal from 'react-modal';
import Input from '../inputs/Input';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import './PontosTuristicosForm.css';
import ModalCustom from '../modal/Modal';

const PontosTuristicosForm = ({ cadastro, initialData = {} }) => {
    const { selectedPontoTuristico } = useContext(AppContext);

    // Infos do ponto turístico
    const [nome, setNome] = useState(initialData.nome || '');
    const [uf, setUf] = useState(initialData.uf || '');
    const [cidade, setCidade] = useState(initialData.cidade || '');
    const [referencia, setReferencia] = useState(initialData.referencia || '');
    const [descricao, setDescricao] = useState(initialData.descricao || '');

    // Controle
    const [descricaoRequired, setDescricaoRequired] = useState(initialData.descricao || '');
    const [cidadesSugestao, setCidadesSugestao] = useState([]);
    const [modalAberta, setModalAberta] = useState(false);
    const [erroCidade, setErroCidade] = useState(false);
    const [erroCadastro, setErroCadastro] = useState('');
    const [readOnly, setReadOnly] = useState(false);
    const navigate = useNavigate();

    // URL para requests
    const apiUrl = config.apiUrl;
    const wsUrl = config.wsUrl;

    // Tratamento para saber se é modo detalhe ou cadastro
    useEffect(() => {
        if (selectedPontoTuristico && !cadastro) {
            setNome(selectedPontoTuristico.nome);
            setUf(selectedPontoTuristico.ufCodigoIbge);
            setCidade(selectedPontoTuristico.cidade);
            setReferencia(selectedPontoTuristico.referencia);
            setDescricao(selectedPontoTuristico.descricao);
            setReadOnly(true);
        } else {
            setReadOnly(false);
        }
    }, [selectedPontoTuristico]);

    /* REQUESTS */
    // Cadastro
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || !uf || !cidade || !referencia || !descricao) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            await axios.post(`${apiUrl}/pontosturisticos/cadastrar`, {
                Nome: nome,
                UfCodigoIbge: uf,
                Cidade: cidade,
                Referencia: referencia,
                Descricao: descricao,
            });
            setModalAberta(true);
        } catch (error) {
            setModalAberta(true);
            try {
                setErroCadastro(error.response.data.detail);
            } catch (erro) {
                setErroCadastro(error.message);
            }
        }
    };

    // Obter cidade do WebService
    const buscarCidades = async (ufSelecionada) => {
        try {
            const response = await axios.get(wsUrl.replace('{ufCodigoIbge}', ufSelecionada));
            setCidadesSugestao(response.data);
            setErroCidade(false);
        } catch (error) {
            setCidadesSugestao([]);
            setErroCidade(true);
        }
    };

    useEffect(() => {
        if (uf) {
            buscarCidades(uf);
        } else {
            setCidadesSugestao([]);
        }
    }, [uf]);

    /* HANDLERS */
    const handleVoltarOnclick = () => {
        navigate('/');
    };

    const handleModalClick = () => {
        setModalAberta(false);
        erroCadastro === '' && navigate('/');
        setErroCadastro('');
    };

    const handleDescricaoBlur = () => {
        !descricao ? setDescricaoRequired(true) : setDescricaoRequired(false);
    };

    return (
        <div className="form-group-container">
            {!cadastro ? <h3 className='title'>Detalhes do ponto turístico</h3> :
                <h3 className='title'>Cadastrar novo ponto turístico</h3>}
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <div className="label">
                        <label htmlFor="nome"><b>Nome: </b></label>
                    </div>
                    <Input
                        type="text"
                        id="nome"
                        placeholder="Informe o nome do ponto turístico"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        maxLength={50}
                        readOnly={readOnly}
                        disabled={readOnly}
                        style={{ width: '100%' }}
                        required={!nome} />
                </div>

                <div className='localizacao-group'>
                    <div className='form-group'>
                        <div className="label">
                            <label htmlFor="cidade">UF: </label>
                        </div>
                        <select
                            value={uf}
                            onChange={(e) => setUf(e.target.value)}
                            readOnly={readOnly}
                            disabled={readOnly}
                            style={{ marginRight: '10px' }}>
                            <option value="">Selecione</option>
                            <option value="12">AC</option>
                            <option value="27">AL</option>
                            <option value="16">AP</option>
                            <option value="13">AM</option>
                            <option value="29">BA</option>
                            <option value="23">CE</option>
                            <option value="53">DF</option>
                            <option value="32">ES</option>
                            <option value="52">GO</option>
                            <option value="21">MA</option>
                            <option value="51">MT</option>
                            <option value="50">MS</option>
                            <option value="31">MG</option>
                            <option value="15">PA</option>
                            <option value="25">PB</option>
                            <option value="41">PR</option>
                            <option value="26">PE</option>
                            <option value="22">PI</option>
                            <option value="33">RJ</option>
                            <option value="24">RN</option>
                            <option value="43">RS</option>
                            <option value="11">RO</option>
                            <option value="14">RR</option>
                            <option value="42">SC</option>
                            <option value="35">SP</option>
                            <option value="28">SE</option>
                            <option value="17">TO</option>
                        </select>
                        <Input
                            type="text"
                            id="cidade"
                            placeholder="Informe a cidade"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            list="cidades"
                            readOnly={!uf || readOnly}
                            disabled={readOnly}
                            required={!cidade}
                            style={{ width: '100%' }}
                        />
                        <datalist id="cidades">
                            {cidadesSugestao
                                .sort((a, b) => a.nome.localeCompare(b.nome))
                                .filter(c => c.nome.includes(cidade))
                                .map((c, index) => (
                                    <option key={`${c.nome}-${index}`} value={c.nome} />)
                                )}
                        </datalist>
                        {erroCidade && (
                            <p style={{ color: 'red' }}>
                                Não foi possível carregar as cidades. Insira a cidade manualmente.
                            </p>
                        )}
                    </div>
                </div>


                <div>
                    <div className='form-group'>
                        <div className="label">
                            <label htmlFor="referencia">Referência*</label>
                        </div>
                        <Input
                            type="text"
                            id="referencia"
                            placeholder="Referência/endereço para o ponto turístico"
                            value={referencia}
                            onChange={(e) => setReferencia(e.target.value)}
                            readOnly={readOnly}
                            disabled={readOnly}
                            required={!referencia}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
                <div>
                    <div className='form-group'>
                        <div className="label">
                            <label htmlFor='descricao'><b>Descrição*</b></label>
                        </div>
                        <textarea
                            placeholder="Descrição do ponto turístico"
                            value={descricao}
                            id='descricao'
                            onChange={(e) => setDescricao(e.target.value)}
                            maxLength={100}
                            readOnly={readOnly}
                            disabled={readOnly}
                            required={descricaoRequired}
                            onBlur={handleDescricaoBlur}
                            style={{ width: '100%', minHeight: '90px' }}
                        />
                    </div>
                </div>
                {
                    !readOnly && (
                        <div className="botoes-form">
                            <SecondaryButton type="button" onClick={handleVoltarOnclick}>Voltar</SecondaryButton>
                            <PrimaryButton type="submit">Cadastrar</PrimaryButton>
                        </div>
                    )
                }
            </form>

            <ModalCustom
                isOpen={modalAberta}
                onClose={handleModalClick}
                title={erroCadastro === '' ? "Sucesso" : "Falha"}>
                <div className="modal-content">
                    {
                        erroCadastro === '' && (<p>O novo ponto turístico foi cadastrado!</p>)
                    }
                    {
                        erroCadastro !== '' && (<p>{erroCadastro}</p>)
                    }
                    <PrimaryButton onClick={handleModalClick}>Fechar</PrimaryButton>
                </div>
            </ModalCustom>
        </div >
    );
};

export default PontosTuristicosForm;
