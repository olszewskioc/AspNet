using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using School.Models;

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
        public Course? Course { get; set; }
    }
    public class StudentUpdateDTO
    {
        public string? StudentName { get; set; }
        public int? CourseId { get; set; } 
    }
}