using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School.DTOs
{
    public class UserCreateDTO
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string UserRole { get; set; } = string.Empty;
    }
    public class UserReadDTO
    {
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string UserRole { get; set; } = string.Empty;
    }
    public class UserUpdateDTO
    {
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string UserRole { get; set; } = string.Empty;
    }
    public class LoginDTO
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}