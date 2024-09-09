using InvoiceTask.Application.Interfaces;
using InvoiceTask.Domain;
using InvoiceTask.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Diagnostics;

namespace InvoiceTask.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        public IGenericRepository<Item> _itemRepo;
        public IGenericRepository<ItemType> _itemTypeRepo;
        public IGenericRepository<Invoice> _invoiceRepo;
        private SelectList listItems;

        public HomeController(ILogger<HomeController> logger, IGenericRepository<Item> itemRepo, IGenericRepository<ItemType> itemTypeRepo, IGenericRepository<Invoice> invoiceRepo)
        {
            _logger = logger;
            _itemRepo = itemRepo;
            _itemTypeRepo = itemTypeRepo;
            _invoiceRepo = invoiceRepo;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Invoice()
        {
           
            return View();
        }


        public IActionResult GetItemsType()
        {
            var itemsType = _itemTypeRepo.GetAll();
            return Ok(itemsType);
        }

        public IActionResult GetItems(int? id)
        {
            var items = _itemRepo.Fitler(a => a.ItemTypeId == id);
            return Ok(items);
        }

        public IActionResult GetItemPrice(int? id)
        {
            var item = _itemRepo.GetById(a => a.Id == id);
            return Ok(item);
        }

        [HttpPost]
        public IActionResult AddInvoice([FromBody]InvoiceModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Invoice invoice = new Invoice
                    {
                        Id = model.Id,
                        ItemId = model.ItemId,
                        ItemTypeId = model.ItemTypeId,
                        ClientName = model.ClientName,
                        Price = model.Price,
                        quantity = model.quantity,
                        InvoiceDate = model.InvoiceDate,
                        Total=model.Price*model.quantity
                    };
                    _invoiceRepo.Insert(invoice);
                    _invoiceRepo.save();
                }
                else
                {
                    return BadRequest();
                }
                
            }
            catch (Exception)
            {

                throw;
            }
            return Ok();
        }

        public IActionResult GetInvoices()
        {
           var invoices= _invoiceRepo.GetAll("Item", "ItemType");
           
            return Ok(invoices);
        }
        [HttpGet("/Home/GetInvoic/{name}")]
        public IActionResult GetInvoic(string? name)
        {
            var invoices = _invoiceRepo.Fitler(a=>a.ClientName.StartsWith(name), "Item", "ItemType");
            return Ok(invoices);
        }
        [HttpGet]
        public IActionResult Edit(int id)
        {
            try
            {
                if (id == 0)
                {
                    return View();
                }
                else
                {
                    GetItems();
                    GetTypesItm();
                    var invoice = _invoiceRepo.GetById(id);

                    BuyInvoice buyInvoice = new BuyInvoice
                    {
                        Id = invoice.Id,
                        ClientName = invoice.ClientName,
                        InvoiceDate = invoice.InvoiceDate,
                        Price = invoice.Price,
                        ItemId = invoice.ItemId,
                        ItemTypeId = invoice.ItemTypeId,
                        quantity = invoice.quantity
                    };
                    return View(buyInvoice);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
           
        }
        [HttpPost]
        public IActionResult Edit(BuyInvoice model)
        {
            try
            {
                var invoice = _invoiceRepo.GetById(model.Id);
                invoice.ClientName = model.ClientName;
                invoice.ItemId = model.ItemId;
                invoice.quantity = model.quantity;
                invoice.InvoiceDate = model.InvoiceDate;
                invoice.Price = model.Price;
                invoice.ItemTypeId = model.ItemTypeId;
                _invoiceRepo.save();
                return RedirectToAction("Invoice");

            }
            catch (Exception)
            {

                throw;
            }
        }

            public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private void GetItems()
        {
            var items = _itemRepo.GetAll();
            listItems = new SelectList(items, "Id", "ItemName");
            ViewBag.items = listItems;
        }

        private void GetTypesItm()
        {
            var itemtypes = _itemTypeRepo.GetAll();
            listItems = new SelectList(itemtypes, "Id", "TypeName");
            ViewBag.itemtypes = listItems;
        }
    }
}
