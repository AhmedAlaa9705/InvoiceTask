using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InvoiceTask.Infrastructuer.Migrations
{
    public partial class addTotal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Total",
                table: "Invoices",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Total",
                table: "Invoices");
        }
    }
}
