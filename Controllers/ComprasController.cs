using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyM_inStock.Data;
using MyM_inStock.Dtos;

namespace MyM_inStock.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ComprasController : ControllerBase
    {
        private readonly AppDbContext _contexto;

        public ComprasController(AppDbContext contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public List<CompraGetDto> GetCompras()
        {
            var compras = _contexto.Compras
                .Include(x => x.Usuario)
                .Include(x => x.Proveedor)
                .Include(x => x.Detalles)
                    .ThenInclude(x => x.Producto)
                .ToList();
            return compras.GetDtos();
        }

        [HttpGet("{id}")]
        public CompraGetDto GetCompra(int id)
        {
            var compra = _contexto.Compras
                .Include(x => x.Usuario)
                .Include(x => x.Proveedor)
                .Include(x => x.Detalles)
                    .ThenInclude(x => x.Producto)
                .FirstOrDefault(x => x.Id == id);
            return compra.GetDtos();
        }

        [HttpPost]
        public CompraPostDto AddCompra(CompraPostDto compra)
        {
            var (compraNueva, detalles) = compra.PostDto(_contexto);
            _contexto.Compras.Add(compraNueva);
            _contexto.SaveChanges();
            return compra;
        }
    }
}