using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyM_inStock.Data;
using MyM_inStock.Dtos;

namespace MyM_inStock.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _contexto;

        public ProductosController(AppDbContext contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public List<ProductoGetDto> GetProductos()
        {
            var productos = _contexto.Productos
                .Include(x => x.Categoria)
                .Include(x => x.Proveedor)
                .ToList();
            return productos.GetDtos();
        }

        [HttpGet("{id}")]
        public ProductoGetDto GetProducto(int id)
        {
            var producto = _contexto.Productos
                .Include(x => x.Categoria)
                .Include(x => x.Proveedor)
                .FirstOrDefault(x => x.Id == id);
            return producto.GetDtos();
        }

        [HttpPost]
        public ProductoPostDto AddProducto(ProductoPostDto producto)
        {
            var prod = producto.PostDto();
            _contexto.Productos.Add(prod);
            _contexto.SaveChanges();
            return producto;
        }

        [HttpDelete("{id}")]
        public bool DeleteProducto(int id)
        {
            var producto = _contexto.Productos.FirstOrDefault(x => x.Id == id);
            _contexto.Productos.Remove(producto);
            _contexto.SaveChanges();
            return true;
        }

        [HttpPut("{id}")]
        public ProductoPutDto UpdateProducto(int id, ProductoPutDto producto)
        {
            var productoUpdate = _contexto.Productos.FirstOrDefault(x => x.Id == id);
            producto.UpdateDto(productoUpdate);
            _contexto.SaveChanges();
            return producto;
        }
    }
}