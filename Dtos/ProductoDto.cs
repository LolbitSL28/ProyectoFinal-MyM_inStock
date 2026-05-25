using System.ComponentModel.DataAnnotations;

namespace MyM_inStock.Dtos
{
    public class ProductoGetDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Marca { get; set; }
        public int Stock { get; set; }
        public decimal PrecioVenta { get; set; }
        public decimal PrecioCompra { get; set; }
        public int CategoriaId { get; set; }
        public string CategoriaNombre { get; set; }
        public int ProveedorId { get; set; }
        public string ProveedorNombre { get; set; }
    }

    public class ProductoPostDto
    {
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Descripcion { get; set; }
        [Required]
        public string Marca { get; set; }
        [Required]
        public int Stock { get; set; }
        [Required]
        public decimal PrecioVenta { get; set; }
        [Required]
        public decimal PrecioCompra { get; set; }
        [Required]
        public int CategoriaId { get; set; }
        [Required]
        public int ProveedorId { get; set; }
    }

    public class ProductoPutDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Descripcion { get; set; }
        [Required]
        public string Marca { get; set; }
        [Required]
        public int Stock { get; set; }
        [Required]
        public decimal PrecioVenta { get; set; }
        [Required]
        public decimal PrecioCompra { get; set; }
        [Required]
        public int CategoriaId { get; set; }
        [Required]
        public int ProveedorId { get; set; }
    }
}