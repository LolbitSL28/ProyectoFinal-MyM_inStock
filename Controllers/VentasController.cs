using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyM_inStock.Data;
using MyM_inStock.Dtos;

namespace MyM_inStock.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VentasController : ControllerBase
    {
        private readonly AppDbContext _contexto;

        public VentasController(AppDbContext contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public List<VentaGetDto> GetVentas()
        {
            var ventas = _contexto.Ventas
                .Include(x => x.Usuario)
                .Include(x => x.Detalles)
                    .ThenInclude(x => x.Producto)
                .ToList();
            return ventas.GetDtos();
        }

        [HttpGet("{id}")]
        public VentaGetDto GetVenta(int id)
        {
            var venta = _contexto.Ventas
                .Include(x => x.Usuario)
                .Include(x => x.Detalles)
                    .ThenInclude(x => x.Producto)
                .FirstOrDefault(x => x.Id == id);
            return venta.GetDtos();
        }

        [HttpPost]
        public VentaPostDto AddVenta(VentaPostDto venta)
        {
            var (ventaNueva, detalles) = venta.PostDto(_contexto);
            _contexto.Ventas.Add(ventaNueva);
            _contexto.SaveChanges();
            return venta;
        }
    }
}