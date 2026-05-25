using System.ComponentModel.DataAnnotations;

namespace MyM_inStock.Dtos
{
    public class ProveedorGetDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Telefono { get; set; }
        public string Direccion { get; set; }
    }

    public class ProveedorPostDto
    {
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Telefono { get; set; }
        [Required]
        public string Direccion { get; set; }
    }

    public class ProveedorPutDto
    {
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Telefono { get; set; }
        [Required]
        public string Direccion { get; set; }

    }
}