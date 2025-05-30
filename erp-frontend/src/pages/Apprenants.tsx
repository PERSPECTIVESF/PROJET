import { useEffect, useState } from "react";
import { Plus, Archive, Search, MoreVertical } from "lucide-react";
import api from "../services/api";
import ModalAjoutApprenant from "../components/ModalAjoutApprenant";

export default function Apprenants() {
  const [apprenants, setApprenants] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchApprenants();
  }, []);

  const fetchApprenants = async () => {
    try {
      const response = await api.get("/apprenants");
      setApprenants(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des apprenants", error);
    }
  };

  const handleCreate = async (formData: any) => {
    try {
      await api.post("/apprenants", formData);
      fetchApprenants();
    } catch (error) {
      console.error("Erreur lors de l’ajout", error);
    }
  };

  const getTagColor = (origine: string) => {
    if (origine.includes("France travail")) return "bg-pink-100 text-pink-800";
    if (origine.includes("Campagne")) return "bg-green-100 text-green-800";
    if (origine.includes("Plateforme")) return "bg-purple-100 text-purple-800";
    if (origine.includes("Réseaux")) return "bg-yellow-100 text-yellow-800";
    if (origine.includes("Formulaire")) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <>
      <div className="flex flex-col gap-6 bg-white text-gray-800 text-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Apprenants</h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 text-gray-700 border px-3 py-1.5 rounded hover:bg-gray-50">
              <Archive size={16} /> Archives
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 text-white bg-primary px-3 py-1.5 rounded hover:bg-primary-light"
            >
              <Plus size={16} /> Nouvel apprenant
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 text-sm font-medium border-b pb-2">
          <button className="text-primary border-b-2 border-primary pb-1">Tous les apprenants</button>
          <button className="text-gray-500 hover:text-primary">Gestion des inscriptions</button>
          <button className="text-gray-500 hover:text-primary">Nouvelle vue</button>
        </div>

        {/* Recherche + Filtres */}
        <div className="flex items-center justify-between">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Recherche"
              className="w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
          <div className="text-sm text-blue-600 cursor-pointer hover:underline">
            Ajouter un filtre
          </div>
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto border rounded-lg bg-white">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3"><input type="checkbox" /></th>
                <th className="p-3">ID</th>
                <th className="p-3">Nom de l'apprenant</th>
                <th className="p-3">Adresse e-mail</th>
                <th className="p-3">Entreprise</th>
                <th className="p-3">Origine sourcing</th>
                <th className="p-3">Date de création</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apprenants.map((a, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-3"><input type="checkbox" /></td>
                  <td className="p-3 text-gray-700 font-medium">{a.id}</td>
                  <td className="p-3 text-primary hover:underline cursor-pointer">{a.nom}</td>
                  <td className="p-3">{a.email}</td>
                  <td className="p-3">{a.entreprise}</td>
                  <td className="p-3">
                    {a.origine && (
                      <span className={`text-xs px-2 py-1 rounded-full ${getTagColor(a.origine)}`}>
                        {a.origine}
                      </span>
                    )}
                  </td>
                  <td className="p-3">{a.date}</td>
                  <td className="p-3 text-right">
                    <MoreVertical size={16} className="cursor-pointer text-gray-500 hover:text-gray-700" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 border rounded hover:bg-gray-100">&laquo;</button>
            <button className="px-3 py-1 border rounded font-bold text-white bg-primary">1</button>
            <button className="px-2 py-1 border rounded hover:bg-gray-100">&raquo;</button>
          </div>
          <div>Montrer 1 à {apprenants.length} lignes</div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ModalAjoutApprenant
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
    </>
  );
}