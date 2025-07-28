import React from "react";

interface PlayerCardProps {
  name: string;
  age: number;
  position: string;
  countryFlag: string;
  playerImage: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  age,
  position,
  countryFlag,
  playerImage,
}) => {
  return (
    <div className="relative w-55 h-[300px] bg-gradient-to-b from-[#1c1c1c] to-black text-white rounded-2xl overflow-hidden shadow-xl mx-auto cursor-pointer">
      <img
        src={playerImage}
        alt={`${name}`}
        className="absolute top-10 left-1/2 transform -translate-x-1/2 w-40 h-48 object-cover z-10 rounded-2xl"
      />

      <div className="absolute bottom-32 w-full text-center">
        <div className="text-lg font-light">{name}</div>
      </div>

      <div className="absolute bottom-5 w-full px-4 flex justify-between text-xs text-gray-300">
        <div className="flex flex-1 flex-col items-start">
          <span className="font-semibold">EDAD</span>
          <span className="text-white">{age}</span>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <span className="font-semibold">POSICIÓN</span>
          <span className="text-white">{position}</span>
        </div>
        <div className="flex flex-1 flex-col items-end">
          <span className="font-semibold">CIUDAD</span>
          <img src={countryFlag} alt="Country" className="w-5 h-4 mt-1" />
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
