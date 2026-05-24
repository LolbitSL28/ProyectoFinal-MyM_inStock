using Microsoft.AspNetCore.Mvc;
using MyM_inStock.Data;
using MyM_inStock.Models;
using MyM_inStock.Dtos;

namespace MyM_inStock.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _contexto;

        public UsuariosController(AppDbContext contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public List<UsuarioGetDto> GetUsuarios()
        {
            return _contexto.Usuarios.ToList().GetDtos();
        }


        [HttpGet("{id}")]
        public UsuarioGetDto? GetUsuario(int id)
        {
            var usuario = _contexto.Usuarios.FirstOrDefault(x => x.Id == id);
            return usuario.GetDtos();
        }
        [HttpPost]
        public UsuarioPostDto AddUsuario(UsuarioPostDto usuario)
        {

            var usr = usuario.PostDto(_contexto);

            _contexto.Usuarios.Add(usr);
            _contexto.SaveChanges();

            return usuario;
        }


        [HttpDelete]
        public bool DeleteUsuario(int id)
        {
            var usuario = _contexto.Usuarios.FirstOrDefault(x => x.Id == id);
            _contexto.Usuarios.Remove(usuario);
            _contexto.SaveChanges();
            return true;
        }
        [HttpPut("{id}")]
        public UsuarioPutDto UpdateUsuario(int id,UsuarioPutDto usuario)
        {
            var usuarioUpdate = _contexto.Usuarios.FirstOrDefault(x => x.Id == usuario.Id);
            usuario.UpdateDto(usuarioUpdate, _contexto);

            _contexto.SaveChanges();
            
            return usuario;
        }

        [HttpPatch]
        public bool DisabledUsuario(int id)
        {
            var usuario = _contexto.Usuarios.FirstOrDefault(x => x.Id == id);
            usuario.Habilitado = false;
            _contexto.SaveChanges();
            return true;
        }
    }
}
