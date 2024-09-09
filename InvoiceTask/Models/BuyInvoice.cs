using InvoiceTask.Domain;
using System.ComponentModel.DataAnnotations;

namespace InvoiceTask.Models
{
    public class BuyInvoice
    {
        public int Id { get; set; }

        public string ClientName { get; set; }
        public DateTime InvoiceDate { get; set; }
    
        public decimal Price { get; set; }
     
        public int quantity { get; set; }
        public int? ItemId { get; set; }
        public int? ItemTypeId { get; set; }

    }
}
