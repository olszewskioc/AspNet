using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace School.Models
{
    [Table("students")]
    public class Student
    {
        [Column("student_id")]
        [Key]
        [Required]
        public int StudentId { get; set;}

        [Column("course_id")]
        [Required]
        [ForeignKey(nameof(Course))]
        public int CourseId { get; set;}

        [Column("student_name")]
        [Required]
        public string StudentName { get; set;} = string.Empty;

        //Navigation
        public Course? Course { get; set;}
        public ICollection<CourseSubjectStudent> CourseSubjects { get; set;} = [];
    }
}