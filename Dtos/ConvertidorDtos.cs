using MyM_inStock.Data;
using MyM_inStock.Models;
namespace MyM_inStock.Dtos
{
    public static class ConvertidorDtos
    {
        //USUARIOS
        public static UsuarioGetDto GetDtos(this Usuario usuario)
        {
            return new UsuarioGetDto
            {
                Nombre = usuario.Nombre,
                ApellidoPaterno = usuario.ApellidoPaterno,
                ApellidoMaterno = usuario.ApellidoMaterno,
                Username = usuario.Username,
            };
        }

        public static List<UsuarioGetDto> GetDtos(this List<Usuario> usuarios)
        {
            List<UsuarioGetDto> lista = new List<UsuarioGetDto>();
            foreach (var usuario in usuarios)
            {
                lista.Add(new UsuarioGetDto
                {

                    Nombre = usuario.Nombre,
                    ApellidoPaterno = usuario.ApellidoPaterno,
                    ApellidoMaterno = usuario.ApellidoMaterno,
                    Username = usuario.Username,
                });

            }
            return lista;
        }
        public static Usuario PostDto(this UsuarioPostDto usuario, AppDbContext contexto)
        {
            var uniqueUsername = contexto.Usuarios.FirstOrDefault(x => x.Username == usuario.Username);

            if (uniqueUsername != null)
            {
                throw new Exception("El nombre de usuario ya existe");
            }

            return new Usuario
            {
                Nombre = usuario.Nombre,    
                ApellidoPaterno = usuario.ApellidoPaterno,
                ApellidoMaterno = usuario.ApellidoMaterno,
                Username = usuario.Username,
                Password = usuario.Password,
                Habilitado = true
            };
        }

        public static void UpdateDto(this UsuarioPutDto dto, Usuario usuario, AppDbContext contexto)
        {
            var uniqueUsername = contexto.Usuarios.FirstOrDefault(x => x.Username == dto.Username && x.Id != usuario.Id);

            if (uniqueUsername != null)
            {
                throw new Exception("El nombre de usuario ya existe");
            }

            usuario.Nombre = dto.Nombre;
            usuario.ApellidoPaterno = dto.ApellidoPaterno;
            usuario.ApellidoMaterno = dto.ApellidoMaterno;
            usuario.Username = dto.Username;
            
        }
    }
}
