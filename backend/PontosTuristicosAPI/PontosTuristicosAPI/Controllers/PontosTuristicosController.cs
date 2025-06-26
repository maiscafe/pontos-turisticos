using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PontosTuristicosAPI.DTOs;
using PontosTuristicosAPI.Services;

namespace PontosTuristicosAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PontosTuristicosController : ControllerBase
    {
        private readonly IPontoTuristicoService _pontoTuristicoService; 

        public PontosTuristicosController(IPontoTuristicoService pontoTuristicoService)
        {
            _pontoTuristicoService = pontoTuristicoService;

        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok(new { Message = "Pong", Timestamp = DateTime.UtcNow });
        }

        /// <summary>
        /// Retorna a lista de todos os pontos turísticos cadastrados.
        /// </summary>
        /// <returns>Retorna uma lista com os dados de pontos turísticos ou uma mensagem de erro.</returns>
        [HttpGet("lista")]
        public async Task<IActionResult> GetPontosTuristicos()
        {
            try
            {
                var pontosTuristicos = await _pontoTuristicoService.ObterPontosTuristicosAsync();

                if (pontosTuristicos == null || !pontosTuristicos.Any())
                {
                    return NotFound(new { StatusCode = 404, ErrorMessage = "Nenhum ponto turístico encontrado." });
                }

                return Ok(pontosTuristicos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { StatusCode = 500, ErrorMessage = "Erro interno no servidor.", Detail = ex.Message });
            }
        }

        /// <summary>
        /// Retorna um ponto turístico por id.
        /// </summary>
        /// <returns>Retorna uma lista com os dados do ponto turístico específico por id ou uma mensagem de erro.</returns>
        [HttpGet("ponto")]
        public async Task<IActionResult> GetPontoTuristicoById([FromQuery] int id)
        {
            try
            {
                if (id <= 0) 
                {
                    throw new Exception("O ID deve ser um número positivo.");
                }


                var pontosTuristicos = await _pontoTuristicoService.ObterPontosTuristicosPorIdAsync(id);

                if (pontosTuristicos == null || !pontosTuristicos.Any())
                {
                    return NotFound(new { StatusCode = 404, ErrorMessage = "Nenhum ponto turístico encontrado." });
                }

                return Ok(pontosTuristicos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { StatusCode = 500, ErrorMessage = ex.Message == "O ID deve ser um número positivo." 
                    ? "O ID deve ser um número positivo." : "Erro interno no servidor.", Detail = ex.Message });
            }
        }
 
        /// <summary>
        /// Endpoint para cadastrar um novo ponto turístico.
        /// </summary>
        /// <returns>Retorna o mesmos dados informados do ponto turístico caso o cadastro for bem sucedido ou uma mensagem de erro.</returns>
        [HttpPost("cadastrar")]
        public async Task<IActionResult> CadastrarPontoTuristico([FromBody] PontoTuristicoDto pontoTuristicoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { StatusCode = 400, ErrorMessage = "Dados inválidos", Errors = ModelState.Values.SelectMany(v => v.Errors) });
            }

            try
            {

                var pontoTuristico = new PontoTuristicoDto
                {
                    Nome = pontoTuristicoDto.Nome,
                    UfCodigoIbge = pontoTuristicoDto.UfCodigoIbge,
                    Cidade = pontoTuristicoDto.Cidade,
                    Referencia = pontoTuristicoDto.Referencia,
                    Descricao = pontoTuristicoDto.Descricao

                };

                await _pontoTuristicoService.CadastrarPontoTuristicoAsync(pontoTuristico);

                return CreatedAtAction(nameof(CadastrarPontoTuristico), new { id = pontoTuristico.Nome }, pontoTuristico);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { StatusCode = 500, ErrorMessage = "Erro interno no servidor.", Detail = ex.Message });
            }
        }
    }
}
