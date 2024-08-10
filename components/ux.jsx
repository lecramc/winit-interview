import React, { useState } from 'react';

// Exemple de données fictives pour les avocats
const attorneys = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    enabled: true,
    priceMaps: [
      {
        _id: '1',
        court: { name: 'Tribunal A' },
        county: { name: 'Comté A' },
        violation: { name: 'Infraction A' },
        points: 5,
        price: 200,
      },
      {
        _id: '2',
        court: { name: 'Tribunal B' },
        county: { name: 'Comté B' },
        violation: { name: 'Infraction B' },
        points: 3,
        price: 150,
      },
    ],
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    address: '456 Elm St, Othertown, USA',
    enabled: false,
    priceMaps: [
      {
        _id: '3',
        court: { name: 'Tribunal C' },
        county: { name: 'Comté C' },
        violation: { name: 'Infraction C' },
        points: 2,
        price: 100,
      },
    ],
  },
];

const AttorneyManagement = () => {
  const [selectedAttorney, setSelectedAttorney] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Components AttorneyManagement</h1>

      <div className="overflow-x-auto mb-8">
        <h2 className="text-xl font-semibold mb-4">Liste des Avocats</h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/6 px-4 py-2">Nom</th>
              <th className="w-1/6 px-4 py-2">Email</th>
              <th className="w-1/6 px-4 py-2">Téléphone</th>
              <th className="w-1/6 px-4 py-2">Adresse</th>
              <th className="w-1/6 px-4 py-2">Actif</th>
              <th className="w-1/6 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attorneys.map((attorney) => (
              <tr key={attorney._id}>
                <td className="border px-4 py-2">{attorney.name}</td>
                <td className="border px-4 py-2">{attorney.email}</td>
                <td className="border px-4 py-2">{attorney.phone}</td>
                <td className="border px-4 py-2">{attorney.address}</td>
                <td className="border px-4 py-2">{attorney.enabled ? 'Oui' : 'Non'}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => setSelectedAttorney(attorney)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Voir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAttorney && (
        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Grilles Tarifaires pour {selectedAttorney.name}</h2>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/5 px-4 py-2">Tribunal</th>
                <th className="w-1/5 px-4 py-2">Comté</th>
                <th className="w-1/5 px-4 py-2">Infraction</th>
                <th className="w-1/5 px-4 py-2">Points</th>
                <th className="w-1/5 px-4 py-2">Prix</th>
              </tr>
            </thead>
            <tbody>
              {selectedAttorney.priceMaps.map((priceMap) => (
                <tr key={priceMap._id}>
                  <td className="border px-4 py-2">{priceMap.court?.name || 'N/A'}</td>
                  <td className="border px-4 py-2">{priceMap.county?.name || 'N/A'}</td>
                  <td className="border px-4 py-2">{priceMap.violation?.name || 'N/A'}</td>
                  <td className="border px-4 py-2">{priceMap.points}</td>
                  <td className="border px-4 py-2">{priceMap.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttorneyManagement;
