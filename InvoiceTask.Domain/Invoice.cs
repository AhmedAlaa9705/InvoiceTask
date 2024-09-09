using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceTask.Domain
{
    public class Invoice
    {
        public int Id { get; set; }

        public int? ItemId { get; set; }

        [ForeignKey("ItemId")]
        public Item Item { get; set; }

        public int? ItemTypeId { get; set; }

        [ForeignKey("ItemTypeId")]
        public ItemType ItemType { get; set; }
        [Required]
        public string ClientName { get; set; }
        [Required]
        public DateTime InvoiceDate { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int quantity { get; set; }
        public decimal? Total { get; set; }

    }
}
