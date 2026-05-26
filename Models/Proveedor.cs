using System.ComponentModel.DataAnnotations;    

namespace MyM_inStock.Models
{
    public class Proveedor
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Telefono { get; set; }

        public string Direccion { get; set; }

        //Relaciones

        public virtual List<Producto> Productos { get; set; }
        public virtual List<Compra> Compras { get; set; }
    }
}
