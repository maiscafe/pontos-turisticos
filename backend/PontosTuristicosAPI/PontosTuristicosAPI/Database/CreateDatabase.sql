CREATE TABLE IF NOT EXISTS UnidadeFederativa (
    IdUf INTEGER PRIMARY KEY AUTOINCREMENT,
    CodigoIbge TEXT NOT NULL,
    Nome TEXT NOT NULL,
    Sigla TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS PontoTuristico (
    IdPontoTuristico INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    IdUf INTEGER NOT NULL,
    Cidade TEXT NOT NULL,
    Referencia TEXT,
    Descricao TEXT,
    InclusaoDataHora TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (IdUf) REFERENCES UnidadeFederativa(IdUf)
);