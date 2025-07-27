export default function PlayerPredict({ player, onClose }) {
  if (!player) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-2 text-blue-700">{player.name}</h2>
        <p className="text-sm text-gray-700">Posición: {player.position}</p>
        <p className="text-sm text-gray-700 mt-2">Estadísticas (demo):</p>
        <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
          <li>Minutos jugados: 85</li>
          <li>Goles: 1</li>
          <li>Pases completados: 43</li>
        </ul>
      </div>
    </div>
  );
}
