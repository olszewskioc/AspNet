using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;


namespace InitiExample
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var Builder = WebApplication.CreateBuilder(args);
            var app = Builder.Build();

            app.UseStaticFiles();
            app.UseRouting();

            // Definir as rotas
            app.UseEndpoints(endpoints => {
                endpoints.MapGet("/", async context => {
                    context.Response.Redirect("/index.html");
                });
            });

            app.Run();
        }

    }
}
