using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using School.Models;

namespace School.DTOs
{
    public class CourseCreateDTO
    {
        public string Description { get; set; } = string.Empty;
    }
    public class CourseReadDTO
    {
        public int CourseId { get; set; }
        public string Description { get; set; } = string.Empty;
        public ICollection<Student>? Students { get; set; }
    }
    public class CourseUpdateDTO
    {
        public string Description { get; set; } = string.Empty;
    }
}