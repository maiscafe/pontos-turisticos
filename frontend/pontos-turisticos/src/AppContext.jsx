import React, { createContext, useState } from "react";

const initialState = {
    "idPontoTuristico": null,
    "nome": null,
    "idUf": null,
    "cidade": null,
    "referencia": null,
    "descricao": null,
    "ufCodigoIbge": null
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [selectedPontoTuristico, setSelectedPontoTuristico] = useState(initialState);

    const clearContext = () => {
        setSelectedPontoTuristico(initialState);
    };

    return (
        <AppContext.Provider value={{ selectedPontoTuristico, setSelectedPontoTuristico, clearContext }}>
            {children}
        </AppContext.Provider>
    );
};