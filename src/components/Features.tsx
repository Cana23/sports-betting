import React from 'react';

const FeatureCard: React.FC<{ title: string; description: string; iconSrc: string }> = ({ title, description, iconSrc }) => (
  <div className="bg-dark-blue-bg rounded-lg p-6 text-center border border-lime-400 border-opacity-30 shadow-lg">
    <div className="mb-4 flex justify-center">
      <img src={iconSrc} alt={title} className="w-16 h-16 object-contain" />
    </div>
    <h3 className="text-xl font-semibold text-lime-400 mb-2">{title}</h3>
    <p className="text-white text-opacity-80">{description}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <div className="py-8 px-8">
      <div className="container mx-auto text-center">
        <p className="text-green-500 text-lg mb-2">Un Nuevo Nivel de Predicciones Deportivas</p>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-12">
          La Revolución en <span className="bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text">Análisis de Jugadores</span>
        </h2>
        <p className="text-white text-lg mb-12 max-w-3xl mx-auto">
          Sports betting es una plataforma amigable, descentralizada y impulsada por la comunidad para predicciones deportivas basadas en estadísticas detalladas de los jugadores.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <FeatureCard
            title="Centrado en el Jugador"
            description="Enfocados en el rendimiento individual y las estadísticas detalladas de cada jugador."
            iconSrc="/src/assets/images/features/1.png"
          />
          <FeatureCard
            title="Sin Límites"
            description="Accede a predicciones para una amplia gama de jugadores y ligas."
            iconSrc="/src/assets/images/features/2.png"
          />
          <FeatureCard
            title="Basado en Datos"
            description="Nuestras predicciones se nutren de análisis estadísticos avanzados y algoritmos."
            iconSrc="/src/assets/images/features/3.png"
          />
          <FeatureCard
            title="Comunidad Potenciada"
            description="Benefíciate de la inteligencia colectiva y el conocimiento de nuestra comunidad."
            iconSrc="/src/assets/images/features/4.png"
          />
        </div>

        <a href="/teams">
              <button
                className="bg-gradient-to-r from-lime-400 to-green-500 text-black font-semibold rounded-full px-5 py-2 hover:opacity-90 transition cursor-pointer"
              >
                Apuesta por tu Jugador Favorito
              </button>
            </a>
      </div>
    </div>
  );
};

export default Features;