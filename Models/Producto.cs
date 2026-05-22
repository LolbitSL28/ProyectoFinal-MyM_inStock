using System.ComponentModel.DataAnnotations;

namespace MyM_inStock.Models
{
    public class Producto
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        public string Marca { get; set; }

        public int Stock { get; set; }
        public decimal PrecioVenta { get; set; }
        
        public decimal PrecioCompra { get; set; }


        //Relaciones
        public int CategoriaId { get; set; }
        public virtual Categoria Categoria { get; set; }
        public int ProveedorId { get; set; }
        public virtual Proveedor Proveedor { get; set; }

        public virtual List<DetalleVenta> DetallesVenta { get; set; }

    }
}
