using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace MyM_inStock.Models
{
    [Index(nameof(Username), IsUnique = true)]
    public class Usuario 
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public bool Habilitado { get; set; }

        //Relaciones
        public virtual List<Venta> Ventas { get; set; }
        public virtual List<TokenUsuario> Tokens { get; set; }
        public virtual List<Compra> Compra { get; set; }
    }
}
