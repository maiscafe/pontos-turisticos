namespace PontosTuristicosAPI.Models
{
    public class PontoTuristicoModel
    {
        public int IdPontoTuristico { get; set; }
        public String? Nome { get; set; }
        public int IdUf { get; set; }
        public String? Cidade { get; set; }
        public String? Referencia { get; set; }
        public String? Descricao { get; set; }
        public String? UfCodigoIbge { get; set; }

    }
}
