using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using School.DTOs;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using School.Models;
using School.Services;

namespace School.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public IActionResult Login([FromBody] LoginDTO loginDTO)
        {
            if (string.IsNullOrWhiteSpace(loginDTO.Username)) return BadRequest(new { message = "Username is invalid!" });
            if (string.IsNullOrWhiteSpace(loginDTO.Password)) return BadRequest(new { message = "Password is invalid!" });

            var users = new List<User>
            {
                new User { Username = "admin", Password = "ols", UserRole = "Manager"},
                new User { Username = "func", Password = "123", UserRole = "Employee"}
            };

            var user = users.FirstOrDefault(x => x.Username == loginDTO.Username);
            if (user == null) return BadRequest(new { message = "User not exists!" });

            if (!user.Password.Equals(loginDTO.Password)) return Unauthorized( new { message = "Wrong password!" });
            
            var token = TokenService.GenerateToken(user);

            return Ok(new { message = $"Success in login for: {user.Username}", token = token });
        }
    }
}