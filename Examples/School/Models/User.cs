using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace School.Models
{
    [Table("users")]
    public class User
    {
        [Column("user_id")]
        [Key]
        [Required]
        public int UserId { get; set; }

        [Column("username")]
        [Required]
        [StringLength(50)]
        public string Username { get; set;} = string.Empty;

        [Column("password")]
        [Required]
        public string Password { get; set; } = string.Empty;

        [Column("user_role")]
        [Required]
        public string UserRole { get; set; } = string.Empty;
    }
}