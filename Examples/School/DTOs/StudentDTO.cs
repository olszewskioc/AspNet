using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School.DTOs
{
    public class StudentCreateDTO
    {
        public string StudentName { get; set; } = string.Empty;
        public int CourseId { get; set; } 
    }
    public class StudentReadDTO
    {
        public int StudentId { get; set;}
        public string StudentName { get; set; } = string.Empty;
        public int CourseId { get; set; } 
    }
    public class StudentUpdateDTO
    {
        public int StudentId { get; set;}
        public string StudentName { get; set; } = string.Empty;
        public int CourseId { get; set; } 
    }
}