using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnboardTask_CRUD.Models
{
    public class Store
    {
        #region properties
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; } 
        #endregion
       
        #region navigationproperties
        public virtual ICollection<Sales> sales { get; set; } 
        #endregion
    }
}
