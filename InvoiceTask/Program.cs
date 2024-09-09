using InvoiceTask.Application.Interfaces;
using InvoiceTask.Infrastructuer.Data;
using InvoiceTask.Infrastructuer.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");




// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<DataDbContext>(options =>
    options.UseSqlServer(connectionString));


builder.Services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
