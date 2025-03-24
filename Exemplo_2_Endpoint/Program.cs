using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.Annotations;
using Exemplo_2_Endpoint.Controllers;


namespace Exemplo_2_Endpoint
{
    public class Program
    {
        // Create the run with swagger
        static void Main(string[] args)
        {
            // Initializing application
            var builder = WebApplication.CreateBuilder(args);
            
            // Add services from the controller to the app
            builder.Services.AddControllers(); 

            // Swagger to document the API
            builder.Services.AddEndpointsApiExplorer(); // Add API explorer

            builder.Services.AddSwaggerGen();   // Swagger to document the API

            var app = builder.Build();

            app.UseSwagger();   // Swagger to document the API
            app.UseSwaggerUI(); // Swagger to document the API

            app.UseHttpsRedirection();  // HTTPS Redirection

            app.UseAuthorization(); // Authorization

            app.MapControllers();   // Map the controllers to the app
        
            app.Run();
            // The route for the Swagger is /swagger
        }
    }
}