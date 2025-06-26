using Microsoft.EntityFrameworkCore;
using PontosTuristicosAPI.DTOs;
using PontosTuristicosAPI.Models;
using PontosTuristicosAPI.Repositories;

namespace PontosTuristicosAPI.Services
{
    public interface IPontoTuristicoService
    {
        Task<List<PontoTuristicoModel>> ObterPontosTuristicosAsync();
        Task<List<PontoTuristicoModel>> ObterPontosTuristicosPorIdAsync(int id); 
        Task<List<PontoTuristicoModel>> CadastrarPontoTuristicoAsync(PontoTuristicoDto pontoTuristicoDto);

    }

    public class PontoTuristicoService : IPontoTuristicoService
    {
        private readonly IPontoTuristicoRepository _repository;

        public PontoTuristicoService(IPontoTuristicoRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<PontoTuristicoModel>> ObterPontosTuristicosAsync()
        {
            return await _repository.ObterTodosAsync();
        }
        
        public async Task<List<PontoTuristicoModel>> ObterPontosTuristicosPorIdAsync(int id)
        {
            return await _repository.ObterPorIdAsync(id);
        }
         
        public async Task<List<PontoTuristicoModel>> CadastrarPontoTuristicoAsync(PontoTuristicoDto pontoTuristicoDto)
        {
            return await _repository.CadastrarPontoTuristicoAsync(pontoTuristicoDto);
        }
    }
}
