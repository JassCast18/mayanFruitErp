import Layout from "@/components/Layout";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Package, TrendingUp, DollarSign, AlertCircle, ChevronRight } from "lucide-react";

// Sample data for charts
const ventasData = [
  { mes: "Ene", ventas: 4000, compras: 2400 },
  { mes: "Feb", ventas: 3000, compras: 1398 },
  { mes: "Mar", ventas: 2000, compras: 9800 },
  { mes: "Abr", ventas: 2780, compras: 3908 },
  { mes: "May", ventas: 1890, compras: 4800 },
  { mes: "Jun", ventas: 2390, compras: 3800 },
];

const productosData = [
  { name: "Fresas", value: 35 },
  { name: "Moras", value: 25 },
  { name: "Cerezas", value: 40 },
];

const COLORS = ["#10b981", "#059669", "#047857"];

interface MetricCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const metrics: MetricCard[] = [
  {
    title: "Productos en Inventario",
    value: "1,248",
    change: "+12% este mes",
    icon: <Package className="w-8 h-8" />,
    color: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "Ventas Totales",
    value: "$45,230",
    change: "+18% vs mes anterior",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    title: "Ingresos",
    value: "$28,450",
    change: "+23% vs mes anterior",
    icon: <DollarSign className="w-8 h-8" />,
    color: "bg-lime-50 dark:bg-lime-900/20",
  },
  {
    title: "Pedidos Pendientes",
    value: "24",
    change: "-5% vs mes anterior",
    icon: <AlertCircle className="w-8 h-8" />,
    color: "bg-orange-50 dark:bg-orange-900/20",
  },
];

interface Pedido {
  id: string;
  cliente: string;
  estado: string;
  monto: string;
  fecha: string;
}

const pedidosRecientes: Pedido[] = [
  { id: "PED-001", cliente: "Distribuidora Central", estado: "En Preparación", monto: "$2,450", fecha: "Hoy" },
  { id: "PED-002", cliente: "Tienda Local ABC", estado: "Enviado", monto: "$1,890", fecha: "Ayer" },
  { id: "PED-003", cliente: "Export Global", estado: "Entregado", monto: "$5,230", fecha: "2 días" },
  { id: "PED-004", cliente: "Mercado Regional", estado: "En Preparación", monto: "$3,100", fecha: "3 días" },
];

export default function Dashboard() {
  return (
    <Layout title="Dashboard" subtitle="Bienvenido al Sistema ERP MAYAN FRUIT">
      <div className="space-y-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className="bg-white dark:bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`${metric.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary`}>
                {metric.icon}
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {metric.title}
              </p>
              <p className="text-2xl font-bold text-foreground mb-2">
                {metric.value}
              </p>
              <p className="text-xs text-primary">{metric.change}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Tendencia de Ventas y Compras
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ventasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981" }}
                />
                <Line
                  type="monotone"
                  dataKey="compras"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ fill: "#059669" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Productos Chart */}
          <div className="bg-white dark:bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Distribución de Frutas
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productosData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#10b981"
                  dataKey="value"
                >
                  {productosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">
              Pedidos Recientes
            </h2>
            <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              Ver todo <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    ID Pedido
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Cliente
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Estado
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Monto
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody>
                {pedidosRecientes.map((pedido) => (
                  <tr
                    key={pedido.id}
                    className="border-b border-border hover:bg-secondary/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-foreground">
                      {pedido.id}
                    </td>
                    <td className="py-3 px-4 text-foreground">
                      {pedido.cliente}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          pedido.estado === "Entregado"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : pedido.estado === "Enviado"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                              : "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                        }`}
                      >
                        {pedido.estado}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-foreground">
                      {pedido.monto}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {pedido.fecha}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
