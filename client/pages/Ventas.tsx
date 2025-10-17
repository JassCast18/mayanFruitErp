import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { dataStore, OrdenVenta } from "@/lib/data";
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  Eye,
  Package,
  User,
  Calendar,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

const estadoColors: Record<string, { bg: string; text: string }> = {
  pendiente: { bg: "bg-yellow-100 dark:bg-yellow-900/20", text: "text-yellow-700" },
  en_preparacion: { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-700" },
  enviado: { bg: "bg-purple-100 dark:bg-purple-900/20", text: "text-purple-700" },
  entregado: { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-700" },
  cancelado: { bg: "bg-red-100 dark:bg-red-900/20", text: "text-red-700" },
};

const getEstadoLabel = (estado: string): string => {
  const labels: Record<string, string> = {
    pendiente: "Pendiente",
    en_preparacion: "En Preparación",
    enviado: "Enviado",
    entregado: "Entregado",
    cancelado: "Cancelado",
  };
  return labels[estado] || estado;
};

interface OrdenVentaDetalle extends OrdenVenta {
  mostrarDetalle?: boolean;
}

export default function Ventas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [ordenes, setOrdenes] = useState<OrdenVentaDetalle[]>(
    dataStore.getOrdenesVenta().map((o) => ({ ...o, mostrarDetalle: false }))
  );

  const filteredOrdenes = useMemo(
    () =>
      ordenes.filter(
        (o) =>
          (filterEstado === "todos" || o.estado === filterEstado) &&
          (o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.cliente.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [ordenes, searchTerm, filterEstado]
  );

  const deleteOrden = (id: string) => {
    setOrdenes(ordenes.filter((o) => o.id !== id));
  };

  const toggleDetalle = (id: string) => {
    setOrdenes(
      ordenes.map((o) =>
        o.id === id ? { ...o, mostrarDetalle: !o.mostrarDetalle } : o
      )
    );
  };

  const cambiarEstado = (id: string, nuevoEstado: string) => {
    setOrdenes(
      ordenes.map((o) =>
        o.id === id ? { ...o, estado: nuevoEstado as any } : o
      )
    );
  };

  const stats = {
    total: ordenes.length,
    pendientes: ordenes.filter((o) => o.estado === "pendiente").length,
    enviadas: ordenes.filter((o) => o.estado === "enviado").length,
    entregadas: ordenes.filter((o) => o.estado === "entregado").length,
  };

  const montoTotal = ordenes.reduce((sum, o) => sum + o.total, 0);

  return (
    <Layout title="Órdenes de Venta" subtitle="Gestión de pedidos de clientes">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-card rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Órdenes</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-card rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">Pendientes</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pendientes}</p>
          </div>
          <div className="bg-white dark:bg-card rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">Enviadas</p>
            <p className="text-2xl font-bold text-purple-600">{stats.enviadas}</p>
          </div>
          <div className="bg-white dark:bg-card rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground mb-1">Monto Total</p>
            <p className="text-2xl font-bold text-primary">
              ${montoTotal.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar orden o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="w-5 h-5" />
              Nueva Orden
            </button>
          </div>

          {/* Estado Filter */}
          <div className="flex flex-wrap gap-2">
            {["todos", "pendiente", "en_preparacion", "enviado", "entregado", "cancelado"].map(
              (estado) => (
                <button
                  key={estado}
                  onClick={() => setFilterEstado(estado)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                    filterEstado === estado
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  )}
                >
                  {estado === "todos"
                    ? "Todas"
                    : getEstadoLabel(estado)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Órdenes List */}
        <div className="space-y-4">
          {filteredOrdenes.length > 0 ? (
            filteredOrdenes.map((orden) => (
              <div
                key={orden.id}
                className="bg-white dark:bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                          <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">
                            {orden.id}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            <User className="w-3 h-3 inline mr-1" />
                            {orden.cliente}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">
                            Fecha Pedido
                          </p>
                          <p className="font-medium text-foreground flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {orden.fechaPedido}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">
                            Monto
                          </p>
                          <p className="font-bold text-lg text-primary flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            ${orden.total.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">
                            Items
                          </p>
                          <p className="font-medium text-foreground">
                            {orden.productos.length} producto(s)
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">
                            Estado
                          </p>
                          <span
                            className={cn(
                              "inline-block px-3 py-1 rounded-full text-xs font-medium",
                              estadoColors[orden.estado]?.bg,
                              estadoColors[orden.estado]?.text
                            )}
                          >
                            {getEstadoLabel(orden.estado)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleDetalle(orden.id)}
                        className="p-2 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteOrden(orden.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detalle */}
                {orden.mostrarDetalle && (
                  <div className="p-6 bg-secondary/50 space-y-4">
                    {/* Productos */}
                    <div>
                      <h4 className="font-bold text-foreground mb-3">
                        Productos
                      </h4>
                      <div className="space-y-2">
                        {orden.productos.map((prod, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center text-sm p-3 bg-background rounded"
                          >
                            <div>
                              <p className="font-medium text-foreground">
                                {prod.nombre}
                              </p>
                              <p className="text-muted-foreground">
                                {prod.cantidad} x ${prod.precioUnitario.toFixed(2)}
                              </p>
                            </div>
                            <p className="font-bold text-foreground">
                              ${prod.subtotal.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cambiar Estado */}
                    <div>
                      <h4 className="font-bold text-foreground mb-3">
                        Cambiar Estado
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["pendiente", "en_preparacion", "enviado", "entregado", "cancelado"].map(
                          (estado) => (
                            <button
                              key={estado}
                              onClick={() => cambiarEstado(orden.id, estado)}
                              className={cn(
                                "px-3 py-1 rounded text-sm font-medium transition-colors",
                                orden.estado === estado
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-background text-foreground hover:bg-primary/20"
                              )}
                            >
                              {getEstadoLabel(estado)}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    {/* Resumen */}
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-end">
                        <div>
                          {orden.descuento > 0 && (
                            <p className="text-sm text-muted-foreground">
                              Descuento: {orden.descuento}%
                            </p>
                          )}
                          {orden.fechaEntrega && (
                            <p className="text-sm text-muted-foreground">
                              Entrega: {orden.fechaEntrega}
                            </p>
                          )}
                        </div>
                        <p className="text-lg font-bold text-primary">
                          Total: ${orden.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white dark:bg-card rounded-lg border border-border">
              <p className="text-muted-foreground">No se encontraron órdenes</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
