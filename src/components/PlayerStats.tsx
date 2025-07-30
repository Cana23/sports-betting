// src/components/PlayerStats.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerStats = ({ player, onFetchError }) => {
  const [predictedStats, setPredictedStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!player) {
      setPredictedStats(null);
      setIsLoading(false);
      return;
    }

    const fetchPlayerPassStats = async () => {
      setIsLoading(true);
      setError(null);

      const MIN_LOADING_TIME = 600; // 0.6 segundos
      const start = Date.now();

      try {
        const apiUrl = `http://127.0.0.1:8000/predict/pass/${player.id}`;
        const response = await axios.get(apiUrl);

        const elapsed = Date.now() - start;
        const remainingTime = MIN_LOADING_TIME - elapsed;

        if (remainingTime > 0) {
          setTimeout(() => {
            setPredictedStats(response.data);
            setIsLoading(false);
          }, remainingTime);
        } else {
          setPredictedStats(response.data);
          setIsLoading(false);
        }

      } catch (err) {
        console.error('Error al obtener las estadísticas de pase predichas:', err);
        setError('No se pudieron cargar las estadísticas de pase. Inténtalo de nuevo más tarde.');
        setPredictedStats(null);
        if (onFetchError) {
          onFetchError();
        }
        setIsLoading(false);
      }
    };

    fetchPlayerPassStats();
  }, [player, onFetchError]);

  if (!player) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-400"></div>
        <p className="mt-4 text-lg font-semibold text-gray-200">Cargando estadísticas del jugador...</p>
      </div>
    );
  }

  if (!predictedStats || error) return null;

  const statsToDisplay = predictedStats;

  const Stat = ({ label, value }) => (
    <div className="flex justify-between py-1 px-2 bg-gray-700 rounded mb-1">
      <span className="text-gray-300">{label}</span>
      <span className="text-lime-300 font-semibold">{value}</span>
    </div>
  );

  return (
  <div className="flex flex-col md:flex-row gap-8 m-auto">
    <div className="flex flex-col justify-center items-center">
      <div className="w-32 h-32 mb-4">
        <img
          src={player.image}
          alt={player.image}
          className="w-full h-full object-cover rounded-full border-2 border-blue-800"
        />
      </div>
      <h2 className="text-xl font-bold text-center">{player.name}</h2>
    </div>

    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-white">
      {/* CATEGORÍA: SHOOTING */}
      <div>
        <h3 className="text-lime-400 font-semibold mb-1">Tiros</h3>
        <Stat label="Gls" value={statsToDisplay.Gls} />
        <Stat label="Sh" value={statsToDisplay.Sh} />
        <Stat label="Sot" value={statsToDisplay.Sot} />
        <Stat label="Xg" value={statsToDisplay.Xg} />
        <Stat label="Npxg" value={statsToDisplay.Npxg} />
      </div>

      {/* CATEGORÍA: PASSING */}
      <div>
        <h3 className="text-lime-400 font-semibold mb-1">Pases</h3>
        <Stat label="Ast" value={statsToDisplay.Ast} />
        <Stat label="Xag" value={statsToDisplay.Xag} />
        <Stat label="Sca" value={statsToDisplay.Sca} />
        <Stat label="Gca" value={statsToDisplay.Gca} />
        <Stat label="Cmp" value={statsToDisplay.Cmp} />
        <Stat label="Cmp%" value={statsToDisplay.Cmp_percent} />
      </div>

      {/* CATEGORÍA: DEFENDING */}
      <div>
        <h3 className="text-lime-400 font-semibold mb-1">Defensa</h3>
        <Stat label="Tkl" value={statsToDisplay.Tkl} />
        <Stat label="Int" value={statsToDisplay.Int} />
        <Stat label="Bloques" value={statsToDisplay.Blocks} />
        <Stat label="Crdy" value={statsToDisplay.Crdy} />
        <Stat label="Crdr" value={statsToDisplay.Crdr} />
      </div>

      {/* CATEGORÍA: DRIBBLING */}
      <div>
        <h3 className="text-lime-400 font-semibold mb-1">Regate</h3>
        <Stat label="Conducciones" value={statsToDisplay.Carries} />
        <Stat label="Prgc" value={statsToDisplay.Prgc} />
        <Stat label="Regates" value={statsToDisplay.Att_dribbles} />
        <Stat label="Succ" value={statsToDisplay.Succ} />
      </div>

      {/* CATEGORÍA: OTHER */}
      <div>
        <h3 className="text-lime-400 font-semibold mb-1">Otros</h3>
        <Stat label="Min" value={statsToDisplay.min} />
        <Stat label="Pk" value={statsToDisplay.Pk} />
        <Stat label="Pkatt" value={statsToDisplay.Pkatt} />
        <Stat label="Toques" value={statsToDisplay.Touches} />
        <Stat label="Prgp" value={statsToDisplay.Prgp} />
      </div>
    </div>
  </div>
  );
};

export default PlayerStats;