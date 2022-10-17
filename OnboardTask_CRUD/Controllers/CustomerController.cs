using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

using System.Linq;
using OnboardTask_CRUD.Models;

namespace OnboardTask_CRUD.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   
    public class CustomerController : ControllerBase
    {
        private readonly ItemsDBContext _context;

        public CustomerController(ItemsDBContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(Guid id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

       
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(Guid id, Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Customers.Add(customer);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
                   // return customer;
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
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            try
            {
                _context.Customers.Remove(customer);
                await _context.SaveChangesAsync();
                return StatusCode(200,"Deleted Successfully");
            }
            catch (Exception E)
            {
                return StatusCode(500, "Admin is working on it at action level!");
            }
            

            return NoContent();
        }

        private bool CustomerExists(Guid id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }
    }
}

