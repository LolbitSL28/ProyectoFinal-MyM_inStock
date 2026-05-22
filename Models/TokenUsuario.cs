namespace MyM_inStock.Models
{
    public class TokenUsuario
    {
        public int Id { get; set; }
        public string Token { get; set; }

        public DateTime FechaCreado { get; set; }

        public DateTime FechaVencimiento { get; set; }

        //Relacion con usuario
        public int UsuarioId { get; set; }

        public virtual Usuario Usuario { get; set; }
    }
}
