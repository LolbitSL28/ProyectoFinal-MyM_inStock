using System.ComponentModel.DataAnnotations;

namespace MyM_inStock.Dtos
{
    public class CompraDetalleGetDto
    {
        public int Id { get; set; }
        public int ProductoId { get; set; }
        public string ProductoNombre { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioCompra { get; set; }
        public decimal Subtotal { get; set; }
    }

    public class CompraGetDto
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Iva { get; set; }
        public decimal Total { get; set; }
        public int UsuarioId { get; set; }
        public string UsuarioNombre { get; set; }
        public int ProveedorId { get; set; }
        public string ProveedorNombre { get; set; }
        public List<CompraDetalleGetDto> Detalles { get; set; }
    }

    public class CompraDetallePostDto
    {
        [Required]
        public int ProductoId { get; set; }
        [Required]
        public int Cantidad { get; set; }
        [Required]
        public decimal PrecioCompra { get; set; }
    }

    public class CompraPostDto
    {
        [Required]
        public int UsuarioId { get; set; }
        [Required]
        public int ProveedorId { get; set; }
        [Required]
        public List<CompraDetallePostDto> Detalles { get; set; }
    }
}