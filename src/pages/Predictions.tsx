import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRightLeft, BarChart2 } from 'lucide-react';
import PlayerPredict from '../components/PlayerPredict';

function CustomButton({ children, onClick, className = '', variant = 'default' }) {
  const baseStyles = 'inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: 'bg-transparent text-white hover:underline',
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

const players = [
  { number: 1, name: "Ter Stegen", position: "GK", top: "85%", left: "50%" },
  { number: 2, name: "João Cancelo", position: "LB", top: "65%", left: "15%" },
  { number: 3, name: "Ronald Araújo", position: "CB", top: "65%", left: "35%" },
  { number: 4, name: "Andreas Christensen", position: "CB", top: "65%", left: "65%" },
  { number: 5, name: "Jules Koundé", position: "RB", top: "65%", left: "85%" },
  { number: 6, name: "Frenkie de Jong", position: "CM", top: "45%", left: "30%" },
  { number: 7, name: "Gavi", position: "CM", top: "45%", left: "50%" },
  { number: 8, name: "Ilkay Gündoğan", position: "CM", top: "45%", left: "70%" },
  { number: 9, name: "Raphinha", position: "LW", top: "25%", left: "20%" },
  { number: 10, name: "Robert Lewandowski", position: "ST", top: "20%", left: "50%" },
  { number: 11, name: "Ferran Torres", position: "RW", top: "25%", left: "80%" }
];

const substitutes = [
  { number: 12, name: "Iñaki Peña", position: "GK" },
  { number: 13, name: "Sergi Roberto", position: "RB" },
  { number: 14, name: "Oriol Romeu", position: "CM" },
  { number: 15, name: "Fermín López", position: "CAM" },
  { number: 16, name: "Vitor Roque", position: "ST" },
];

export default function Predictions() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerToSwap, setPlayerToSwap] = useState(null);
  const [showStatsPlayer, setShowStatsPlayer] = useState(null);

  return (
    <div className="p-4">
      <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-white mb-4">
        Alineación Titular -{' '}
        <span className="bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text">
          FC Barcelona
        </span>
      </h1>

      <div className="relative h-[90vh] bg-[url('/src/assets/images/campo.jpg')] bg-contain bg-center rounded-xl shadow-xl overflow-hidden">
        <div className="relative w-full h-full">
          {players.map((player, idx) => (
            <div
              key={idx}
              className="absolute flex flex-col items-center"
              style={{ top: player.top, left: player.left, transform: "translate(-50%, -50%)" }}
            >
              <div className="relative bg-white p-2 rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-center text-sm font-bold text-blue-900 border-2 border-blue-800">
                {player.number}
                <button
                  className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-800 cursor-pointer"
                  title="Cambiar jugador"
                  onClick={() => setPlayerToSwap(player)}
                >
                  <ArrowRightLeft size={14} />
                </button>
              </div>
              <p className="text-white text-sm mt-1 text-center whitespace-nowrap">
                {player.name}
              </p>
              <CustomButton
                variant="ghost"
                className="text-xs cursor-pointer"
                onClick={() => setShowStatsPlayer(player)}
              >
                Ver estadísticas
                <BarChart2 className="ml-1 w-3 h-3" />
              </CustomButton>
            </div>
          ))}
        </div>
      </div>

      {playerToSwap && (
        <div className="mt-6 bg-gray-900 bg-opacity-70 p-4 rounded-xl shadow-inner text-white">
          <h2 className="text-xl mb-2">
            Selecciona un jugador de la banca para reemplazar a {playerToSwap.name}:
          </h2>
          <div className="flex gap-4 flex-wrap">
            {substitutes.map((sub, idx) => (
              <div
                key={idx}
                className="bg-blue-800 hover:bg-blue-700 p-3 rounded-lg cursor-pointer w-40 text-center transition"
                onClick={() => {
                  alert(`Cambio: ${playerToSwap.name} por ${sub.name}`);
                  setPlayerToSwap(null);
                }}
              >
                <p className="font-bold">{sub.number} - {sub.name}</p>
                <p className="text-sm">{sub.position}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <PlayerPredict player={showStatsPlayer} onClose={() => setShowStatsPlayer(null)} />
    </div>
  );
}
