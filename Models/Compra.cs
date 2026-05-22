using System.ComponentModel.DataAnnotations;
namespace MyM_inStock.Models
{
    public class Compra
    {
        [Key]
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Iva { get; set; }
        public decimal Total { get; set; }
        //Relaciones
        public int UsuarioId { get; set; }
        public int ProveedorId { get; set; }
        public virtual Proveedor Proveedor { get; set; }
        public virtual Usuario Usuario { get; set; }
        public virtual List<DetalleCompra> Detalles { get; set; }
    }
}
