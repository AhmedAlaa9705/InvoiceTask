using InvoiceTask.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceTask.Infrastructuer.Data
{
    public class DataDbContext : DbContext
    {
        public DataDbContext(DbContextOptions<DataDbContext> options) : base(options)
        {

        }

        public DbSet<Item> Items { get; set; }
        public DbSet<ItemType> ItemTypes { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // for the other conventions, we do a metadata model loop
                    

         

        }





    }
}
