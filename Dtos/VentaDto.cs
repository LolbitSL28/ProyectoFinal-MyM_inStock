using System.ComponentModel.DataAnnotations;

namespace MyM_inStock.Dtos
{
    public class VentaDetalleGetDto
    {
        public int Id { get; set; }
        public int ProductoId { get; set; }
        public string ProductoNombre { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioVenta { get; set; }
        public decimal Subtotal { get; set; }
    }

    public class VentaGetDto
    {

        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Iva { get; set; }
        public decimal Total { get; set; }
        public int UsuarioId { get; set; }
        public string UsuarioNombre { get; set; }
        public List<VentaDetalleGetDto> Detalles { get; set; }
    }

    public class VentaDetallePostDto
    {
        [Required]
        public int ProductoId { get; set; }
        [Required]
        public int Cantidad { get; set; }
    }

    public class VentaPostDto
    {
        [Required]
        public int UsuarioId { get; set; }
        [Required]
        public List<VentaDetallePostDto> Detalles { get; set; }
    }
}
