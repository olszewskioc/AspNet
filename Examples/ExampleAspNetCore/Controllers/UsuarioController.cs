using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using ExampleAspNetCore.Data;
using ExampleAspNetCore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.CodeAnalysis.CSharp.Syntax;


namespace ExampleAspNetCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<UsuarioController> _logger;

        public UsuarioController(AppDbContext context, ILogger<UsuarioController> logger)
        {
            _context = context;
            _logger = logger;
        }
        [HttpPost]
        public async Task<ActionResult<Usuario>> Post([FromBody] Usuario usuario)
        {
            try
            {
                _context.Usuarios.Add(usuario);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Usuário {usuario.Nome} criado com sucesso\n");
                return usuario;
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
        public async Task<IEnumerable<Usuario>> Get()
        {
            try
            {
                return await _context.Usuarios.ToListAsync();
            }
            catch (NpgsqlException ex)
            {
                _logger.LogError(ex, "ERROR DB");
                return Enumerable.Empty<Usuario>();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR");
                return Enumerable.Empty<Usuario>();
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetById(int id)
        {
            try
            {
                var user =  await _context.Usuarios.FindAsync(id);
                if (user == null) return NotFound();
                return user;
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
        public async Task<ActionResult<Usuario>> Put(int id, [FromBody] Usuario usuario)
        {
            try
            {
                var existente = await _context.Usuarios.FindAsync(id);
                if (existente == null)
                    return NotFound($"Usuário {id} não encontrado");

                existente.Nome = usuario.Nome ?? existente.Nome;
                existente.Password = usuario.Password ?? existente.Password;
                existente.Ramal = usuario.Ramal;
                existente.Especialidade = usuario.Especialidade ?? existente.Especialidade;
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Usuário {usuario.Nome} atualizado com sucesso\n");
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

                var usuario = await _context.Usuarios.FindAsync(id);
                if (usuario == null)
                    return NotFound($"Usuário {id} não encontrado");

                _context.Usuarios.Remove(usuario);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Usuário {usuario.Nome} deletado com sucesso\n");
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