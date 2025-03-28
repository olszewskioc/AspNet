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
    public class SoftwareController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<SoftwareController> _logger;

        public SoftwareController(AppDbContext context, ILogger<SoftwareController> logger)
        {
            _context = context;
            _logger = logger;
        }
        [HttpPost]
        public async Task<ActionResult<Software>> Post([FromBody] Software software)
        {
            try
            {
                _context.Softwares.Add(software);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Software {software.Produto} criado com sucesso\n");
                return software;
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
        public async Task<IEnumerable<Software>> Get()
        {
            try
            {
                return await _context.Softwares.ToListAsync();
            }
            catch (NpgsqlException ex)
            {
                _logger.LogError(ex, "ERROR DB");
                return Enumerable.Empty<Software>();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR");
                return Enumerable.Empty<Software>();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Software>> GetById(int id)
        {
            try
            {
                var software =  await _context.Softwares.FindAsync(id);
                if (software == null) return NotFound();
                return software;
            }
            catch (NpgsqlException ex)
            {
                _logger.LogError(ex, "ERROR DB");
                return BadRequest();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR");
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Maquina>> Put(int id, [FromBody] Software software)
        {
            try
            {
                var existente = await _context.Softwares.FindAsync(id);
                if (existente == null)
                    return NotFound($"Software {id} não encontrado");

                existente.Produto = software.Produto ?? existente.Produto;
                existente.HardDisk = software.HardDisk;
                existente.MemoriaRam = software.MemoriaRam;
                existente.MaquinaId = software.MaquinaId;
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Software {software.Produto} atualizado com sucesso\n");
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

                var software = await _context.Softwares.FindAsync(id);
                if (software == null)
                    return NotFound($"Software {id} não encontrado");

                _context.Softwares.Remove(software);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Software {software.Produto} deletado com sucesso\n");
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