using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InvoiceTask.Infrastructuer.Migrations
{
    public partial class addpriceandquantity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Invoices",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "quantity",
                table: "Invoices",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "quantity",
                table: "Invoices");
        }
    }
}
