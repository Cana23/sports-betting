import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative text-white pt-0 pb-4 md:pt-30 md:py-30 px-6 text-center">
      <h2 className="text-lime-400 text-lg font-semibold mb-4">¡Apuesta y gana hoy!</h2>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
        Predicciones Futbolísticas<br /> Basadas en Estadísticas Reales
      </h1>
      <p className="text-lg max-w-xl mx-auto mb-8">
        La forma más rápida y sencilla de predecir el rendimiento de jugadores de fútbol.
        Elige estadísticas, analiza y gana con conocimiento.
      </p>
      <Link to="/teams">
        <button
          className="bg-gradient-to-r from-lime-400 to-green-500 text-black font-semibold rounded-full px-5 py-2 hover:opacity-90 transition cursor-pointer"
        >
          Comienza Ahora
        </button></Link>

      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/src/assets/images/main-banner/players.png"
          alt="Jugadores"
          className="absolute bottom-0 right-0 md:right-[10%] w-full md:w-[75%] opacity-20 object-contain"
        />
      </div>
    </div>
  );
};

export default MainBanner;
