import Layout from "@/components/Layout";
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  Warehouse,
  Calculator,
  Apple,
} from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  icon?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-12 h-12" />,
  Users: <Users className="w-12 h-12" />,
  ShoppingCart: <ShoppingCart className="w-12 h-12" />,
  TrendingUp: <TrendingUp className="w-12 h-12" />,
  Warehouse: <Warehouse className="w-12 h-12" />,
  Calculator: <Calculator className="w-12 h-12" />,
  Apple: <Apple className="w-12 h-12" />,
};

export default function PlaceholderPage({
  title,
  icon = "Package",
}: PlaceholderPageProps) {
  return (
    <Layout title={title} subtitle="Módulo en desarrollo">
      <div className="flex flex-col items-center justify-center min-h-screen py-12">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
          {iconMap[icon] || iconMap.Package}
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          Este módulo está en desarrollo. Continúa interactuando con el chat
          para completar la implementación de esta sección.
        </p>
        <div className="bg-secondary rounded-lg p-6 max-w-md">
          <p className="text-sm text-foreground">
            💡 <strong>Sugerencia:</strong> Puedes solicitar que se añadan
            características específicas a este módulo, como formularios, tablas
            de datos, gráficos o filtros personalizados.
          </p>
        </div>
      </div>
    </Layout>
  );
}
