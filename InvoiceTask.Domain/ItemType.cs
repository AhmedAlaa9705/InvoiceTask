using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceTask.Domain
{
    public class ItemType
    {
        public int Id { get; set; }
        [Required]
        public string TypeName { get; set; }         
    }
}
