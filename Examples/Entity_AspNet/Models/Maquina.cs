using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity_AspNet.Models
{
    [Table("maquina")]
    public class Maquina
    {
        [Column("id_maquina")]
        [Key]
        [Required]
        public int MaquinaId { get; set; }

        [Column("tipo")]
        public string Tipo { get; set; } = string.Empty;

        [Column("velocidade")]
        public int Velocidade { get; set; } 

        [Column("harddisk")]
        public int HardDisk { get; set; }

        [Column("placa_rede")]
        public int PlacaRede { get; set; }

        [Column("memoria_ram")]
        public int MemoriaRam { get; set; }

        [Column("fk_usuario")]
        [ForeignKey(nameof(Usuario))]
        public int UsuarioId { get; set; }

        public Usuario? Usuario { get; set; } = null;
    }
}