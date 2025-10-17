import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { dataStore, RegistroInventario } from "@/lib/data";
import {
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Thermometer,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample inventory data
const sampleInventario: RegistroInventario[] = [
  {
    id: "INV-001",
    productoId: "FRU-001",
    producto: "Fresas",
    tipo: "frutas",
    cantidadAnterior: 450,
    cantidadActual: 500,
    movimiento: "entrada",
    referencia: "ORV-002",
    almacen: "Almacén Principal",
    temperatura: 2,
    fechaMovimiento: "2025-01-25",
  },
  {
    id: "INV-002",
    productoId: "FRU-002",
    producto: "Moras",
    tipo: "frutas",
    cantidadAnterior: 280,
    cantidadActual: 300,
    movimiento: "entrada",
    referencia: "ORC-001",
    almacen: "Almacén Principal",
    temperatura: 2,
    fechaMovimiento: "2025-01-24",
  },
  {
    id: "INV-003",
    productoId: "FRU-003",
    producto: "Cerezas",
    tipo: "frutas",
    cantidadAnterior: 220,
    cantidadActual: 200,
    movimiento: "salida",
    referencia: "ORV-001",
    almacen: "Almacén Secundario",
    temperatura: 1,
    fechaMovimiento: "2025-01-23",
  },
];

export default function Inventario() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState<"todos" | "frutas" | "requeridos">("todos");
  const [filterMovimiento, setFilterMovimiento] = useState<"todos" | "entrada" | "salida">("todos");
  const [registros, setRegistros] = useState<RegistroInventario[]>(sampleInventario);

  const filteredRegistros = useMemo(
    () =>
      registros.filter(
        (r) =>
          (filterTipo === "todos" || r.tipo === filterTipo) &&
          (filterMovimiento === "todos" || r.movimiento === filterMovimiento) &&
          (r.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.productoId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.almacen.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [registros, searchTerm, filterTipo, filterMovimiento]
  );

  const stats = {
    totalMovimientos: registros.length,
    entradas: registros.filter((r) => r.movimiento === "entrada").length,
    salidas: registros.filter((r) => r.movimiento === "salida").length,
    unidadesMovidas: registros.reduce((sum, r) => sum + Math.abs(r.cantidadActual - r.cantidadAnterior), 0),
  };

  const cambioInventario = registros.reduce((sum, r) => {
    return sum + (r.movimiento === "entrada" ? 
      (r.cantidadActual - r.cantidadAnterior) : 
      -(r.cantidadActual - r.cantidadAnterior));
  }, 0);

  return (
    <Layout
      title="Control de Inventario"
      subtitle="Gestión de entradas y salidas de productos"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-card rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">
              Total Movimientos
            </p>
            <p className="text-2xl font-bold text-foreground">
              {stats.totalMovimientos}
            </p>
          </div>
          <div className="bg-white dark:bg-card rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">Entradas</p>
            <p className="text-2xl font-bold text-green-600">{stats.entradas}</p>
          </div>
          <div className="bg-white dark:bg-card rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">Salidas</p>
            <p className="text-2xl font-bold text-orange-600">{stats.salidas}</p>
          </div>
          <div className="bg-white dark:bg-card rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">
              Cambio Neto
            </p>
            <p
              className={cn(
                "text-2xl font-bold",
                cambioInventario >= 0 ? "text-green-600" : "text-red-600"
              )}
            >
              {cambioInventario >= 0 ? "+" : ""}{cambioInventario}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar producto o almacén..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="w-5 h-5" />
              Registrar Movimiento
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Tipo de Producto
              </p>
              <div className="flex flex-wrap gap-2">
                {["todos", "frutas", "requeridos"].map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setFilterTipo(tipo as any)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                      filterTipo === tipo
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    )}
                  >
                    {tipo === "todos" && "Todos"}
                    {tipo === "frutas" && "Frutas"}
                    {tipo === "requeridos" && "Productos Requeridos"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                Tipo de Movimiento
              </p>
              <div className="flex flex-wrap gap-2">
                {["todos", "entrada", "salida"].map((mov) => (
                  <button
                    key={mov}
                    onClick={() => setFilterMovimiento(mov as any)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1",
                      filterMovimiento === mov
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    )}
                  >
                    {mov === "todos" && "Todos"}
                    {mov === "entrada" && (
                      <>
                        <TrendingUp className="w-3 h-3" />
                        Entradas
                      </>
                    )}
                    {mov === "salida" && (
                      <>
                        <TrendingDown className="w-3 h-3" />
                        Salidas
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Registros List */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="text-left py-3 px-4 font-medium text-foreground">
                  ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-foreground">
                  Producto
                </th>
                <th className="text-left py-3 px-4 font-medium text-foreground">
                  Movimiento
                </th>
                <th className="text-center py-3 px-4 font-medium text-foreground">
                  Anterior
                </th>
                <th className="text-center py-3 px-4 font-medium text-foreground">
                  Actual
                </th>
                <th className="text-center py-3 px-4 font-medium text-foreground">
                  Cambio
                </th>
                <th className="text-left py-3 px-4 font-medium text-foreground">
                  Almacén
                </th>
                <th className="text-center py-3 px-4 font-medium text-foreground">
                  Temp.
                </th>
                <th className="text-left py-3 px-4 font-medium text-foreground">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistros.map((registro) => {
                const cambio = registro.cantidadActual - registro.cantidadAnterior;
                return (
                  <tr
                    key={registro.id}
                    className="border-b border-border hover:bg-secondary/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-foreground">
                      {registro.id}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {registro.producto}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {registro.productoId}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
                          registro.movimiento === "entrada"
                            ? "bg-green-100 dark:bg-green-900/20 text-green-700"
                            : "bg-orange-100 dark:bg-orange-900/20 text-orange-700"
                        )}
                      >
                        {registro.movimiento === "entrada" ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {registro.movimiento === "entrada" ? "Entrada" : "Salida"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-foreground">
                      {registro.cantidadAnterior}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-foreground">
                      {registro.cantidadActual}
                    </td>
                    <td
                      className={cn(
                        "py-3 px-4 text-center font-bold",
                        cambio >= 0 ? "text-green-600" : "text-red-600"
                      )}
                    >
                      {cambio >= 0 ? "+" : ""}{cambio}
                    </td>
                    <td className="py-3 px-4 text-foreground">
                      {registro.almacen}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {registro.temperatura !== undefined ? (
                        <span className="inline-flex items-center gap-1 text-foreground">
                          <Thermometer className="w-4 h-4 text-blue-600" />
                          {registro.temperatura}°C
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {registro.fechaMovimiento}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredRegistros.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-card rounded-lg border border-border">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No se encontraron movimientos</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
