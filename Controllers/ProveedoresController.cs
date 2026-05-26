using Microsoft.AspNetCore.Mvc;
using MyM_inStock.Data;
using MyM_inStock.Dtos;

namespace MyM_inStock.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProveedoresController : ControllerBase
    {
        private readonly AppDbContext _contexto;

        public ProveedoresController(AppDbContext contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public List<ProveedorGetDto> GetProveedores()
        {
            return _contexto.Proveedores.ToList().GetDtos();
        }

        [HttpGet("{id}")]
        public ProveedorGetDto GetProveedor(int id)
        {
            var proveedor = _contexto.Proveedores.FirstOrDefault(x => x.Id == id);
            return proveedor.GetDtos();
        }

        [HttpPost]
        public ProveedorPostDto AddProveedor(ProveedorPostDto proveedor)
        {
            var prov = proveedor.PostDto();
            _contexto.Proveedores.Add(prov);
            _contexto.SaveChanges();
            return proveedor;
        }

        [HttpDelete("{id}")]
        public bool DeleteProveedor(int id)
        {
            var proveedor = _contexto.Proveedores.FirstOrDefault(x => x.Id == id);
            _contexto.Proveedores.Remove(proveedor);
            _contexto.SaveChanges();
            return true;
        }

        [HttpPut("{id}")]
        public ProveedorPutDto UpdateProveedor(int id, ProveedorPutDto proveedor)
        {
            var proveedorUpdate = _contexto.Proveedores.FirstOrDefault(x => x.Id == id);
            proveedor.UpdateDto(proveedorUpdate);
            _contexto.SaveChanges();
            return proveedor;
        }
    }
}