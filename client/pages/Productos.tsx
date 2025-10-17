import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { dataStore, Fruta, ProductoRequerido } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  Package,
  Apple,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewType = "frutas" | "requeridos";

export default function Productos() {
  const [viewType, setViewType] = useState<ViewType>("frutas");
  const [searchTerm, setSearchTerm] = useState("");
  const [frutas, setFrutas] = useState<Fruta[]>(dataStore.getFrutas());
  const [productosRequeridos, setProductosRequeridos] = useState<
    ProductoRequerido[]
  >(dataStore.getProductosRequeridos());

  const filteredFrutas = useMemo(
    () =>
      frutas.filter(
        (f) =>
          f.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.id.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [frutas, searchTerm]
  );

  const filteredProductos = useMemo(
    () =>
      productosRequeridos.filter(
        (p) =>
          p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.id.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [productosRequeridos, searchTerm]
  );

  const deleteFruta = (id: string) => {
    setFrutas(frutas.filter((f) => f.id !== id));
  };

  const deleteProducto = (id: string) => {
    setProductosRequeridos(
      productosRequeridos.filter((p) => p.id !== id)
    );
  };

  return (
    <Layout title="Gestión de Productos" subtitle="Frutas propias y productos requeridos">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-5 h-5" />
            Nuevo Producto
          </button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="frutas" onValueChange={(v) => setViewType(v as ViewType)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="frutas" className="flex items-center gap-2">
              <Apple className="w-4 h-4" />
              Frutas Propias
            </TabsTrigger>
            <TabsTrigger value="requeridos" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Productos Requeridos
            </TabsTrigger>
          </TabsList>

          {/* Frutas Tab */}
          <TabsContent value="frutas" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFrutas.map((fruta) => (
                <div
                  key={fruta.id}
                  className="bg-white dark:bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                      <Apple className="w-6 h-6" />
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteFruta(fruta.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-foreground mb-1">{fruta.nombre}</h3>
                  <p className="text-sm text-muted-foreground mb-4">ID: {fruta.id}</p>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo:</span>
                      <span className="font-medium text-foreground">
                        {fruta.tipo === "alta" ? "Alta Calidad" : "Mediana"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Peso:</span>
                      <span className="font-medium text-foreground">
                        {fruta.peso}g
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tono:</span>
                      <span className={cn(
                        "font-medium text-sm px-2 py-1 rounded",
                        fruta.tono === "brillante"
                          ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700"
                          : "bg-gray-100 dark:bg-gray-900/20 text-gray-700"
                      )}>
                        {fruta.tono === "brillante" ? "Brillante" : "Opaco"}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="text-muted-foreground">Cantidad:</span>
                      <span className="font-bold text-green-600">{fruta.cantidad} unidades</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Precio:</span>
                      <span className="font-bold text-lg text-primary">
                        ${fruta.precio.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Registrado: {new Date(fruta.fechaRegistro).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
            {filteredFrutas.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron frutas</p>
              </div>
            )}
          </TabsContent>

          {/* Productos Requeridos Tab */}
          <TabsContent value="requeridos" className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary">
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Nombre
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Tipo
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">
                      Proveedor
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-foreground">
                      Cantidad
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-foreground">
                      Precio
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-foreground">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProductos.map((producto) => (
                    <tr
                      key={producto.id}
                      className="border-b border-border hover:bg-secondary/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-foreground">
                        {producto.id}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-foreground">
                            {producto.nombre}
                          </p>
                          {producto.fechaVencimiento && (
                            <p className="text-xs text-muted-foreground">
                              Vence: {producto.fechaVencimiento}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-700">
                          {producto.tipo.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-foreground">
                        {producto.proveedor}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-foreground">
                        {producto.cantidad}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-primary">
                        ${producto.precio.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button className="p-2 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProducto(producto.id)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredProductos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron productos requeridos</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
