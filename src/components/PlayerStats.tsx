import { useState, useEffect } from 'react';
import axios from 'axios';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from "recharts";

import type { Player } from '../interfaces/Player';
import type { ApiResponse, Data } from '../interfaces/response';
import type { PredictStas } from '../interfaces/predictStats';

interface PlayerStatsProps {
  player: Player;
  onFetchError: () => void;
}

const PlayerStats = ({ player, onFetchError }: PlayerStatsProps) => {
  const [predictedStats, setPredictedStats] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [chartSize, setChartSize] = useState({ width: 228, height: 228 });

  const [radarData, setRadarData] = useState<{ stat: string; valor: number }[]>([]);

  useEffect(() => {
    if (!player) {
      setPredictedStats(null);
      setIsLoading(false);
      return;
    }

    const fetchPlayerPassStats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // console.log(player);
        
        const apiUrl = `http://127.0.0.1:8000/predict/player/${player.id}/35`;
        const response: ApiResponse = await axios.post(apiUrl);
        setPredictedStats(response.data);
        console.log('Estadísticas de pase predichas:', response.data);

        const newRadarData: { stat: string; valor: number }[] = [];

        if(player.position === 'LB' || player.position === 'CB' || player.position === 'RB') {
          newRadarData.push(
            { stat: "Blocks", valor: response.data.stats.defensa.Blocks.predicted },
            { stat: "Int", valor: response.data.stats.defensa.Int.predicted },
            { stat: "Tkl", valor: response.data.stats.defensa.Tkl.predicted }
          );
        } else if(player.position === 'CM' || player.position === 'CAM' || player.position === 'CDM') {
          newRadarData.push(
            { stat: "Att", valor: response.data.stats.pase.Att.predicted },
            { stat: "Cmp", valor: response.data.stats.pase.Cmp.predicted },
            { stat: "Cmp%", valor: response.data.stats.pase['Cmp%'].predicted },
            { stat: "PrgP", valor: response.data.stats.pase.PrgP.predicted }
          );
        } else {
          newRadarData.push(
            { stat: "Gls", valor: response.data.stats.tiro.Gls.predicted },
            { stat: "Sh", valor: response.data.stats.tiro.Sh.predicted },
            { stat: "SoT", valor: response.data.stats.tiro.SoT.predicted },
            { stat: "xG", valor: response.data.stats.tiro.xG.predicted }
          );
        }
        
        setRadarData(newRadarData);

        setIsLoading(false);
      } catch (err) {
        console.error('Error al obtener las estadísticas:', err);
        setError('No se pudieron cargar las estadísticas. Inténtalo de nuevo más tarde.');
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
  const statsToDisplay:PredictStas = predictedStats!.stats;

  const Stat = ({ label, value }: { label: string; value: number }) => (
    <div className="flex justify-between py-1 px-2 bg-gray-700 rounded mb-1">
      <span className="text-gray-300">{label}</span>
      <span className="text-lime-300 font-semibold">{value}</span>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-8 m-auto">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-32 h-32">
          <img
            src={player.image}
            alt={player.image}
            className="w-full h-full object-cover rounded-full border-2 border-blue-800"
          />
        </div>
        <h2 className="text-xl font-bold text-center">{player.name}</h2>
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          width={chartSize.width}
          height={chartSize.height}
          data={radarData}
        >

          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          <PolarRadiusAxis />
          <Radar name={player.name} dataKey="valor" stroke="#e11d48" fill="#e11d48" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 text-sm text-white">
        {/* CATEGORÍA: SHOOTING */}
        <div>
          <h3 className="text-lime-400 font-semibold mb-1">Tiros</h3>
          <Stat label="Gls" value={statsToDisplay.tiro.Gls.predicted} />
          <Stat label="Sh" value={statsToDisplay.tiro.Sh.predicted} />
          <Stat label="Sot" value={statsToDisplay.tiro.SoT.predicted} />
          <Stat label="Xg" value={statsToDisplay.tiro.xG.predicted} />
        </div>

        {/* CATEGORÍA: PASSING */}
        <div>
          <h3 className="text-lime-400 font-semibold mb-1">Pases</h3>
          <Stat label="Att" value={statsToDisplay.pase.Att.predicted} />
          <Stat label="Cmp" value={statsToDisplay.pase.Cmp.predicted} />
          <Stat label="Cmp%" value={statsToDisplay.pase['Cmp%'].predicted} />
          <Stat label="PrgP" value={statsToDisplay.pase.PrgP.predicted} />
        </div>

        {/* CATEGORÍA: DEFENDING */}
        <div>
          <h3 className="text-lime-400 font-semibold mb-1">Defensa</h3>
          <Stat label="Blocks" value={statsToDisplay.defensa.Blocks.predicted} />
          <Stat label="Int" value={statsToDisplay.defensa.Int.predicted} />
          <Stat label="Tkl" value={statsToDisplay.defensa.Tkl.predicted} />
        </div>

        {/* CATEGORÍA: DRIBBLING */}
        <div>
          <h3 className="text-lime-400 font-semibold mb-1">Regate</h3>
          <Stat label="Att.1" value={statsToDisplay.regate["Att.1"].predicted} />
          <Stat label="Carries" value={statsToDisplay.regate.Carries.predicted} />
          <Stat label="Prgc" value={statsToDisplay.regate.PrgC.predicted} />
          <Stat label="Succ" value={statsToDisplay.regate.Succ.predicted} />
        </div>

        {/* CATEGORÍA: OTHER */}
        {/* <div>
          <h3 className="text-lime-400 font-semibold mb-1">Otros</h3>
          <Stat label="Min" value={statsToDisplay.min} />
          <Stat label="Pk" value={statsToDisplay.Pk} />
          <Stat label="Pkatt" value={statsToDisplay.Pkatt} />
          <Stat label="Toques" value={statsToDisplay.Touches} />
          <Stat label="Prgp" value={statsToDisplay.Prgp} />
        </div> */}
      </div>
    </div>
  );
};

export default PlayerStats;