using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceTask.Domain
{
    public class Item
    {
        public int Id { get; set; }
        [Required]
        public string  ItemName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int ItemTypeId { get; set; }
        [ForeignKey("ItemTypeId")]
        public ItemType ItemType { get; set; }
    }
}
