import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ComingSoonCard from '../components/ComingSoonCard/ComingSoonCard';

interface Team {
  id: string;
  name: string;
  logo: string;
  league: string;
}

interface TeamSelectionProps {
  onSelectTeam: (teamId: string) => void;
}

const TeamSelection: React.FC<TeamSelectionProps> = ({ onSelectTeam }) => {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 'barcelona',
      name: 'FC Barcelona',
      logo: '/src/assets/images/teams/barca.png',
      league: 'La Liga',
    },
    {
      id: 'arsenal',
      name: 'Arsenal FC',
      logo: '/src/assets/images/teams/arsenal.png',
      league: 'Premier League',
    },
    {
      id: 'realmadrid',
      name: 'Real Madrid',
      logo: '/src/assets/images/teams/real.png',
      league: 'La Liga',
    },
    {
      id: 'psg',
      name: 'Paris Saint-Germain',
      logo: '/src/assets/images/teams/psg.png',
      league: 'Ligue 1',
    },
    {
      id: 'bayern',
      name: 'Bayern Munich',
      logo: '/src/assets/images/teams/bayer.png',
      league: 'Bundesliga',
    },
    {
      id: 'liverpool',
      name: 'Liverpool FC',
      logo: '/src/assets/images/teams/liver.png',
      league: 'Premier League',
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const [showComingSoon, setShowComingSoon] = useState(false);
  const [nonBarcaTeam, setNonBarcaTeam] = useState<string | null>(null);

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.league.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  const handleSelect = (teamId: string) => {
    if (teamId !== 'barcelona') {
      setNonBarcaTeam(teamId);
      setShowComingSoon(true);
      return;
    }
    navigate(`/equipo/barca`);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="pb-8 px-4 md:px-16 bg-dark-blue-bg">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Selecciona tu <span className="bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text">Equipo Favorito</span>
        </h2>
        <p className="text-lg text-white text-opacity-80 mb-12 max-w-2xl mx-auto">
          Elige un equipo para ver predicciones detalladas de sus jugadores y próximos partidos.
        </p>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar equipo por nombre o liga..."
            className="w-full max-w-md p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <div
                key={team.id}
                className="flex flex-col items-center justify-center p-4 rounded-lg"
              >
                <img
                  src={team.logo}
                  alt={`${team.name} logo`}
                  className="w-20 h-20 object-contain mb-3 filter grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                  onClick={() => handleSelect(team.id)}
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-white text-xl">No se encontraron equipos que coincidan con "{searchTerm}".</p>
          )}
        </div>

        {showComingSoon && nonBarcaTeam && (
          <ComingSoonCard
            team={nonBarcaTeam}
            onClose={() => {
              setShowComingSoon(false);
              setNonBarcaTeam(null);
            }}
          />
        )}

      </div>
    </div>
  );
};

export default TeamSelection;