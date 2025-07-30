import { useState, useEffect, useCallback, memo } from 'react'; // Importa memo
import { usePeriod } from '../hooks/usePeriod';
import axios from 'axios';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from "recharts";
import { toast } from 'react-toastify';

import type { Player } from '../interfaces/Player';
import type { ApiResponse, Data } from '../interfaces/response';
import type { PredictStas } from '../interfaces/predictStats';

interface StatProps {
  label: string;
  value: number;
  onChange?: (v: number) => void;
  editMode: boolean;
}

const Stat = memo(({ label, value, onChange, editMode }: StatProps) => {
  return (
    <div className="flex flex-1 justify-between py-1 px-2 bg-gray-700 rounded mb-1">
      <span className="text-gray-300">{label}</span>
      {editMode ? (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          className="bg-transparent text-lime-300 font-semibold text-right outline-none w-12"
        />
      ) : (
        <span className="text-lime-300 font-semibold">{value}</span>
      )}
    </div>
  );
});

interface PlayerStatsProps {
  player: Player;
  onFetchError: () => void;
}

const PlayerStats = ({ player, onFetchError }: PlayerStatsProps) => {
  // console.log(player);

  const { period, togglePeriod } = usePeriod();
  console.log(period);

  const [predictedStats, setPredictedStats] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [chartSize, setChartSize] = useState({ width: 228, height: 228 });

  const [radarData, setRadarData] = useState<{ stat: string; valor: number }[]>([]);

  const [editableStats, setEditableStats] = useState<PredictStas | null>(null);

  const fetchPlayerStats = useCallback(async () => {
    setIsLoading(true);
    // setError(null);

    if (!player) {
      setIsLoading(false);
      return;
    }

    try {
      const apiUrl = `http://127.0.0.1:8000/predict/player/${player.id}/jornada/${period}`;
      const response: ApiResponse = await axios.post(apiUrl);
      setPredictedStats(response.data);
      console.log('Estadísticas de pase predichas:', response.data);

      const newRadarData: { stat: string; valor: number }[] = [];

      if (player.position === 'LB' || player.position === 'CB' || player.position === 'RB') {
        newRadarData.push(
          { stat: "Blocks", valor: response.data.stats.defensa.Blocks.predicted },
          { stat: "Int", valor: response.data.stats.defensa.Int.predicted },
          { stat: "Tkl", valor: response.data.stats.defensa.Tkl.predicted }
        );
      } else if (player.position === 'CM' || player.position === 'CAM' || player.position === 'CDM') {
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
      // setError('No se pudieron cargar las estadísticas. Inténtalo de nuevo más tarde.');
      setPredictedStats(null);
      if (onFetchError) {
        onFetchError();
      }
      setIsLoading(false);
    }
  }, [player, period, onFetchError]);

  const handleChange = useCallback((section: string, key: string, value: number) => {
    setEditableStats((prev: any) => {
      if (!prev) {
        return {
          pase: {},
          tiro: {},
          defensa: {},
          regate: {},
          [section]: {
            [key]: {
              predicted: Number(value),
            },
          },
        };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: {
            ...prev[section][key],
            predicted: Number(value),
          }
        }
      };
    });
  }, []);

  const handleEditClick = useCallback(() => {
    setEditMode(true);
    if (predictedStats && predictedStats.stats) {
      const deepCopy = JSON.parse(JSON.stringify(predictedStats.stats));
      setEditableStats(deepCopy);
    } else {
      setEditableStats({
        pase: { Att: { predicted: 0 }, Cmp: { predicted: 0 }, 'Cmp%': { predicted: 0 }, PrgP: { predicted: 0 } },
        tiro: { Gls: { predicted: 0 }, Sh: { predicted: 0 }, SoT: { predicted: 0 }, xG: { predicted: 0 } },
        defensa: { Blocks: { predicted: 0 }, Int: { predicted: 0 }, Tkl: { predicted: 0 } },
        regate: { 'Att.1': { predicted: 0 }, Carries: { predicted: 0 }, PrgC: { predicted: 0 }, Succ: { predicted: 0 } }
      });
    }
  }, [predictedStats]);

  const handleSubmit = useCallback(async () => {
    if (!player) {
      return;
    }

    try {
      setIsSubmitting(true);

      const apiUrl = `http://127.0.0.1:8000/predict/player/${player.id}/real`;

      await axios.post(apiUrl, {
        match_number: period,
        Cmp: editableStats?.pase?.Cmp?.predicted,
        Att: editableStats?.pase?.Att?.predicted,
        Cmp_percent: editableStats?.pase?.['Cmp%']?.predicted,
        PrgP: editableStats?.pase?.PrgP?.predicted,
        Sh: editableStats?.tiro?.Sh?.predicted,
        SoT: editableStats?.tiro?.SoT?.predicted,
        Gls: editableStats?.tiro?.Gls?.predicted,
        xG: editableStats?.tiro?.xG?.predicted,
        Carries: editableStats?.regate?.Carries?.predicted,
        PrgC: editableStats?.regate?.PrgC?.predicted,
        Att_1: editableStats?.regate?.['Att.1']?.predicted,
        Succ: editableStats?.regate?.Succ?.predicted,
        Tkl: editableStats?.defensa?.Tkl?.predicted,
        Int: editableStats?.defensa?.Int?.predicted,
        Blocks: editableStats?.defensa?.Blocks?.predicted
      });

      const notify = () => toast.success("Datos enviados con éxito!");
      notify();
      togglePeriod();
      fetchPlayerStats();
    } catch (err) {
      console.error(err);
      setPredictedStats(null)
      const notify = () => toast.warn("Error al enviar los datos.");
      notify()
    } finally {
      setEditMode(false)
      setIsSubmitting(false);
    }
  }, [editableStats, player, period, togglePeriod, fetchPlayerStats]);

  useEffect(() => {
    if (!player) {
      setPredictedStats(null);
      setIsLoading(false);
      return;
    }

    fetchPlayerStats();
  }, [player, fetchPlayerStats]);

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

  // if (!predictedStats || error) return null;
  if (!predictedStats) return null;
  const statsToDisplay: PredictStas = predictedStats!.stats;

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
        <div>
          <h2 className="text-xl font-bold text-center">{player.name}</h2>
          <h3 className="text-xl font-bold text-center">{player.position}</h3>
        </div>
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

          <div className="flex gap-1 items-center">
            <Stat label="Goles anotados" value={editMode ? (editableStats?.tiro?.Gls?.predicted ?? 0) : (statsToDisplay.tiro.Gls.predicted ?? 0)} onChange={(v) => handleChange('tiro', 'Gls', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay.tiro.Gls.accuracy ? statsToDisplay.tiro.Gls.accuracy : 0}%</h3> */}
          </div>

          <div className="flex gap-1 items-center">
            <Stat label="Disparos totales" value={editMode ? (editableStats?.tiro?.Sh?.predicted ?? 0) : (statsToDisplay.tiro.Sh.predicted ?? 0)} onChange={(v) => handleChange('tiro', 'Sh', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay.tiro.Sh.accuracy ? statsToDisplay.tiro.Sh.accuracy : 0}%</h3> */}
          </div>

          <div className="flex gap-1 items-center">
            <Stat label="Disparos a puerta" value={editMode ? (editableStats?.tiro?.SoT?.predicted ?? 0) : (statsToDisplay.tiro.SoT.predicted ?? 0)} onChange={(v) => handleChange('tiro', 'SoT', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay.tiro.SoT.accuracy ? statsToDisplay.tiro.SoT.accuracy : 0}%</h3> */}
          </div>

          <div className="flex gap-1 items-center">
            <Stat label="Goles esperados" value={editMode ? (editableStats?.tiro?.xG?.predicted ?? 0) : (statsToDisplay.tiro.xG.predicted ?? 0)} onChange={(v) => handleChange('tiro', 'xG', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay.tiro.xG.accuracy ? statsToDisplay.tiro.xG.accuracy : 0}%</h3> */}
          </div>

        </div>

        {/* CATEGORÍA: PASSING */}
        <div>
          <h3 className="text-lime-400 font-semibold mb-1">Pases</h3>

          <div className="flex gap-1 items-center">
            <Stat label="Pases intentados" value={editMode ? (editableStats?.pase?.Att?.predicted ?? 0) : (statsToDisplay?.pase.Att.predicted ?? 0)} onChange={(v) => handleChange('pase', 'Att', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay?.pase.Att.accuracy ? statsToDisplay.pase.Att.accuracy : 0}%</h3> */}
          </div>

          <div className="flex gap-1 items-center">
            <Stat label="Pases completados" value={editMode ? (editableStats?.pase?.Cmp?.predicted ?? 0) : (statsToDisplay?.pase.Cmp.predicted ?? 0)} onChange={(v) => handleChange('pase', 'Cmp', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay?.pase.Cmp.accuracy ? statsToDisplay.pase.Cmp.accuracy : 0}%</h3> */}
          </div>

          <div className="flex gap-1 items-center">
            <Stat label="Precisión de pase" value={editMode ? (editableStats?.pase?.['Cmp%']?.predicted ?? 0) : (statsToDisplay?.pase['Cmp%'].predicted ?? 0)} onChange={(v) => handleChange('pase', 'Cmp%', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay?.pase['Cmp%'].accuracy ? statsToDisplay.pase['Cmp%'].accuracy : 0}%</h3> */}
          </div>

          <div className="flex gap-1 items-center">
            <Stat label="Pases progesivos" value={editMode ? (editableStats?.pase?.PrgP?.predicted ?? 0) : (statsToDisplay?.pase.PrgP.predicted ?? 0)} onChange={(v) => handleChange('pase', 'PrgP', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay?.pase.PrgP.accuracy ? statsToDisplay.pase.PrgP.accuracy : 0}%</h3> */}
          </div>

        </div>

        {/* CATEGORÍA: DEFENDING */}
        <div>
          <h3 className="text-lime-400 font-semibold mb-1">Defensa</h3>

          <div className="flex gap-1 items-center">
            <Stat label="Bloqueos defensivos" value={editMode ? (editableStats?.defensa?.Blocks?.predicted ?? 0) : (statsToDisplay?.defensa.Blocks.predicted ?? 0)} onChange={(v) => handleChange('defensa', 'Blocks', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay?.defensa.Blocks.accuracy ? statsToDisplay.defensa.Blocks.accuracy : 0}%</h3> */}
          </div>

          <div className="flex gap-1 items-center">
            <Stat label="Interceptiones" value={editMode ? (editableStats?.defensa?.Int?.predicted ?? 0) : (statsToDisplay?.defensa.Int.predicted ?? 0)} onChange={(v) => handleChange('defensa', 'Int', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay?.defensa.Int.accuracy ? statsToDisplay.defensa.Int.accuracy : 0}%</h3> */}
          </div>

          <div className="flex gap-1 items-center">
            <Stat label="Entradas realizadas" value={editMode ? (editableStats?.defensa?.Tkl?.predicted ?? 0) : (statsToDisplay?.defensa.Tkl.predicted ?? 0)} onChange={(v) => handleChange('defensa', 'Tkl', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay?.defensa.Tkl.accuracy ? statsToDisplay.defensa.Tkl.accuracy : 0}%</h3> */}
          </div>

        </div>

        {/* CATEGORÍA: DRIBBLING */}
        <div>
          <h3 className="text-lime-400 font-semibold mb-1">Regate</h3>

          <div className="flex gap-1 items-center">
            <Stat label="Regates intentados" value={editMode ? (editableStats?.regate?.['Att.1']?.predicted ?? 0) : (statsToDisplay?.regate['Att.1'].predicted ?? 0)} onChange={(v) => handleChange('regate', 'Att.1', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay?.regate['Att.1'].accuracy ? statsToDisplay.regate['Att.1'].accuracy : 0}%</h3> */}
          </div>

          <div className="flex gap-1 items-center">
            <Stat label="Conduc de balón" value={editMode ? (editableStats?.regate?.Carries?.predicted ?? 0) : (statsToDisplay?.regate.Carries.predicted ?? 0)} onChange={(v) => handleChange('regate', 'Carries', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay?.regate.Carries.accuracy ? statsToDisplay.regate.Carries.accuracy : 0}%</h3> */}
          </div>

          <div className="flex gap-1 items-center">
            <Stat label="Conduc progresivas" value={editMode ? (editableStats?.regate?.PrgC?.predicted ?? 0) : (statsToDisplay?.regate.PrgC.predicted ?? 0)} onChange={(v) => handleChange('regate', 'PrgC', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay?.regate.PrgC.accuracy ? statsToDisplay.regate.PrgC.accuracy : 0}%</h3> */}
          </div>

          <div className="flex gap-1 items-center">
            <Stat label="Regates completados" value={editMode ? (editableStats?.regate?.Succ?.predicted ?? 0) : (statsToDisplay?.regate.Succ.predicted ?? 0)} onChange={(v) => handleChange('regate', 'Succ', v)} editMode={editMode} />
            {/* <h3 className="text-lime-400 font-semibold mb-1">{statsToDisplay?.regate.Succ.accuracy ? statsToDisplay.regate.Succ.accuracy : 0}%</h3> */}
          </div>

        </div>

        <div>
          <button
            onClick={editMode ? handleSubmit : handleEditClick}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-lime-400 to-green-500 text-black font-semibold rounded-full px-5 py-2 hover:opacity-90 transition cursor-pointer"
          >
            {isSubmitting ? 'Enviando...' : editMode ? 'Enviar datos' : 'Agregar valores reales'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;