import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { dataStore, Proveedor } from "@/lib/data";
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  Mail,
  Phone,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Proveedores() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActivo, setFilterActivo] = useState<"todos" | "activos" | "inactivos">("todos");
  const [proveedores, setProveedores] = useState<Proveedor[]>(
    dataStore.getProveedores()
  );

  const filteredProveedores = useMemo(
    () =>
      proveedores.filter(
        (p) =>
          (filterActivo === "todos" ||
            (filterActivo === "activos" && p.activo) ||
            (filterActivo === "inactivos" && !p.activo)) &&
          (p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.id.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [proveedores, searchTerm, filterActivo]
  );

  const deleteProveedor = (id: string) => {
    setProveedores(proveedores.filter((p) => p.id !== id));
  };

  const toggleActivo = (id: string) => {
    setProveedores(
      proveedores.map((p) =>
        p.id === id ? { ...p, activo: !p.activo } : p
      )
    );
  };

  const stats = {
    total: proveedores.length,
    activos: proveedores.filter((p) => p.activo).length,
    calificacionPromedio:
      proveedores.length > 0
        ? (
            proveedores.reduce((sum, p) => sum + p.calificacion, 0) /
            proveedores.length
          ).toFixed(1)
        : "0.0",
  };

  const renderStars = (calificacion: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-4 h-4",
              star <= Math.round(calificacion)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            )}
          />
        ))}
        <span className="text-sm font-medium text-foreground ml-1">
          {calificacion}/5
        </span>
      </div>
    );
  };

  return (
    <Layout title="Gestión de Proveedores" subtitle="Administrar proveedores y relaciones comerciales">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">
              Total de Proveedores
            </p>
            <p className="text-3xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Proveedores Activos</p>
            <p className="text-3xl font-bold text-green-600">{stats.activos}</p>
          </div>
          <div className="bg-white dark:bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">
              Calificación Promedio
            </p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-yellow-600">
                {stats.calificacionPromedio}
              </p>
              <span className="text-sm">/5.0</span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar proveedor, producto o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="w-5 h-5" />
              Nuevo Proveedor
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {["todos", "activos", "inactivos"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterActivo(status as any)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-colors",
                  filterActivo === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                )}
              >
                {status === "todos" && "Todos"}
                {status === "activos" && "Activos"}
                {status === "inactivos" && "Inactivos"}
              </button>
            ))}
          </div>
        </div>

        {/* Proveedores List */}
        <div className="space-y-4">
          {filteredProveedores.length > 0 ? (
            filteredProveedores.map((proveedor) => (
              <div
                key={proveedor.id}
                className={cn(
                  "bg-white dark:bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow",
                  !proveedor.activo && "opacity-60"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Left Column */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-foreground">
                            {proveedor.nombre}
                          </h3>
                          {proveedor.activo && (
                            <span className="inline-block w-2 h-2 rounded-full bg-green-600"></span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {proveedor.id}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p className="text-foreground font-medium">
                            {proveedor.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-muted-foreground">Teléfono</p>
                          <p className="text-foreground font-medium">
                            {proveedor.telefono}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 md:col-span-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-muted-foreground">Dirección</p>
                          <p className="text-foreground font-medium">
                            {proveedor.direccion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-4 md:items-end">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 text-center md:text-right">
                      <p className="text-xs text-muted-foreground mb-2">
                        Producto Principal
                      </p>
                      <p className="font-bold text-foreground mb-3">
                        {proveedor.producto}
                      </p>
                      {renderStars(proveedor.calificacion)}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProveedor(proveedor.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => toggleActivo(proveedor.id)}
                        className={cn(
                          "px-4 py-2 rounded-lg font-medium transition-colors text-sm",
                          proveedor.activo
                            ? "bg-green-100 dark:bg-green-900/20 text-green-700"
                            : "bg-gray-100 dark:bg-gray-900/20 text-gray-700"
                        )}
                      >
                        {proveedor.activo ? "Activo" : "Inactivo"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white dark:bg-card rounded-lg border border-border">
              <p className="text-muted-foreground">
                No se encontraron proveedores
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
