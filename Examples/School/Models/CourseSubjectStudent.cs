using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace School.Models
{
    [Table("courses_subjects_students")]
    public class CourseSubjectStudent
    {
        [Column("student_id")]
        [Required]
        [ForeignKey(nameof(Student))]
        public int StudentId { get; set; }

        [Column("course_id")]
        [Required]
        [ForeignKey(nameof(Course))]
        public int CourseId { get; set; }

        [Column("subject_id")]
        [Required]
        [ForeignKey(nameof(Subject))]
        public int SubjectId { get; set; }

        //Navigation
        public Student? Student { get; set; }
        public Course? Course { get; set; }
        public Subject? Subject { get; set; }
    }
}