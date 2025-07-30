import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ArrowRightLeft } from 'lucide-react';

import PlayerCard from '../components/PlayerCard';
import PlayerStats from '../components/PlayerStats'

import type { Player } from "../interfaces/Player";
import type { Substitute } from "../interfaces/Substitute";

const playersInit = [
  { id: 12, name: "Andreas Christensen", position: "CB", age: 24, top: "65%", left: "65%", image: "https://img.a.transfermarkt.technology/portrait/big/196948-1668183241.jpg?lm=1" },
  { id: 13, name: "Jules Koundé", position: "RB", age: 24, top: "65%", left: "85%", image: "https://img.a.transfermarkt.technology/portrait/big/411975-1702502639.jpg?lm=1" },
  { id: 3, name: "Frenkie de Jong", position: "CM", age: 24, top: "45%", left: "30%", image: "https://img.a.transfermarkt.technology/portrait/big/326330-1746041680.jpg?lm=1" },
  { id: 2, name: "Gavi", position: "CM", age: 24, top: "45%", left: "50%", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJFSeYHzA9RdJUjwxsnSH97yYrCDJrL0uQg&s" },
  { id: 17, name: "Fermin López", position: "CAM", age: 22, top: "45%", left: "70%", image: "https://img.a.transfermarkt.technology/portrait/big/636703-1698086824.jpg?lm=1" },
  { id: 6, name: "Raphinha", position: "LW", age: 24, top: "25%", left: "20%", image: "https://img.a.transfermarkt.technology/portrait/big/411295-1729754479.png?lm=1" },
  { id: 4, name: "Robert Lewandowski", position: "ST", age: 24, top: "20%", left: "50%", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvI3M6gk4XcYneJDlRzT56Tj_wKyfPGFkXzg&s" },
  { id: 5, name: "Ferran Torres", position: "RW", age: 24, top: "25%", left: "80%", image: "https://img.a.transfermarkt.technology/portrait/big/398184-1699383547.jpg?lm=1" }
];

const substitutesInit = [
  { id: 19, name: "Dani Olmo", position: "CAM", age: 27, image: "https://img.a.transfermarkt.technology/portrait/big/293385-1711546268.jpg?lm=1" },
  { id: 18, name: "Marc Casado", position: "CAM", age: 21, image: "https://www.ecured.cu/images/thumb/0/0c/Marc_Casad%C3%B3.jpg/260px-Marc_Casad%C3%B3.jpg" },
  { id: 16, name: "Gerard Martín", position: "RB", age: 23, image: "https://img.a.transfermarkt.technology/portrait/big/705395-1730119053.jpg?lm=1" },
  { id: 15, name: "Héctor Fort", position: "LB", age: 18, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNrfp13qofwsTeoPMBbqWbwPxfZHix4M1p-g&s" },
  { id: 14, name: "Eric García", position: "RB", age: 24, image: "https://img.a.transfermarkt.technology/portrait/big/466794-1693604801.jpg?lm=1" },
  { id: 11, name: "Iñigo Martínez", position: "LB", age: 34, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbd5bj6CC4BvYaLuDRffP6myCwZmPqmNBk_g&s" },
  { id: 10, name: "Ronald Araújo", position: "RB", age: 26, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFO3E0CLDqhAI8QTvofGKAZgarvNF1QVaaPw&s" },
  { id: 9, name: "Alejandro Balde", position: "LB", age: 22, image: "https://img.a.transfermarkt.technology/portrait/big/636688-1662836200.jpg?lm=1" },
  { id: 8, name: "Pau Cubarsí", position: "CB", age: 18, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsYNiIzRXdwrjjYn-Y8gQVHeWKb6rYByPlxw&s" },
  { id: 7, name: "Lamine Yamal", position: "ST", age: 18, image: "https://assets.goal.com/images/v3/blt48b5f89ed89139d8/Yamal.jpg?auto=webp&format=pjpg&width=3840&quality=60" },
  { id: 1, name: "Pedri", position: "CM", age: 23, image: "https://www.fcbarcelona.com/photo-resources/2025/07/09/16c3e62d-1a5a-4e10-a964-560eacb6885a/08-Pedri.jpg?width=1200&height=750" },
];

export default function Team() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  const [playerToSwap, setPlayerToSwap] = useState<Player | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // const [showStatsPlayer, setShowStatsPlayer] = useState<Player | null>(null);

  const [players, setPlayers] = useState<Player[]>(playersInit);
  const [substitutes, setSubstitutes] = useState<Substitute[]>(substitutesInit);

  const gk = players.filter((p) => p.position === "GK");
  const defenders = players.filter((p) =>
    ["LB", "CB", "RB"].includes(p.position)
  );
  const midfielders = players.filter((p) =>
    ["CM", "CAM", "CDM"].includes(p.position)
  );
  const forwards = players.filter((p) =>
    ["LW", "RW", "ST"].includes(p.position)
  );

  function handleSubstitution(sub: Player, subIndex: number) {
    if (!playerToSwap) return;

    const playerIndex = players.findIndex(p => p.name === playerToSwap.name);
    if (playerIndex === -1) return;

    const updatedPlayers = [...players];
    const updatedSubstitutes = [...substitutes];

    const { top, left } = updatedPlayers[playerIndex];

    updatedPlayers[playerIndex] = {
      ...sub,
      top,
      left
    };

    updatedSubstitutes[subIndex] = playerToSwap;

    setPlayers(updatedPlayers);
    setSubstitutes(updatedSubstitutes);
    setPlayerToSwap(null);
  }

  const handlePlayerClick = (playerObject) => { // Ahora recibe el objeto completo del jugador
    setSelectedPlayer(playerObject);
  };

  const handlePlayerStatsError = () => {
    alert('Fallo al cargar las estadísticas del jugador. Inténtalo de nuevo.');
    setSelectedPlayer(null); // Oculta el componente de estadísticas en caso de error
  };

  return (
    <div className="p-4" id="team">
      <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-white mb-12">
        Alineación Titular -{" "}
        <span className="bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text">
          FC Barcelona
        </span>
      </h1>

      <div className="w-full flex flex-wrap justify-center gap-8 md:gap-0">
        <div className="bg-[url('/src/assets/images/campo.jpg')] bg-contain bg-no-repeat bg-center rounded-xl shadow-xl flex flex-col justify-between">
          {/* Defensas */}
          <div className="flex justify-center gap-8 mb-8">
            {defenders.map((player, idx) => (
              <div key={idx} className="flex flex-col items-center mx-2">
                
                <div className="relative bg-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-center border-2 border-blue-800 cursor-pointer">

                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover rounded-full"
                    onClick={() => handlePlayerClick(player)}
                  />

                  <a href="#substitutes">
                    <button
                      className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-800 cursor-pointer"
                      title="Cambiar jugador"
                      onClick={() => setPlayerToSwap(player)}
                    >
                      <ArrowRightLeft size={14} />
                    </button>
                  </a>
                </div>

                <p
                  className="text-white text-sm font-bold mt-1 text-center cursor-pointer"
                  onClick={() => handlePlayerClick(player)}
                >
                  {player.name}
                </p>
              </div>
            ))}
          </div>

          {/* Mediocampistas */}
          <div className="flex justify-center gap-8 mb-8">
            {midfielders.map((player, idx) => (
              <div key={idx} className="flex flex-col items-center mx-2">
                
                <div className="relative bg-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-center border-2 border-blue-800 cursor-pointer">

                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover rounded-full"
                    onClick={() => handlePlayerClick(player)}
                  />

                  <a href="#substitutes">
                    <button
                      className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-800 cursor-pointer"
                      title="Cambiar jugador"
                      onClick={() => setPlayerToSwap(player)}
                    >
                      <ArrowRightLeft size={14} />
                    </button>
                  </a>
                </div>

                <p
                  className="text-white text-sm font-bold mt-1 text-center cursor-pointer"
                  onClick={() => handlePlayerClick(player)}
                >
                  {player.name}
                </p>
              </div>
            ))}
          </div>
          {/* Delanteros */}
          <div className="flex justify-center gap-8 mb-8">
            {forwards.map((player, idx) => (
              <div key={idx} className="flex flex-col items-center mx-2">
                
                <div className="relative bg-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-center border-2 border-blue-800 cursor-pointer">

                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover rounded-full"
                    onClick={() => handlePlayerClick(player)}
                  />

                  <a href="#substitutes">
                    <button
                      className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-800 cursor-pointer"
                      title="Cambiar jugador"
                      onClick={() => setPlayerToSwap(player)}
                    >
                      <ArrowRightLeft size={14} />
                    </button>
                  </a>
                </div>

                <p
                  className="text-white text-sm font-bold mt-1 text-center cursor-pointer"
                  onClick={() => handlePlayerClick(player)}
                >
                  {player.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <PlayerStats
            player={selectedPlayer}
            onFetchError={handlePlayerStatsError}
          />
        </div>
      </div>

      {playerToSwap && (
        <div className="pt-18" id="substitutes">
          <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-white mb-12">
            Sustitutos -{" "}
            <span className="bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text">
              FC Barcelona
            </span>
          </h1>

          <div className="flex flex-wrap gap-4 mt-6">
            {substitutes.map((sub, index) => (
              <div key={index} onClick={() => handleSubstitution(sub, index)}>
                <a href="#team">
                  <PlayerCard
                    name={sub.name}
                    age={sub.age}
                    position={sub.position}
                    playerImage={sub.image}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* <PlayerStatsModal
        player={showStatsPlayer}
        onClose={() => setShowStatsPlayer(null)}
      /> */}
    </div>
  );
}
