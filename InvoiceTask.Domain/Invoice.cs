using System;
using System.Collections.Generic;
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

        public int? SupplierId { get; set; }
        [ForeignKey("SupplierId")]
        public Supplier Supplier { get; set; }



        public DateTime InvoiceDate { get; set; }

    }
}
