using PontosTuristicosAPI.Repositories;
using PontosTuristicosAPI.Services;
using Microsoft.Data.Sqlite;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Ensure database directory exists
var databasePath = Path.Combine(Directory.GetCurrentDirectory(), "PontoTuristico.db");
if (!File.Exists(databasePath))
{
    using (var connection = new SqliteConnection($"Data Source={databasePath}"))
    {
        connection.Open();
        var createScript = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Database", "CreateDatabase.sql"));
        using (var command = connection.CreateCommand())
        {
            command.CommandText = createScript;
            command.ExecuteNonQuery();
            
            // Execute seed data script
            var seedScript = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Database", "SeedData.sql"));
            command.CommandText = seedScript;
            command.ExecuteNonQuery();
        }
    }
}
builder.Services.AddControllers();
builder.Services.AddScoped<IPontoTuristicoRepository, PontoTuristicoRepository>();
builder.Services.AddScoped<IPontoTuristicoService, PontoTuristicoService>();
 builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
 
app.UseAuthorization();

app.MapControllers();

app.Run();
