
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using OnboardTask_CRUD.Models;
using System.Reflection.Metadata;
using Microsoft.Data.SqlClient;
using System.Linq.Expressions;

namespace OnboardTask_CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly ItemsDBContext _context;

        public StoreController(ItemsDBContext context)

        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> GetStore()
        {
            return await _context.Store.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Store>> GetStore(Guid id)
        {
            var store = await _context.Store.FindAsync(id);

            if (store == null)
            {
                return NotFound();
            }

            return store;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore(Guid id, Store store)
        {
            if (id != store.Id)
            {
                return BadRequest();
            }

            _context.Entry(store).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetStore", new { id = store.Id }, store);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreExists(id))
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
        public async Task<ActionResult<Store>> PostStore(Store store)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Store.Add(store);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction("GetStore", new { id = store.Id }, store);
                    //return store
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
        public async Task<IActionResult> DeleteStore(Guid id)
        {
            var store = await _context.Store.FindAsync(id);
            if (store == null)
            {
                return NotFound();
            }
            try
            {
                _context.Store.Remove(store);
                await _context.SaveChangesAsync();
                return StatusCode(200, "Deleted Successfully");
            }
           
            catch (Exception ex) 
            {
               
               
                 return StatusCode(500, "Admin is working on it at action level!");
            }

           

            return NoContent();
        }

        private bool StoreExists(Guid id)
        {
            return _context.Store.Any(e => e.Id == id);
        }
    }
}
