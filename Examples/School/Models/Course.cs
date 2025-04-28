using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace School.Models
{
    [Table("courses")]
    public class Course
    {
        [Column("course_id")]
        [Key]
        [Required]
        public int CourseId { get; set; }

        [Column("description")]
        [Required]
        public string Description { get; set; } = string.Empty;
        
        //Navigation
        public ICollection<Student> Students { get; set; } = [];
        public ICollection<CourseSubjectStudent> CourseSubjectsStudents { get; set;} = [];

    }
}