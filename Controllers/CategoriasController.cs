using Microsoft.AspNetCore.Mvc;
using MyM_inStock.Data;
using MyM_inStock.Dtos;

namespace MyM_inStock.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly AppDbContext _contexto;

        public CategoriasController(AppDbContext contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public List<CategoriaGetDto> GetCategorias()
        {
            return _contexto.Categorias.ToList().GetDtos();
        }

        [HttpGet("{id}")]
        public CategoriaGetDto GetCategoria(int id)
        {
            var categoria = _contexto.Categorias.FirstOrDefault(x => x.Id == id);
            return categoria.GetDtos();
        }

        [HttpPost]
        public CategoriaPostDto AddCategoria(CategoriaPostDto categoria)
        {
            var cat = categoria.PostDto();
            _contexto.Categorias.Add(cat);
            _contexto.SaveChanges();
            return categoria;
        }

        [HttpDelete("{id}")]
        public bool DeleteCategoria(int id)
        {
            var categoria = _contexto.Categorias.FirstOrDefault(x => x.Id == id);
            _contexto.Categorias.Remove(categoria);
            _contexto.SaveChanges();
            return true;
        }

        [HttpPut("{id}")]
        public CategoriaPutDto UpdateCategoria(int id, CategoriaPutDto categoria)
        {
            var categoriaUpdate = _contexto.Categorias.FirstOrDefault(x => x.Id == id);
            categoria.UpdateDto(categoriaUpdate);
            _contexto.SaveChanges();
            return categoria;
        }
    }
}