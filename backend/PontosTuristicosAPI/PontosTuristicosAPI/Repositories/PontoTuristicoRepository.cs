using Dapper;
using Microsoft.Data.Sqlite;
using PontosTuristicosAPI.DTOs;
using PontosTuristicosAPI.Models;

namespace PontosTuristicosAPI.Repositories
{
    public interface IPontoTuristicoRepository
    {
        Task<List<PontoTuristicoModel>> ObterTodosAsync();
        Task<List<PontoTuristicoModel>> ObterPorIdAsync(int id);
        Task<List<PontoTuristicoModel>> CadastrarPontoTuristicoAsync(PontoTuristicoDto pontoTuristicoDto);
    }

    public class PontoTuristicoRepository : IPontoTuristicoRepository
    {
        private readonly string _connectionString;

        public PontoTuristicoRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("PontoTuristicoCon")
                ?? throw new ArgumentNullException("A conexão com o banco de dados não foi configurada."); ;
        }

        public async Task<List<PontoTuristicoModel>> ObterTodosAsync()
        {
            using (var connection = new SqliteConnection(_connectionString))
            {

                var query = " SELECT Ptu.IdPontoTuristico," +
                            "        Ptu.Nome," +
                            "        Ptu.IdUf," +
                            "        Ptu.Cidade," +
                            "        Ptu.Referencia," +
                            "        Ptu.Descricao," +
                            "        Ufe.CodigoIbge as UfCodigoIbge, " +
                            "        Ptu.InclusaoDataHora " +
                            "   FROM PontoTuristico AS Ptu" +
                            "   INNER JOIN UnidadeFederativa AS Ufe ON Ptu.IdUf = Ufe.IdUf" +
                            "   ORDER BY Ptu.InclusaoDataHora DESC";

                var result = await connection.QueryAsync<PontoTuristicoModel>(query);
                return result.ToList();
            }
        }

        public async Task<List<PontoTuristicoModel>> ObterPorIdAsync(int id)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {

                var query = " SELECT Ptu.IdPontoTuristico," +
                            "        Ptu.Nome," +
                            "        Ptu.IdUf," +
                            "        Ptu.Cidade," +
                            "        Ptu.Referencia," +
                            "        Ptu.Descricao," +
                            "        Ufe.CodigoIbge as UfCodigoIbge, " +
                            "        Ptu.InclusaoDataHora " +
                            "   FROM PontoTuristico AS Ptu" +
                            "   INNER JOIN UnidadeFederativa AS Ufe ON Ptu.IdUf = Ufe.IdUf" +
                            "   WHERE Ptu.IdPontoTuristico = @IdPontoTuristico";


                var parametersGetPontoTuristicoById = new DynamicParameters();
                parametersGetPontoTuristicoById.Add("@IdPontoTuristico", id);

                var result = await connection.QueryAsync<PontoTuristicoModel>(query, parametersGetPontoTuristicoById);
                return result.ToList();
            }
        }

        public async Task<List<PontoTuristicoModel>> ObterPorIdsync(int id)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {

                var query = " SELECT Ptu.IdPontoTuristico," +
                            "        Ptu.Nome," +
                            "        Ptu.IdUf," +
                            "        Ptu.Cidade," +
                            "        Ptu.Referencia," +
                            "        Ptu.Descricao," +
                            "        Ufe.CodigoIbge as UfCodigoIbge, " +
                            "        Ptu.InclusaoDataHora " +
                            "   FROM PontoTuristico AS Ptu" +
                            "   INNER JOIN UnidadeFederativa AS Ufe ON Ptu.IdUf = Ufe.IdUf" +
                            "   WHERE Ptu.IdPontoTuristico = @IdPontoTuristico";


                var parametersGetPontoTuristicoById = new DynamicParameters();
                parametersGetPontoTuristicoById.Add("@IdPontoTuristico", id);

                var result = await connection.QueryAsync<PontoTuristicoModel>(query, parametersGetPontoTuristicoById);
                return result.ToList();
            }
        }
         
        public async Task<List<PontoTuristicoModel>> CadastrarPontoTuristicoAsync(PontoTuristicoDto pontoTuristicoDto)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {

                // Verificando se a Unidade Federativa existe no banco de dados
                var queryGetIdUf = " SELECT IdUf " +
                                   "   FROM UnidadeFederativa " +
                                   "  WHERE CodigoIbge = @CodigoIbge";

                var parametersGetIdUf = new DynamicParameters();
                parametersGetIdUf.Add("@CodigoIbge", pontoTuristicoDto.UfCodigoIbge);

                var idUf = await connection.ExecuteScalarAsync<int?>(queryGetIdUf, parametersGetIdUf);

                if (!idUf.HasValue)
                {
                    throw new Exception("Código IBGE não encontrado para a Unidade Federativa.");
                }

                // Antes de inserir o ponto turístico, vamos verificar se ele já existe
                // de acordo com o nome e a cidade e id da UF
                var queryCheckPontoTuristico = "SELECT 1 " +
                                               "  FROM PontoTuristico AS Ptu " +
                                               " WHERE Ptu.Nome   = @Nome " +
                                               "   AND Ptu.IdUf   = @IdUf " +
                                               "   AND Ptu.Cidade = @Cidade " +
                                               " LIMIT 1";

                var parametersCheckPontoTuristico = new DynamicParameters();
                parametersCheckPontoTuristico.Add("@Nome", pontoTuristicoDto.Nome);
                parametersCheckPontoTuristico.Add("@IdUf", idUf);
                parametersCheckPontoTuristico.Add("@Cidade", pontoTuristicoDto.Cidade);

                var idPontoTuristico = await connection.ExecuteScalarAsync<int?>(queryCheckPontoTuristico, parametersCheckPontoTuristico);

                if (idPontoTuristico.HasValue)
                {
                    throw new Exception("O ponto turístico informado já está cadastrado.");
                }


                var queryInsertPontoTuristico = " INSERT INTO PontoTuristico( Nome, IdUf, Cidade, Referencia, Descricao, InclusaoDataHora ) " +
                                                " VALUES( @Nome, @IdUf, @Cidade, @Referencia, @Descricao, datetime('now') ) " +
                                                " RETURNING IdPontoTuristico; ";

                var parametersInsertPontoTuristico = new DynamicParameters();
                parametersInsertPontoTuristico.Add("@Nome", pontoTuristicoDto.Nome);
                parametersInsertPontoTuristico.Add("@UfCodigoIbge", pontoTuristicoDto.UfCodigoIbge);
                parametersInsertPontoTuristico.Add("@Cidade", pontoTuristicoDto.Cidade);
                parametersInsertPontoTuristico.Add("@Referencia", pontoTuristicoDto.Referencia);
                parametersInsertPontoTuristico.Add("@Descricao", pontoTuristicoDto.Descricao);
                parametersInsertPontoTuristico.Add("@IdUf", idUf.Value);

                var id = await connection.ExecuteScalarAsync<int>(queryInsertPontoTuristico, parametersInsertPontoTuristico);
       
                return new List<PontoTuristicoModel>
                    {
                        new PontoTuristicoModel
                        {
                            IdPontoTuristico = id,
                            Nome = pontoTuristicoDto.Nome,
                            UfCodigoIbge = pontoTuristicoDto.UfCodigoIbge,
                            Cidade = pontoTuristicoDto.Cidade,
                            Referencia = pontoTuristicoDto.Referencia,
                            Descricao = pontoTuristicoDto.Descricao,
                        }
                    };
            }
        }
    }
}
