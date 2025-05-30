import { Link, useLocation } from "react-router-dom";
import { Home, Users } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const location = useLocation();

  const menu = [
    { to: "/", label: "Accueil", icon: <Home size={18} /> },
    { to: "/apprenants", label: "Apprenants", icon: <Users size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 font-sans">
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        <div className="text-2xl font-bold text-primary mb-8">SmartOF</div>
        <nav className="flex flex-col gap-2">
          {menu.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition text-sm font-medium ${
                location.pathname === item.to ? "bg-gray-100 text-primary" : "text-gray-700"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 px-8 py-6 bg-gray-50 overflow-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
