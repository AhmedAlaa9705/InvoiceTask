using InvoiceTask.Application.Interfaces;
using InvoiceTask.Domain;
using InvoiceTask.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace InvoiceTask.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        public IGenericRepository<Item> _itemRepo;
        public IGenericRepository<ItemType> _itemTypeRepo;

        public HomeController(ILogger<HomeController> logger, IGenericRepository<Item> itemRepo, IGenericRepository<ItemType> itemTypeRepo)
        {
            _logger = logger;
            _itemRepo = itemRepo;
            _itemTypeRepo = itemTypeRepo;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Invoice()
        {
            var invoicees = new BuyInvoice
            {
                ItemTypes = _itemTypeRepo.GetAll()


            };
            return View(invoicees);
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

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
