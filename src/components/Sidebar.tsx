import { Link, useLocation } from 'react-router-dom';
import { 
  UserGroupIcon, 
  BuildingOfficeIcon,
  UserIcon,
  AcademicCapIcon,
  CurrencyEuroIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  CalendarIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const navigation = [
  { name: 'Base de contacts', children: [
    { name: 'Apprenants', href: '/apprenants', icon: UserGroupIcon },
    { name: 'Entreprises', href: '/entreprises', icon: BuildingOfficeIcon },
    { name: 'Contacts clients', href: '/contacts', icon: UserIcon },
    { name: 'Formateurs', href: '/formateurs', icon: AcademicCapIcon },
    { name: 'Financeurs', href: '/financeurs', icon: CurrencyEuroIcon },
  ]},
  { name: 'Bibliothèque', children: [
    { name: 'Produits de formation', href: '/formations', icon: DocumentTextIcon },
    { name: 'Questionnaires pédagogiques', href: '/questionnaires', icon: ClipboardDocumentListIcon },
    { name: 'Enquêtes de satisfactions', href: '/enquetes', icon: ChartBarIcon },
  ]},
  { name: 'Sessions', children: [
    { name: 'Sessions de formation', href: '/sessions', icon: CalendarIcon },
  ]},
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-4">
        <img src="/logo.svg" alt="SmartOF" className="h-8" />
      </div>

      <div className="px-3 py-2">
        <nav className="space-y-6">
          {navigation.map((group) => (
            <div key={group.name}>
              <h3 className="px-3 text-sm font-medium text-gray-500">{group.name}</h3>
              <div className="mt-2 space-y-1">
                {group.children.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={clsx(
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-md',
                      location.pathname === item.href
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="fixed bottom-0 w-56 p-4">
          <button
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md w-full"
          >
            <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5" />
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}