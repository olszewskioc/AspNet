using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School.DTOs
{
    public class CourseSubjectStudentCreateDTO
    {
        public int CourseId { get; set; }
        public int SubjectId { get; set; }
        public int StudentId { get; set;}
    }
    public class CourseSubjectStudentReadDTO
    {
        public int CourseId { get; set; }
        public int SubjectId { get; set; }
        public int StudentId { get; set;}
    }
    public class CourseSubjectStudentUpdateDTO
    {
        public int? CourseId { get; set; }
        public int? SubjectId { get; set; }
        public int? StudentId { get; set;}
    }
}