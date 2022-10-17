

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnboardTask_CRUD.Models
{
    public  class ItemsDBContext : DbContext
    {
      


        public ItemsDBContext(DbContextOptions options) : base(options)
        {

        }

        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Product> Products { get; set; }

        public virtual DbSet<Store> Store { get; set; }
        public virtual DbSet<Sales> Sales { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(c => c.Name).HasMaxLength(50);
                entity.Property(c => c.Address).HasMaxLength(500);
                 
            });
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(p => p.Name).HasMaxLength(50);
                entity.Property(p => p.Price).HasMaxLength(50);
                    
            });
            modelBuilder.Entity<Store>(entity =>
            {
                entity.Property(st => st.Name).HasMaxLength(50);
                entity.Property(st => st.Address).HasMaxLength(500);
                

            });
            modelBuilder.Entity<Sales>(entity =>
            {
                entity.Property(s => s.DateSold).HasColumnType("Date");
                entity.HasOne(s => s.customer).WithMany(s => s.sales).OnDelete(DeleteBehavior.ClientSetNull);
                entity.HasOne(s => s.product).WithMany(s => s.sales).OnDelete(DeleteBehavior.ClientSetNull);
                entity.HasOne(s => s.store).WithMany(s => s.sales).OnDelete(DeleteBehavior.ClientSetNull);
                
            });

           
        }
    }
}
