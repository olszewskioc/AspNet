using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExampleAspNetCore.Models
{
    [Table("usuarios")]
    public class Usuario
    {
        [Column("id_usuario")]
        [Key]
        [Required]
        public int UserId { get; set; }

        [Column("nome_usuario")]
        public string Nome { get; set; } = string.Empty;

        [Column("password")]
        public string Password { get; set; } = string.Empty;

        [Column("ramal")]
        public int Ramal { get; set; }

        [Column("especialidade")]
        public string Especialidade { get; set; } = string.Empty;
    }
}