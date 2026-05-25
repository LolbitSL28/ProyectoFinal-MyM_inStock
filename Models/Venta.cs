using System.ComponentModel.DataAnnotations;
namespace MyM_inStock.Models
{
    public class Venta
    {
       [Key]
       public int Id { get; set; }
        public DateTime Fecha { get; set; }

        public decimal Subtotal { get; set; }

        public decimal Iva { get; set; }

        public decimal Total { get; set; }
        //Relaciones
        public int UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }
        public virtual List<DetalleVenta> Detalles { get; set; }
    }
}
