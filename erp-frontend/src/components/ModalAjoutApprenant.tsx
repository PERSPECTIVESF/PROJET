import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  onClose: () => void;
  onCreate: (data: any) => void;
};

export default function ModalAjoutApprenant({ onClose, onCreate }: Props) {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    entreprise: "",
    origine: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-primary">Nouvel Apprenant</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nom"
            placeholder="Nom complet"
            value={form.nom}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="entreprise"
            placeholder="Entreprise"
            value={form.entreprise}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="origine"
            placeholder="Origine (ex : Campagne)"
            value={form.origine}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="text-right">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
