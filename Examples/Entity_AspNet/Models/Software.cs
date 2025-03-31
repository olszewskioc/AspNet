using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity_AspNet.Models
{
    [Table("software")]
    public class Software
    {
        [Column("id_software")]
        [Key]
        [Required]
        public int SoftwareId { get; set;}

        [Column("produto")]
        public string Produto { get; set;} = string.Empty;

        [Column("harddisk")]
        public int HardDisk { get; set; } 

        [Column("memoria_ram")]
        public int MemoriaRam { get; set; } 

        [Column("fk_maquina")]
        [ForeignKey(nameof(Maquina))]
        public int MaquinaId { get; set; }

        public Maquina? Maquina { get; init; } = null;
    }
}