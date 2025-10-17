import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { dataStore, Cliente } from "@/lib/data";
import { Plus, Search, Trash2, Edit2, MapPin, Phone, Mail, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"todos" | "local" | "extranjero">("todos");
  const [clientes, setClientes] = useState<Cliente[]>(dataStore.getClientes());

  const filteredClientes = useMemo(
    () =>
      clientes.filter(
        (c) =>
          (filterType === "todos" || c.tipo === filterType) &&
          (c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.contacto.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [clientes, searchTerm, filterType]
  );

  const deleteCliente = (id: string) => {
    setClientes(clientes.filter((c) => c.id !== id));
  };

  const toggleActivo = (id: string) => {
    setClientes(
      clientes.map((c) =>
        c.id === id ? { ...c, estadoActivo: !c.estadoActivo } : c
      )
    );
  };

  const totalClientes = clientes.length;
  const clientesLocales = clientes.filter((c) => c.tipo === "local").length;
  const clientesExtranjeros = clientes.filter((c) => c.tipo === "extranjero").length;

  return (
    <Layout title="Gestión de Clientes" subtitle="Clientes locales e internacionales">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Total de Clientes</p>
            <p className="text-3xl font-bold text-foreground">{totalClientes}</p>
          </div>
          <div className="bg-white dark:bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Clientes Locales</p>
            <p className="text-3xl font-bold text-primary">{clientesLocales}</p>
          </div>
          <div className="bg-white dark:bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Clientes Extranjeros</p>
            <p className="text-3xl font-bold text-emerald-600">{clientesExtranjeros}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar cliente, contacto o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="w-5 h-5" />
              Nuevo Cliente
            </button>
          </div>

          {/* Type Filter */}
          <div className="flex gap-2">
            {["todos", "local", "extranjero"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as any)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-colors",
                  filterType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                )}
              >
                {type === "todos" && "Todos"}
                {type === "local" && "Locales"}
                {type === "extranjero" && "Extranjeros"}
              </button>
            ))}
          </div>
        </div>

        {/* Clientes List */}
        <div className="space-y-4">
          {filteredClientes.length > 0 ? (
            filteredClientes.map((cliente) => (
              <div
                key={cliente.id}
                className={cn(
                  "bg-white dark:bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow",
                  !cliente.estadoActivo && "opacity-50"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Left Column */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                        {cliente.tipo === "local" ? (
                          <MapPin className="w-6 h-6" />
                        ) : (
                          <Globe className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">
                          {cliente.nombre}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {cliente.id} •{" "}
                          <span
                            className={cn(
                              "font-medium",
                              cliente.tipo === "local"
                                ? "text-primary"
                                : "text-emerald-600"
                            )}
                          >
                            {cliente.tipo === "local" ? "Local" : "Extranjero"}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p className="text-foreground font-medium">
                            {cliente.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-muted-foreground">Teléfono</p>
                          <p className="text-foreground font-medium">
                            {cliente.telefono}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 md:col-span-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-muted-foreground">Dirección</p>
                          <p className="text-foreground font-medium">
                            {cliente.direccion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-4 md:items-end">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center md:text-right">
                      <p className="text-xs text-muted-foreground mb-1">
                        Crédito Disponible
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        ${cliente.creditoDisponible.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCliente(cliente.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => toggleActivo(cliente.id)}
                        className={cn(
                          "px-4 py-2 rounded-lg font-medium transition-colors text-sm",
                          cliente.estadoActivo
                            ? "bg-green-100 dark:bg-green-900/20 text-green-700"
                            : "bg-gray-100 dark:bg-gray-900/20 text-gray-700"
                        )}
                      >
                        {cliente.estadoActivo ? "Activo" : "Inactivo"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white dark:bg-card rounded-lg border border-border">
              <p className="text-muted-foreground">
                No se encontraron clientes
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
