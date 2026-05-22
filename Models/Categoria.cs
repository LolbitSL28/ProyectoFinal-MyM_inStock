using System.ComponentModel.DataAnnotations;    
namespace MyM_inStock.Models
{
    public class Categoria
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        
        public string Descripcion { get; set; }

        //Relaciones
        public virtual List<Producto> Productos { get; set; }

    }
}
