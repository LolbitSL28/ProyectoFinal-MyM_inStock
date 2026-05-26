using System.Text;
using Microsoft.AspNetCore.Mvc;
using MyM_inStock.Data;
using MyM_inStock.Dtos;
using MyM_inStock.Models;

namespace MyM_inStock.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _contexto;

        public AuthController(AppDbContext contexto)
        {
            _contexto = contexto;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto login)
        {
            var usuario = _contexto.Usuarios
                .FirstOrDefault(x => x.Username == login.Username);

            if (usuario == null)
            {
                return Unauthorized(new { mensaje = "Usuario o contraseña incorrectos" });
            }

            if (usuario.Password != login.Password)
            {
                return Unauthorized(new { mensaje = "Usuario o contraseña incorrectos" });
            }

            if (!usuario.Habilitado)
            {
                return Unauthorized(new { mensaje = "Usuario deshabilitado." });
            }

            var token = GenerarToken(usuario);

            return Ok(new
            {
                user = new
                {
                    usuario.Id,
                    usuario.Nombre,
                    usuario.ApellidoPaterno,
                    usuario.ApellidoMaterno,
                    usuario.Username,
                    usuario.Habilitado
                },
                token = token
            });
        }

        private string GenerarToken(Usuario usuario)
        {
            var tokenData = $"{usuario.Id}|{usuario.Username}|{DateTime.UtcNow.Ticks}";
            var tokenBytes = Encoding.UTF8.GetBytes(tokenData);
            return Convert.ToBase64String(tokenBytes);
        }
    }
}
