using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.Annotations;
using Entity_AspNet.Controllers;
using Entity_AspNet.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;

namespace Entity_AspNet
{
    public class Executar
    {
        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var connectionString = builder.Configuration.GetConnectionString("PostgresConnection");

            builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(connectionString)
                .EnableSensitiveDataLogging() // Adiciona mais detalhes ao log
                .LogTo(Console.WriteLine, LogLevel.Information)); // Exibe logs no console

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
                c.RoutePrefix = "swagger"; // Define Swagger na raiz "/"
            });

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.MapControllers();

            app.Run();
        }
    }
}