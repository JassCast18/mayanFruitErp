// Modular data system for MAYAN FRUIT ERP
// This system works with JSON/Arrays for database operations

export interface Fruta {
  id: string;
  nombre: string;
  tipo: "mediana" | "alta";
  peso: number;
  color: string;
  tono: "opaco" | "brillante";
  precio: number;
  cantidad: number;
  fechaRegistro: string;
}

export interface ProductoRequerido {
  id: string;
  nombre: string;
  tipo:
    | "fertilizante"
    | "abono"
    | "azadón"
    | "químico"
    | "caja_empaque"
    | "tapadera"
    | "nailon";
  precio: number;
  fechaVencimiento?: string;
  tamaño?: string;
  especialidad?: string;
  cantidad: number;
  proveedor: string;
  fechaRegistro: string;
}

export interface Cliente {
  id: string;
  nombre: string;
  tipo: "local" | "extranjero";
  contacto: string;
  email: string;
  telefono: string;
  direccion: string;
  empresa?: string;
  creditoDisponible: number;
  estadoActivo: boolean;
  fechaRegistro: string;
}

export interface Proveedor {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  producto: string;
  calificacion: number;
  activo: boolean;
  fechaRegistro: string;
}

export interface OrdenVenta {
  id: string;
  clienteId: string;
  cliente: string;
  productos: {
    id: string;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }[];
  total: number;
  estado:
    | "pendiente"
    | "en_preparacion"
    | "enviado"
    | "entregado"
    | "cancelado";
  fechaPedido: string;
  fechaEntrega?: string;
  descuento: number;
  notas?: string;
}

export interface OrdenCompra {
  id: string;
  proveedorId: string;
  proveedor: string;
  productos: {
    id: string;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }[];
  total: number;
  estado:
    | "pendiente"
    | "confirmado"
    | "recibido"
    | "cancelado";
  fechaPedido: string;
  fechaEntregaEsperada?: string;
  fechaEntregaReal?: string;
  notas?: string;
}

export interface RegistroInventario {
  id: string;
  productoId: string;
  producto: string;
  tipo: "frutas" | "requeridos";
  cantidadAnterior: number;
  cantidadActual: number;
  movimiento: "entrada" | "salida";
  referencia: string;
  almacen: string;
  temperatura?: number;
  fechaMovimiento: string;
}

// Database operations (simulate with in-memory storage)
export class DataStore {
  private frutas: Fruta[] = [];
  private productosRequeridos: ProductoRequerido[] = [];
  private clientes: Cliente[] = [];
  private proveedores: Proveedor[] = [];
  private ordenesVenta: OrdenVenta[] = [];
  private ordenesCompra: OrdenCompra[] = [];
  private inventario: RegistroInventario[] = [];

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample frutas
    this.frutas = [
      {
        id: "FRU-001",
        nombre: "Fresas",
        tipo: "alta",
        peso: 15,
        color: "rojo",
        tono: "brillante",
        precio: 5.5,
        cantidad: 500,
        fechaRegistro: "2025-01-15",
      },
      {
        id: "FRU-002",
        nombre: "Moras",
        tipo: "alta",
        peso: 8,
        color: "morado",
        tono: "brillante",
        precio: 4.8,
        cantidad: 300,
        fechaRegistro: "2025-01-16",
      },
      {
        id: "FRU-003",
        nombre: "Cerezas",
        tipo: "mediana",
        peso: 10,
        color: "rojo",
        tono: "opaco",
        precio: 6.2,
        cantidad: 200,
        fechaRegistro: "2025-01-17",
      },
    ];

    // Sample productos requeridos
    this.productosRequeridos = [
      {
        id: "PRR-001",
        nombre: "Fertilizante Premium",
        tipo: "fertilizante",
        precio: 25.0,
        fechaVencimiento: "2026-06-30",
        especialidad: "Frutas rojas",
        cantidad: 100,
        proveedor: "Agro Solutions",
        fechaRegistro: "2025-01-10",
      },
      {
        id: "PRR-002",
        nombre: "Abono Orgánico",
        tipo: "abono",
        precio: 18.5,
        fechaVencimiento: "2026-12-31",
        cantidad: 150,
        proveedor: "EcoAgro",
        fechaRegistro: "2025-01-12",
      },
      {
        id: "PRR-003",
        nombre: "Cajas de Empaque",
        tipo: "caja_empaque",
        precio: 2.5,
        tamaño: "grande",
        cantidad: 5000,
        proveedor: "Packing Inc",
        fechaRegistro: "2025-01-08",
      },
    ];

    // Sample clientes
    this.clientes = [
      {
        id: "CLI-001",
        nombre: "Distribuidora Central",
        tipo: "local",
        contacto: "Juan García",
        email: "juan@distribucentral.com",
        telefono: "+502 7812-3456",
        direccion: "Ciudad de Guatemala",
        creditoDisponible: 10000,
        estadoActivo: true,
        fechaRegistro: "2025-01-01",
      },
      {
        id: "CLI-002",
        nombre: "Export Global",
        tipo: "extranjero",
        contacto: "María López",
        email: "maria@exportglobal.com",
        telefono: "+1 305-555-0123",
        direccion: "Miami, USA",
        creditoDisponible: 25000,
        estadoActivo: true,
        fechaRegistro: "2024-12-15",
      },
      {
        id: "CLI-003",
        nombre: "Tienda Local ABC",
        tipo: "local",
        contacto: "Carlos Ruiz",
        email: "carlos@tiendaabc.com",
        telefono: "+502 7654-3210",
        direccion: "Antigua, Guatemala",
        creditoDisponible: 5000,
        estadoActivo: true,
        fechaRegistro: "2024-11-20",
      },
    ];

    // Sample proveedores
    this.proveedores = [
      {
        id: "PRV-001",
        nombre: "Agro Solutions",
        email: "sales@agrosolutions.com",
        telefono: "+502 2300-0001",
        direccion: "Petén, Guatemala",
        producto: "Fertilizantes",
        calificacion: 4.5,
        activo: true,
        fechaRegistro: "2024-06-01",
      },
      {
        id: "PRV-002",
        nombre: "EcoAgro",
        email: "info@ecoagro.com",
        telefono: "+502 2300-0002",
        direccion: "Escuintla, Guatemala",
        producto: "Abonos Orgánicos",
        calificacion: 4.8,
        activo: true,
        fechaRegistro: "2024-07-15",
      },
    ];

    // Sample órdenes de venta
    this.ordenesVenta = [
      {
        id: "ORV-001",
        clienteId: "CLI-001",
        cliente: "Distribuidora Central",
        productos: [
          {
            id: "FRU-001",
            nombre: "Fresas",
            cantidad: 100,
            precioUnitario: 5.5,
            subtotal: 550,
          },
          {
            id: "FRU-002",
            nombre: "Moras",
            cantidad: 50,
            precioUnitario: 4.8,
            subtotal: 240,
          },
        ],
        total: 790,
        estado: "entregado",
        fechaPedido: "2025-01-20",
        fechaEntrega: "2025-01-22",
        descuento: 0,
      },
      {
        id: "ORV-002",
        clienteId: "CLI-002",
        cliente: "Export Global",
        productos: [
          {
            id: "FRU-001",
            nombre: "Fresas",
            cantidad: 500,
            precioUnitario: 5.5,
            subtotal: 2750,
          },
        ],
        total: 2750,
        estado: "enviado",
        fechaPedido: "2025-01-19",
        descuento: 5,
      },
    ];
  }

  // CRUD Operations
  getFrutas(): Fruta[] {
    return this.frutas;
  }

  addFruta(fruta: Fruta): void {
    this.frutas.push(fruta);
  }

  updateFruta(id: string, fruta: Partial<Fruta>): void {
    const index = this.frutas.findIndex((f) => f.id === id);
    if (index !== -1) {
      this.frutas[index] = { ...this.frutas[index], ...fruta };
    }
  }

  deleteFruta(id: string): void {
    this.frutas = this.frutas.filter((f) => f.id !== id);
  }

  getProductosRequeridos(): ProductoRequerido[] {
    return this.productosRequeridos;
  }

  addProductoRequerido(producto: ProductoRequerido): void {
    this.productosRequeridos.push(producto);
  }

  updateProductoRequerido(
    id: string,
    producto: Partial<ProductoRequerido>
  ): void {
    const index = this.productosRequeridos.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.productosRequeridos[index] = {
        ...this.productosRequeridos[index],
        ...producto,
      };
    }
  }

  deleteProductoRequerido(id: string): void {
    this.productosRequeridos = this.productosRequeridos.filter(
      (p) => p.id !== id
    );
  }

  getClientes(): Cliente[] {
    return this.clientes;
  }

  addCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  updateCliente(id: string, cliente: Partial<Cliente>): void {
    const index = this.clientes.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.clientes[index] = { ...this.clientes[index], ...cliente };
    }
  }

  deleteCliente(id: string): void {
    this.clientes = this.clientes.filter((c) => c.id !== id);
  }

  getProveedores(): Proveedor[] {
    return this.proveedores;
  }

  addProveedor(proveedor: Proveedor): void {
    this.proveedores.push(proveedor);
  }

  updateProveedor(id: string, proveedor: Partial<Proveedor>): void {
    const index = this.proveedores.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.proveedores[index] = { ...this.proveedores[index], ...proveedor };
    }
  }

  deleteProveedor(id: string): void {
    this.proveedores = this.proveedores.filter((p) => p.id !== id);
  }

  getOrdenesVenta(): OrdenVenta[] {
    return this.ordenesVenta;
  }

  addOrdenVenta(orden: OrdenVenta): void {
    this.ordenesVenta.push(orden);
  }

  updateOrdenVenta(id: string, orden: Partial<OrdenVenta>): void {
    const index = this.ordenesVenta.findIndex((o) => o.id === id);
    if (index !== -1) {
      this.ordenesVenta[index] = { ...this.ordenesVenta[index], ...orden };
    }
  }

  getOrdenesCompra(): OrdenCompra[] {
    return this.ordenesCompra;
  }

  addOrdenCompra(orden: OrdenCompra): void {
    this.ordenesCompra.push(orden);
  }

  updateOrdenCompra(id: string, orden: Partial<OrdenCompra>): void {
    const index = this.ordenesCompra.findIndex((o) => o.id === id);
    if (index !== -1) {
      this.ordenesCompra[index] = { ...this.ordenesCompra[index], ...orden };
    }
  }

  exportToJSON(): string {
    return JSON.stringify(
      {
        frutas: this.frutas,
        productosRequeridos: this.productosRequeridos,
        clientes: this.clientes,
        proveedores: this.proveedores,
        ordenesVenta: this.ordenesVenta,
        ordenesCompra: this.ordenesCompra,
        inventario: this.inventario,
      },
      null,
      2
    );
  }

  importFromJSON(json: string): void {
    try {
      const data = JSON.parse(json);
      if (data.frutas) this.frutas = data.frutas;
      if (data.productosRequeridos)
        this.productosRequeridos = data.productosRequeridos;
      if (data.clientes) this.clientes = data.clientes;
      if (data.proveedores) this.proveedores = data.proveedores;
      if (data.ordenesVenta) this.ordenesVenta = data.ordenesVenta;
      if (data.ordenesCompra) this.ordenesCompra = data.ordenesCompra;
      if (data.inventario) this.inventario = data.inventario;
    } catch (error) {
      console.error("Error importing JSON:", error);
    }
  }
}

// Create a global store instance
export const dataStore = new DataStore();
