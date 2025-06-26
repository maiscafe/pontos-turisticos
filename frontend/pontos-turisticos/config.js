const config = {
    development: {
        apiUrl: 'http://localhost:5232/api/v1',
        wsUrl: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/{ufCodigoIbge}/distritos',
    },
    appVersion: '1.0.0',
};

const env = process.env.NODE_ENV || 'development';
export default config[env];