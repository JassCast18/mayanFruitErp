import { useMemo } from "react";
import Layout from "@/components/Layout";
import { dataStore } from "@/lib/data";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, TrendingUp, TrendingDown, PieChart as PieIcon } from "lucide-react";

// Sample financial data
const datosFinancieros = {
  ingresos: 45230,
  gastos: 28450,
  ganancia: 16780,
  tasaIVA: 0.12,
};

const movimientosMeses = [
  { mes: "Ene", ingresos: 32000, gastos: 18000 },
  { mes: "Feb", ingresos: 28000, gastos: 16000 },
  { mes: "Mar", ingresos: 35000, gastos: 20000 },
  { mes: "Abr", ingresos: 42000, gastos: 24000 },
  { mes: "May", ingresos: 45230, gastos: 28450 },
];

const detalleGastos = [
  { nombre: "Materiales", value: 35 },
  { nombre: "Transporte", value: 25 },
  { nombre: "Personal", value: 25 },
  { nombre: "Otros", value: 15 },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

const cuentasPorCobrar = [
  {
    id: "CPC-001",
    cliente: "Distribuidora Central",
    monto: 5230,
    vencimiento: "2025-02-15",
    estado: "pendiente",
  },
  {
    id: "CPC-002",
    cliente: "Export Global",
    monto: 8900,
    vencimiento: "2025-02-20",
    estado: "pendiente",
  },
  {
    id: "CPC-003",
    cliente: "Tienda ABC",
    monto: 2450,
    vencimiento: "2025-02-10",
    estado: "vencido",
  },
];

const cuentasPorPagar = [
  {
    id: "CPP-001",
    proveedor: "Agro Solutions",
    monto: 3500,
    vencimiento: "2025-02-05",
    estado: "pendiente",
  },
  {
    id: "CPP-002",
    proveedor: "EcoAgro",
    monto: 2200,
    vencimiento: "2025-02-12",
    estado: "pendiente",
  },
  {
    id: "CPP-003",
    proveedor: "Packing Inc",
    monto: 1800,
    vencimiento: "2025-01-28",
    estado: "vencido",
  },
];

export default function Contabilidad() {
  const ordenes = dataStore.getOrdenesVenta();
  const ordenesCompra = dataStore.getOrdenesCompra();

  const estadoFinanciero = useMemo(() => {
    const totalIngresos = ordenes.reduce((sum, o) => sum + o.total, 0);
    const totalGastos = ordenesCompra.reduce((sum, o) => sum + o.total, 0);
    const ganancia = totalIngresos - totalGastos;
    const ivaCalculado = totalIngresos * 0.12;

    return {
      ingresos: totalIngresos || datosFinancieros.ingresos,
      gastos: totalGastos || datosFinancieros.gastos,
      ganancia: ganancia || datosFinancieros.ganancia,
      iva: ivaCalculado || datosFinancieros.ingresos * 0.12,
    };
  }, [ordenes, ordenesCompra]);

  const margenGanancia = (
    (estadoFinanciero.ganancia / estadoFinanciero.ingresos) *
    100
  ).toFixed(1);

  return (
    <Layout
      title="Contabilidad y Finanzas"
      subtitle="Resumen financiero y gestión de cuentas"
    >
      <div className="space-y-6">
        {/* Main Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-lg border border-green-200 dark:border-green-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                Ingresos Totales
              </p>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-700 dark:text-green-300">
              ${estadoFinanciero.ingresos.toLocaleString()}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Mes actual
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 rounded-lg border border-red-200 dark:border-red-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-red-700 dark:text-red-400">
                Gastos Totales
              </p>
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-700 dark:text-red-300">
              ${estadoFinanciero.gastos.toLocaleString()}
            </p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              Mes actual
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                Ganancia Neta
              </p>
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
              ${estadoFinanciero.ganancia.toLocaleString()}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Margen: {margenGanancia}%
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-purple-700 dark:text-purple-400">
                IVA (12%)
              </p>
              <PieIcon className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">
              ${estadoFinanciero.iva.toLocaleString()}
            </p>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              Por declarar
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Movimiento de Ingresos vs Gastos */}
          <div className="lg:col-span-2 bg-white dark:bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Ingresos vs Gastos (Últimos 5 Meses)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={movimientosMeses}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Legend />
                <Bar dataKey="ingresos" fill="#10b981" name="Ingresos" />
                <Bar dataKey="gastos" fill="#ef4444" name="Gastos" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Distribución de Gastos */}
          <div className="bg-white dark:bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Distribución de Gastos
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={detalleGastos}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#10b981"
                  dataKey="value"
                >
                  {detalleGastos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accounts Receivable and Payable */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cuentas por Cobrar */}
          <div className="bg-white dark:bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Cuentas por Cobrar
            </h2>
            <div className="space-y-3">
              {cuentasPorCobrar.map((cuenta) => (
                <div
                  key={cuenta.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {cuenta.cliente}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {cuenta.id} • Vence: {cuenta.vencimiento}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      ${cuenta.monto.toLocaleString()}
                    </p>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        cuenta.estado === "vencido"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {cuenta.estado === "vencido" ? "Vencido" : "Pendiente"}
                    </span>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-border flex justify-between font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-green-600">
                  ${cuentasPorCobrar.reduce((sum, c) => sum + c.monto, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Cuentas por Pagar */}
          <div className="bg-white dark:bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Cuentas por Pagar
            </h2>
            <div className="space-y-3">
              {cuentasPorPagar.map((cuenta) => (
                <div
                  key={cuenta.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {cuenta.proveedor}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {cuenta.id} • Vence: {cuenta.vencimiento}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">
                      ${cuenta.monto.toLocaleString()}
                    </p>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        cuenta.estado === "vencido"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {cuenta.estado === "vencido" ? "Vencido" : "Pendiente"}
                    </span>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-border flex justify-between font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-red-600">
                  ${cuentasPorPagar.reduce((sum, c) => sum + c.monto, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
