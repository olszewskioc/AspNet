using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using Npgsql;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ADO_AspNet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserCrudController : ControllerBase
    {
        private readonly string _connectionString;

        public UserCrudController()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            _connectionString = configuration.GetConnectionString("PostgresConnection") 
                ?? throw new ArgumentNullException("String de conexão PostgresConnection não encontrada");
        }

        // Criar Usuário
        [HttpPost("criar")]
        public IActionResult InserirUser([FromBody] Usuario usuario)
        {
            string query = "INSERT INTO usuarios (nome_usuario, password, ramal, especialidade) VALUES (@nome, @password, @ramal, @especialidade)";

            using (NpgsqlConnection con = new(_connectionString))
            {
                try
                {
                    con.Open();
                    using NpgsqlCommand cmd = new(query, con);
                    cmd.Parameters.AddWithValue("nome", usuario.Nome);
                    cmd.Parameters.AddWithValue("password", usuario.Password);
                    cmd.Parameters.AddWithValue("ramal", usuario.Ramal);
                    cmd.Parameters.AddWithValue("especialidade", usuario.Especialidade);
                    cmd.ExecuteNonQuery();

                    return Ok($"Usuário {usuario.Nome} criado com sucesso!");
                }
                catch (NpgsqlException ex)
                {
                    return BadRequest($"Erro: {ex.Message}");
                }
            }
        }

        // Ler Usuário pelo nome
        [HttpGet("buscar/{nome}")]
        public IActionResult LerUser(string nome)
        {
            string query = "SELECT id_usuario, nome_usuario, password, ramal, especialidade FROM usuarios WHERE nome_usuario = @nome";
            var usuarios = new List<Usuario>();

            using (NpgsqlConnection con = new(_connectionString))
            {
                try
                {
                    con.Open();
                    using NpgsqlCommand cmd = new(query, con);
                    cmd.Parameters.AddWithValue("nome", nome);
                    using NpgsqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        usuarios.Add(new Usuario
                        {
                            Id = reader.GetInt32(0),
                            Nome = reader.GetString(1),
                            Password = reader.GetString(2),
                            Ramal = reader.GetInt32(3),
                            Especialidade = reader.GetString(4)
                        });
                    }

                    return usuarios.Count > 0 ? Ok(usuarios) : NotFound("Usuário não encontrado.");
                }
                catch (NpgsqlException ex)
                {
                    return BadRequest($"Erro: {ex.Message}");
                }
            }
        }

        // Atualizar Usuário
        [HttpPut("atualizar/{id}")]
        public IActionResult AtualizarUser(int id, [FromBody] Usuario usuario)
        {
            string query = "UPDATE usuarios SET nome_usuario = @nome, password = @password, ramal = @ramal, especialidade = @especialidade WHERE id_usuario = @id";

            using (NpgsqlConnection con = new(_connectionString))
            {
                try
                {
                    con.Open();
                    using NpgsqlCommand cmd = new(query, con);
                    cmd.Parameters.AddWithValue("id", id);
                    cmd.Parameters.AddWithValue("nome", usuario.Nome);
                    cmd.Parameters.AddWithValue("password", usuario.Password);
                    cmd.Parameters.AddWithValue("ramal", usuario.Ramal);
                    cmd.Parameters.AddWithValue("especialidade", usuario.Especialidade);
                    int rows = cmd.ExecuteNonQuery();

                    return rows > 0 ? Ok("Usuário atualizado com sucesso!") : NotFound("Usuário não encontrado.");
                }
                catch (NpgsqlException ex)
                {
                    return BadRequest($"Erro: {ex.Message}");
                }
            }
        }

        // Deletar Usuário pelo ID
        [HttpDelete("deletar/{id}")]
        public IActionResult DeleteUser(int id)
        {
            string query = "DELETE FROM usuarios WHERE id_usuario = @id";

            using (NpgsqlConnection con = new(_connectionString))
            {
                try
                {
                    con.Open();
                    using NpgsqlCommand cmd = new(query, con);
                    cmd.Parameters.AddWithValue("id", id);
                    int rows = cmd.ExecuteNonQuery();

                    return rows > 0 ? Ok("Usuário deletado com sucesso!") : NotFound("Usuário não encontrado.");
                }
                catch (NpgsqlException ex)
                {
                    return BadRequest($"Erro: {ex.Message}");
                }
            }
        }
    }

    // Modelo de usuário para receber os dados do Swagger
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; } = "";
        public string Password { get; set; } = "";
        public int Ramal { get; set; }
        public string Especialidade { get; set; } = "";
    }
}
