using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace School.Models
{
    [Table("subjects")]
    public class Subject
    {
        [Column("subject_id")]
        [Key]
        [Required]
        public int SubjectId { get; set;}

        [Column("description")]
        [Required]
        public string Description { get; set; } = string.Empty;

        //Navigation
        public ICollection<CourseSubjectStudent> CourseSubjects { get; set;} = [];

    }
}