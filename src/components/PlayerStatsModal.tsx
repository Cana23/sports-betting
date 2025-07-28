import { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from "recharts";
import { X } from "lucide-react";

interface PlayerStatsModalProps {
  player: any;
  onClose: () => void;
}

export default function PlayerStatsModal({ player, onClose }: PlayerStatsModalProps) {
  if (!player) return null;

  const [chartSize, setChartSize] = useState({ width: 500, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartSize({ width: 280, height: 280 });
      } else if (window.innerWidth < 768) {
        setChartSize({ width: 350, height: 350 });
      } else {
        setChartSize({ width: 550, height: 400 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const radarData = [
    { stat: "Distancia", valor: player.stats?.distancia ?? 11.2 },
    { stat: "Cantidad HSR", valor: player.stats?.cantidadHSR ?? 55.9 },
    { stat: "Distancia HSR", valor: player.stats?.distanciaHSR ?? 999.1 },
    { stat: "Cantidad Sprints", valor: player.stats?.cantidadSprints ?? 29 },
    { stat: "Distancia Sprints", valor: player.stats?.distanciaSprints ?? 833 },
    { stat: "% Disminución Sprints", valor: player.stats?.disminucionSprints ?? 21.1 },
    { stat: "% Disminución Distancia", valor: player.stats?.disminucionDistancia ?? 15.5 },
    { stat: "% Distancia HSR", valor: player.stats?.porcentajeHSR ?? 8.89 },
    { stat: "% Distancia Sprints", valor: player.stats?.porcentajeSprints ?? 7.41 },
    { stat: "Vel. Máx Media", valor: player.stats?.velocidadMaxima ?? 29.1 },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-auto">

      <div className="relative bg-white rounded-xl shadow-2xl w-[90%] max-w-4xl p-6">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X size={34} className="bg-red-500 text-white rounded-2xl p-2 cursor-pointer" />
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex flex-col items-center">
            <img
              src={player.image}
              alt={player.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-red-600"
            />
            <h2 className="text-xl font-bold mt-2">{player.name}</h2>
            <p className="text-sm text-gray-600">{player.team ?? "Equipo no definido"}</p>
            <p className="text-xs text-gray-500">{player.minutes ?? "945"} mins · Premier League</p>
          </div>

          <div className="flex-1">
            <h3 className="text-center font-semibold mb-2 text-black">Predicción de rendimiento próximo partido</h3>
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
        </div>
      </div>
    </div>
  );
}
