using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Company_App_DataAPI.Models
{
    public class Branch
    {
        public Branch()
        {
            this.Employees = new List<Employee>();
        }
        public int BranchId { get; set; }
        [Required, StringLength(50)]
        public string BranchName { get; set; }
        [Required, StringLength(100)]
        public string BranchAddress { get; set; }
        [Required]
        public string BranchEmail { get; set; }
        //Navigation
        public virtual ICollection<Employee> Employees { get; set; }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        [Required, StringLength(50)]
        public string EmployeeName { get; set; }
        [Required, StringLength(20)]
        public string EmployeePhone { get; set; }
        [Required, Column(TypeName = "money")]
        public Decimal EmployeeSalary { get; set; }
        [Required, Column(TypeName = "date")]
        public System.DateTime EmployeeJoinDate { get; set; }
        //Foreign Key Set
        [Required, ForeignKey("Branches")]
        public int BranchId { get; set; }
        //Navigation
        public virtual Branch Branches { get; set; }
    }

    public class CompanyDbContext : DbContext
    {
        public CompanyDbContext(DbContextOptions<CompanyDbContext> options) : base(options) { }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Employee> Employees { get; set; }
    }
}
