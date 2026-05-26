using System.ComponentModel.DataAnnotations;
namespace MyM_inStock.Models
{
    public class DetalleCompra
    {
        [Key]
        public int Id { get; set; }
        public int CompraId { get; set; }
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioCompra { get; set; }
        public decimal Subtotal { get; set; }
        //Relaciones
        public virtual Compra Compra { get; set; }
        public virtual Producto Producto { get; set; }
    }
}
