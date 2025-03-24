using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Exemplo_2_Endpoint.Models;
using Microsoft.AspNetCore.Mvc; // <--- Add this line to use HTTP protocols with the ControllerBase

namespace Exemplo_2_Endpoint.Controllers
{
    // Anotation to indicate that this class is a controller and references the endpoints
    [ApiController]
    // Anotation to define the route for this controller
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private static List<User> users = new List<User>()
        {
            new User() { Id = 1, Name = "Thiago", Email = "thiago@gmail.com" },
            new User() { Id = 2, Name = "João", Email = "joao@gmail.com" },
            new User() { Id = 3, Name = "Maria", Email = "maria@gmail.com" },
        };

        // Annotation to indicate that this method is an endpoint and an HTTP requisition

        [HttpGet]
        public IEnumerable<User> Get() => users;

        [HttpPost]
        public User Post([FromBody] User user)
        {
            users.Add(user);
            return user;
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User user)
        {
            try
            {
                var existUser = users.FirstOrDefault(x => x.Id == id) ?? throw new Exception("Cannot find this User to update");

                existUser.Email = user.Email;
                existUser.Name = user.Name;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            try
            {
                var user = users.FirstOrDefault(x => x.Id == id) ?? throw new Exception("Cannot find the user to delete.");

                users.Remove(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR: {ex.Message}");
            }
        }
    }
}