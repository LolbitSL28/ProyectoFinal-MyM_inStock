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
        public static Usuario PostDto(this UsuarioPostDto dto, AppDbContext contexto)
        {
            var uniqueUsername = contexto.Usuarios.FirstOrDefault(x => x.Username == dto.Username);

            if (uniqueUsername != null)
            {
                throw new Exception("El nombre de usuario ya existe");
            }

            return new Usuario
            {
                Nombre = dto.Nombre,    
                ApellidoPaterno = dto.ApellidoPaterno,
                ApellidoMaterno = dto.ApellidoMaterno,
                Username = dto.Username,
                Password = dto.Password,
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
        //CATEGORIAS
        public static CategoriaGetDto GetDtos(this Categoria categoria)
        {
            return new CategoriaGetDto
            {
                Id = categoria.Id,
                Nombre = categoria.Nombre,
                Descripcion = categoria.Descripcion
            };
        }

        public static List<CategoriaGetDto> GetDtos(this List<Categoria> categorias)
        {
            List<CategoriaGetDto> lista = new List<CategoriaGetDto>();
            foreach (var categoria in categorias)
            {
                lista.Add(new CategoriaGetDto
                {
                    Id = categoria.Id,
                    Nombre = categoria.Nombre,
                    Descripcion = categoria.Descripcion
                });
            }
            return lista;
        }

        public static Categoria PostDto(this CategoriaPostDto dto)
        {
            return new Categoria
            {
                Nombre = dto.Nombre,
                Descripcion = dto.Descripcion
            };
        }

        public static void UpdateDto(this CategoriaPutDto dto, Categoria categoria)
        {
            categoria.Nombre = dto.Nombre;
            categoria.Descripcion = dto.Descripcion;
        }
        //PROVEEDORES
        public static ProveedorGetDto GetDtos(this Proveedor proveedor)
        {
            return new ProveedorGetDto
            {
                Id = proveedor.Id,
                Nombre = proveedor.Nombre,
                Telefono = proveedor.Telefono,
                Direccion = proveedor.Direccion
            };
        }

        public static List<ProveedorGetDto> GetDtos(this List<Proveedor> proveedores)
        {
            List<ProveedorGetDto> lista = new List<ProveedorGetDto>();
            foreach (var proveedor in proveedores)
            {
                lista.Add(new ProveedorGetDto
                {
                    Id = proveedor.Id,
                    Nombre = proveedor.Nombre,
                    Telefono = proveedor.Telefono,
                    Direccion = proveedor.Direccion
                });
            }
            return lista;
        }

        public static Proveedor PostDto(this ProveedorPostDto dto)
        {
            return new Proveedor
            {
                Nombre = dto.Nombre,
                Telefono = dto.Telefono,
                Direccion = dto.Direccion
            };
        }

        public static void UpdateDto(this ProveedorPutDto dto, Proveedor proveedor)
        {
            proveedor.Nombre = dto.Nombre;
            proveedor.Telefono = dto.Telefono;
            proveedor.Direccion = dto.Direccion;
        }
        //PRODUCTOS
        public static ProductoGetDto GetDtos(this Producto producto)
        {
            return new ProductoGetDto
            {
                Id = producto.Id,
                Nombre = producto.Nombre,
                Descripcion = producto.Descripcion,
                Marca = producto.Marca,
                Stock = producto.Stock,
                PrecioVenta = producto.PrecioVenta,
                PrecioCompra = producto.PrecioCompra,
                CategoriaId = producto.CategoriaId,
                CategoriaNombre = producto.Categoria?.Nombre ?? "Sin categoría",
                ProveedorId = producto.ProveedorId,
                ProveedorNombre = producto.Proveedor?.Nombre ?? "Sin proveedor"
            };
        }

        public static List<ProductoGetDto> GetDtos(this List<Producto> productos)
        {
            List<ProductoGetDto> lista = new List<ProductoGetDto>();
            foreach (var producto in productos)
            {
                lista.Add(new ProductoGetDto
                {
                    Id = producto.Id,
                    Nombre = producto.Nombre,
                    Descripcion = producto.Descripcion,
                    Marca = producto.Marca,
                    Stock = producto.Stock,
                    PrecioVenta = producto.PrecioVenta,
                    PrecioCompra = producto.PrecioCompra,
                    CategoriaId = producto.CategoriaId,
                    CategoriaNombre = producto.Categoria?.Nombre ?? "Sin categoría",
                    ProveedorId = producto.ProveedorId,
                    ProveedorNombre = producto.Proveedor?.Nombre ?? "Sin proveedor"
                });
            }
            return lista;
        }

        public static Producto PostDto(this ProductoPostDto dto)
        {
            return new Producto
            {
                Nombre = dto.Nombre,
                Descripcion = dto.Descripcion,
                Marca = dto.Marca,
                Stock = dto.Stock,
                PrecioVenta = dto.PrecioVenta,
                PrecioCompra = dto.PrecioCompra,
                CategoriaId = dto.CategoriaId,
                ProveedorId = dto.ProveedorId
            };
        }

        public static void UpdateDto(this ProductoPutDto dto, Producto producto)
        {
            producto.Nombre = dto.Nombre;
            producto.Descripcion = dto.Descripcion;
            producto.Marca = dto.Marca;
            producto.Stock = dto.Stock;
            producto.PrecioVenta = dto.PrecioVenta;
            producto.PrecioCompra = dto.PrecioCompra;
            producto.CategoriaId = dto.CategoriaId;
            producto.ProveedorId = dto.ProveedorId;
        }
        //VENTAS
        public static VentaDetalleGetDto GetDtos(this DetalleVenta detalle)
        {
            return new VentaDetalleGetDto
            {
                Id = detalle.Id,
                ProductoId = detalle.ProductoId,
                ProductoNombre = detalle.Producto?.Nombre ?? "N/A",
                Cantidad = detalle.Cantidad,
                PrecioVenta = detalle.PrecioVenta,
                Subtotal = detalle.Subtotal
            };
        }

        public static VentaGetDto GetDtos(this Venta venta)
        {
            return new VentaGetDto
            {
                Id = venta.Id,
                Fecha = venta.Fecha,
                Subtotal = venta.Subtotal,
                Iva = venta.Iva,
                Total = venta.Total,
                UsuarioId = venta.UsuarioId,
                UsuarioNombre = venta.Usuario?.Username ?? "N/A",
                Detalles = venta.Detalles?.Select(x => x.GetDtos()).ToList() ?? new List<VentaDetalleGetDto>()
            };
        }

        public static List<VentaGetDto> GetDtos(this List<Venta> ventas)
        {
            List<VentaGetDto> lista = new List<VentaGetDto>();
            foreach (var venta in ventas)
            {
                lista.Add(venta.GetDtos());
            }
            return lista;
        }

        public static (Venta venta, List<DetalleVenta> detalles) PostDto(this VentaPostDto dto, AppDbContext contexto)
        {
            
            var usuario = contexto.Usuarios.FirstOrDefault(x => x.Id == dto.UsuarioId);
            if (usuario == null)
            {
                throw new Exception("Usuario no encontrado");
            }

            decimal subtotal = 0;
            var detalles = new List<DetalleVenta>();

            foreach (var item in dto.Detalles)
            {
                var producto = contexto.Productos.FirstOrDefault(x => x.Id == item.ProductoId);
                if (producto == null)
                {
                    throw new Exception("Producto no encontrado");
                }

                if (producto.Stock < item.Cantidad)
                {
                    throw new Exception("Stock insuficiente");
                }

                decimal subtotalItem = item.Cantidad * producto.PrecioVenta;
                subtotal += subtotalItem;

                
                producto.Stock -= item.Cantidad;

                detalles.Add(new DetalleVenta
                {
                    ProductoId = item.ProductoId,
                    Cantidad = item.Cantidad,
                    PrecioVenta = producto.PrecioVenta,
                    Subtotal = subtotalItem
                });
            }

            decimal iva = subtotal * 0.16m;
            decimal total = subtotal + iva;

            var venta = new Venta
            {
                Fecha = DateTime.Now,
                Subtotal = subtotal,
                Iva = iva,
                Total = total,
                UsuarioId = dto.UsuarioId,
                Detalles = detalles
            };

            return (venta, detalles);
        }

        //COMPRAS
        public static CompraDetalleGetDto GetDtos(this DetalleCompra detalle)
        {
            return new CompraDetalleGetDto
            {
                Id = detalle.Id,
                ProductoId = detalle.ProductoId,
                ProductoNombre = detalle.Producto?.Nombre ?? "N/A",
                Cantidad = detalle.Cantidad,
                PrecioCompra = detalle.PrecioCompra,
                Subtotal = detalle.Subtotal
            };
        }

        public static CompraGetDto GetDtos(this Compra compra)
        {
            return new CompraGetDto
            {
                Id = compra.Id,
                Fecha = compra.Fecha,
                Subtotal = compra.Subtotal,
                Iva = compra.Iva,
                Total = compra.Total,
                UsuarioId = compra.UsuarioId,
                UsuarioNombre = compra.Usuario?.Nombre ?? "N/A",
                ProveedorId = compra.ProveedorId,
                ProveedorNombre = compra.Proveedor?.Nombre ?? "N/A",
                Detalles = compra.Detalles?.Select(x => x.GetDtos()).ToList() ?? new List<CompraDetalleGetDto>()
            };
        }

        public static List<CompraGetDto> GetDtos(this List<Compra> compras)
        {
            List<CompraGetDto> lista = new List<CompraGetDto>();
            foreach (var compra in compras)
            {
                lista.Add(compra.GetDtos());
            }
            return lista;
        }

        public static (Compra compra, List<DetalleCompra> detalles) PostDto(this CompraPostDto dto, AppDbContext contexto)
        {
            
            var usuario = contexto.Usuarios.FirstOrDefault(x => x.Id == dto.UsuarioId);
            if (usuario == null)
            {
                throw new Exception("Usuario no encontrado");
            }

            
            var proveedor = contexto.Proveedores.FirstOrDefault(x => x.Id == dto.ProveedorId);
            if (proveedor == null)
            {
                throw new Exception("Proveedor no encontrado");
            }

            decimal subtotal = 0;
            var detalles = new List<DetalleCompra>();

            foreach (var item in dto.Detalles)
            {
                var producto = contexto.Productos.FirstOrDefault(x => x.Id == item.ProductoId);
                if (producto == null)
                {
                    throw new Exception("Producto no encontrado");
                }

                decimal subtotalItem = item.Cantidad * item.PrecioCompra;
                subtotal += subtotalItem;

                
                producto.Stock += item.Cantidad;
                producto.PrecioCompra = item.PrecioCompra;

                detalles.Add(new DetalleCompra
                {
                    ProductoId = item.ProductoId,
                    Cantidad = item.Cantidad,
                    PrecioCompra = item.PrecioCompra,
                    Subtotal = subtotalItem
                });
            }

            decimal iva = subtotal * 0.16m;
            decimal total = subtotal + iva;

            var compra = new Compra
            {
                Fecha = DateTime.Now,
                Subtotal = subtotal,
                Iva = iva,
                Total = total,
                UsuarioId = dto.UsuarioId,
                ProveedorId = dto.ProveedorId,
                Detalles = detalles
            };

            return (compra, detalles);
        }
    }
}
