using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School.DTOs
{
    public class SubjectCreateDTO
    {
        public string Description { get; set; } = string.Empty;
    }
    public class SubjectReadDTO
    {
        public int SubjectId { get; set; }
        public string Description { get; set; } = string.Empty;
    }
    public class SubjectUpdateDTO
    {
        public int SubjectId { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}