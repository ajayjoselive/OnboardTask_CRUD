using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnboardTask_CRUD.Models
{
    public class Sales
    {
        #region properties

        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid Id { get; set; }

        public Guid ProductId { get; set; }
        [Required]
        public Guid CustomerId { get; set; }

        public Guid StoreId { get; set; }

        public DateTime DateSold { get; set; }
        #endregion

        #region navigationproperties
        [ForeignKey("CustomerId")]
        public virtual Customer customer { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product product { get; set; }

        [ForeignKey("StoreId")]
        public virtual Store store { get; set; } 
        #endregion
    }
}
