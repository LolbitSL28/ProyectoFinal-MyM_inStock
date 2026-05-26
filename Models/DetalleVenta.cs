using System.ComponentModel.DataAnnotations;    
namespace MyM_inStock.Models
{
    public class DetalleVenta
    {
        [Key]
        public int Id { get; set; }
        public int VentaId { get; set; }
        public int ProductoId { get; set; }

        public int Cantidad { get; set; }
        public decimal PrecioVenta { get; set; }

        public decimal Subtotal { get; set; }

        //Relaciones
        public virtual Venta Venta { get; set; }
        public virtual Producto Producto { get; set; }
    }
}
