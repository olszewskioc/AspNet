using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using Entity_AspNet.Data;
using Entity_AspNet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.CodeAnalysis.CSharp.Syntax;


namespace Entity_AspNet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MaquinaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<MaquinaController> _logger;

        public MaquinaController(AppDbContext context, ILogger<MaquinaController> logger)
        {
            _context = context;
            _logger = logger;
        }
        [HttpPost]
        public async Task<ActionResult<Maquina>> Post([FromBody] Maquina maquina)
        {
            try
            {
                _context.Maquinas.Add(maquina);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Máquina {maquina.MaquinaId} criado com sucesso\n");
                return maquina;
            }
            catch (NpgsqlException ex)
            {
                _logger.LogError(ex, "ERROR DB");
                return StatusCode(400, $"ERROR DB: {ex.Message}");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR");
                return StatusCode(500, $"ERROR: {ex.Message}");
            }
        }
        [HttpGet]
        public async Task<IEnumerable<Maquina>> Get()
        {
            try
            {
                return await _context.Maquinas.ToListAsync();
            }
            catch (NpgsqlException ex)
            {
                _logger.LogError(ex, "ERROR DB");
                return Enumerable.Empty<Maquina>();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR");
                return Enumerable.Empty<Maquina>();
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Maquina>> GetById(int id)
        {
            try
            {
                var maquina =  await _context.Maquinas.FindAsync(id);
                if (maquina == null) return NotFound();
                return maquina;
            }
            catch (NpgsqlException ex)
            {
                _logger.LogError(ex, "ERROR DB");
                return BadRequest(ex.Message);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR");
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Maquina>> Put(int id, [FromBody] Maquina maquina)
        {
            try
            {
                var existente = await _context.Maquinas.FindAsync(id);
                if (existente == null)
                    return NotFound($"Máquina {id} não encontrado");

                existente.Tipo = maquina.Tipo;
                existente.Velocidade = maquina.Velocidade;
                existente.PlacaRede = maquina.PlacaRede;
                existente.HardDisk = maquina.HardDisk;
                existente.MemoriaRam = maquina.MemoriaRam;
                existente.UsuarioId = maquina.UsuarioId;
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Máquina {maquina.Tipo} atualizado com sucesso\n");
                return NoContent();
            }
            catch (NpgsqlException ex)
            {
                _logger.LogError(ex, "ERROR DB");
                return StatusCode(400, $"ERROR DB: {ex.Message}");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR");
                return StatusCode(500, $"ERROR: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {

                var maquina = await _context.Maquinas.FindAsync(id);
                if (maquina == null)
                    return NotFound($"Máquina {id} não encontrado");

                _context.Maquinas.Remove(maquina);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Máquina {maquina.Tipo} deletado com sucesso\n");
                return NoContent();

            }
            catch (NpgsqlException ex)
            {
                _logger.LogError(ex, "ERROR DB");
                return StatusCode(400, $"ERROR DB: {ex.Message}");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR");
                return StatusCode(500, $"ERROR: {ex.Message}");
            }
        }
    }
}