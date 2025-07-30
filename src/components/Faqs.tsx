import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <span className="text-lime-400 text-2xl cursor-pointer">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <p className="mt-2 text-gray-300 pr-6">
          {answer}
        </p>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "¿Quiero hacer predicciones en sports betting. ¿Qué necesito hacer?",
      answer: "Podrás navegar por los próximos partidos, seleccionar jugadores, y elegir el tipo de estadística sobre la que quieres predecir (goles, asistencias, tiros a puerta, etc.).",
    },
    // {
    //   question: "¿Con qué rapidez recibo mis ganancias una vez que acierto una predicción?",
    //   answer: "Las ganancias se procesan automáticamente una vez que el evento del partido finaliza y las estadísticas de los jugadores son verificadas. Gracias a nuestra tecnología descentralizada, los pagos son casi instantáneos una vez que se cumplen las condiciones.",
    // },
    // {
    //   question: "¿Cuáles son las comisiones que tengo que pagar?",
    //   answer: "sports betting opera con comisiones mínimas. Nuestra estructura descentralizada nos permite reducir significativamente los costes asociados con las operaciones tradicionales. Los detalles exactos de las comisiones se muestran claramente antes de confirmar cualquier predicción.",
    // },
    {
      question: "¿Puedo establecer las estadísticas para cualquier predicción que quiera?",
      answer: "Actualmente, ofrecemos una amplia gama de opciones de predicción basadas en las estadísticas de los jugadores más relevantes (goles, asistencias, tarjetas, etc.). Estamos trabajando para permitir que los usuarios propongan y creen sus propias predicciones personalizadas en el futuro, siempre que haya datos fiables disponibles para verificarlas.",
    },
  ];

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text text-lg mb-2">Preguntas Frecuentes</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Si tienes <span className="bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text">preguntas</span>, tenemos <span className="bg-gradient-to-r from-green-400 to-cyan-500 text-transparent bg-clip-text">respuestas</span>
          </h2>
          <p className="text-lg text-white text-opacity-80 mt-4 max-w-2xl mx-auto">
            Respuestas a nuestras preguntas más populares sobre predicciones.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-dark-blue-bg p-6 rounded-lg shadow-xl">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;