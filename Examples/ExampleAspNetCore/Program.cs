using ExampleAspNetCore.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Minha API", Version = "v1" });
});

builder.Services.AddControllers();

Console.WriteLine($"{builder.Configuration.GetConnectionString("PostgresConnection")}");


builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection"))
                .EnableSensitiveDataLogging() // Adiciona mais detalhes ao log
                .LogTo(Console.WriteLine, LogLevel.Information)); // Exibe logs no console


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
                c.RoutePrefix = "swagger"; // Define Swagger na raiz "/"
            });
}

app.UseDefaultFiles();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();

