
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using OnboardTask_CRUD.Models;
using Microsoft.CodeAnalysis;
using static System.Formats.Asn1.AsnWriter;

namespace OnboardTask_CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ItemsDBContext _context;

        public SalesController(ItemsDBContext context)

        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalesEntities>>> GetSales()
        {
            var model = _context.Sales.Select(x => new SalesEntities()
            {
                CustomerId = x.customer.Id,
                CustomerName = x.customer.Name,
                ProductId = x.product.Id,
                ProductName = x.product.Name,
                StoreId = x.store.Id,
                StoreName = x.store.Name,
                SalesId = x.Id,
                SalesDateSold = x.DateSold.ToString("dd MMM yyyy")


            }).AsNoTracking().ToListAsync();

            return await model;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SalesEntities>> GetSale(Guid id)
        {
            

            var episodes  = (from sal in _context.Sales
                                           join customers in _context.Customers on sal.CustomerId equals customers.Id
                                           join products in _context.Products on sal.ProductId equals products.Id
                                           join store in _context.Store on sal.StoreId equals store.Id
                                           where sal.Id == id
                                           select new SalesEntities
                                           {

                                               CustomerId = sal.customer.Id,
                                               CustomerName = sal.customer.Name,
                                               ProductId = sal.product.Id,
                                               ProductName = sal.product.Name,
                                               StoreId = sal.store.Id,
                                               StoreName = sal.store.Name,
                                               SalesId = sal.Id,
                                               SalesDateSold = sal.DateSold.ToString("dd MMM yyyy")

                                           }).AsNoTracking().FirstOrDefaultAsync();


           

            if (episodes == null)
            {
                return NotFound();
            }

            return await episodes;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(Guid id, Sales sale)
        {
            if (id != sale.Id)
            {
                return BadRequest();
            }

            _context.Entry(sale).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetSale", new { id = sale.Id }, sale);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<SalesEntities>> PostSale(Sales sale)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Sales.Add(sale);
                    await _context.SaveChangesAsync();


                    var episodes = await (from sal in _context.Sales
                                    join customers in _context.Customers on sal.CustomerId equals customers.Id
                                    join products in _context.Products on sal.ProductId equals products.Id
                                    join store in _context.Store on sal.StoreId equals store.Id
                                    where sal.Id == sale.Id
                                    select new SalesEntities
                                    {
                                        CustomerId = sal.customer.Id,
                                        CustomerName = sal.customer.Name,
                                        ProductId = sal.product.Id,
                                        ProductName = sal.product.Name,
                                        StoreId = sal.store.Id,
                                        StoreName = sal.store.Name,
                                        SalesId = sal.Id,
                                        SalesDateSold =sal.DateSold.ToString("dd MMM yyyy")

                                    }).AsNoTracking().FirstOrDefaultAsync();



                    return CreatedAtAction("GetSale", new { id = sale.Id }, episodes);
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception E)
            {
               
                return StatusCode(500, "Admin is working on it at action level!");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(Guid id)
        {
            var sale = await _context.Sales.FindAsync(id);
            if (sale == null)
            {
                return NotFound();
            }

            try
            {
                _context.Sales.Remove(sale);
                await _context.SaveChangesAsync();
                return StatusCode(200, "Deleted Successfully");
            }

            catch (Exception ex)
            {


                return StatusCode(500, "Admin is working on it at action level!");
            }



            return NoContent();
        }

        private bool SaleExists(Guid id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }

        public class SalesEntities
        {
            public string CustomerName { get; set; }
            public string ProductName { get; set; }
            public string StoreName { get; set; }
            public Guid SalesId { get; set; }
            public string SalesDateSold { get; set; }
            public Guid CustomerId { get; set; }
            public Guid ProductId { get; set; }
            public Guid StoreId { get; set; }
        }
    }
}
