using Microsoft.EntityFrameworkCore;
using ExampleAspNetCore.Models;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace ExampleAspNetCore.Data
{
    public class AppDbContext : DbContext   // Herda a classe principal do Entity Framework
    {
        public DbSet<Usuario> Usuarios { get; set; }    // Define o DbSet para o modelo Usuario (tabela)
        public DbSet<Maquina> Maquinas { get; set; }    // Define o DbSet para o modelo Maquina (tabela)
        public DbSet<Software> Softwares { get; set; }    // Define o DbSet para o modelo Software (tabela)
        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // // Configurações do banco de dados
        // {
        //     var config = new ConfigurationBuilder()
        //         .SetBasePath(Directory.GetCurrentDirectory())
        //         .AddJsonFile("appsettings.json")
        //         .Build();

        //     optionsBuilder.UseNpgsql(config.GetConnectionString("PostgresConnection"));
        // }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

        // Método para configurar o mapeamento de entidades(tabelas)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>().ToTable("usuarios"); // Mapeia a tabela usuários
            // Garante que a tabela usuarios vai ser usada para a tabela usuarios do banco de dados
            modelBuilder.Entity<Maquina>().ToTable("maquina"); 
            modelBuilder.Entity<Software>().ToTable("software");
        }
    }
}