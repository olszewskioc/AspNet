using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
    }
    public class CourseUpdateDTO
    {
        public int CourseId { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}