import { useMemo, useState } from "react";

export default function PhysicsDomino() {
  const [selected, setSelected] = useState({
    formula: null,
    meaning: null,
    scientist: null,
  });

  const [connections, setConnections] = useState([]);
  const [wrong, setWrong] = useState(false);

  const validConnections = {
    "v = s / t": ["Скорость", "Галилей"],
    "F = mg": ["Сила тяжести", "Ньютон"],
    "p = F / S": ["Давление", "Паскаль"],
    "ρ = m / V": ["Плотность", "Архимед"],
    "A = F × s": ["Работа", "Джоуль"],
  };

  const handleClick = (type, value) => {
    const updated = {
      ...selected,
      [type]: value,
    };

    setSelected(updated);

    if (updated.formula && updated.meaning && updated.scientist) {
      const correct = validConnections[updated.formula];

      if (
        correct &&
        correct[0] === updated.meaning &&
        correct[1] === updated.scientist
      ) {
        setConnections((prev) => [...prev, updated]);
        setWrong(false);
      } else {
        setWrong(true);

        setTimeout(() => {
          setWrong(false);
        }, 1200);
      }

      setTimeout(() => {
        setSelected({
          formula: null,
          meaning: null,
          scientist: null,
        });
      }, 300);
    }
  };
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const formulas = useMemo(() => shuffleArray([
    "v = s / t",
    "F = mg",
    "p = F / S",
    "ρ = m / V",
    "A = F × s",
  ]), []);

  const meanings = useMemo(() => shuffleArray([
    "Скорость",
    "Сила тяжести",
    "Давление",
    "Плотность",
    "Работа",
  ]), []);

  const scientists = useMemo(() => shuffleArray([
    "Галилей",
    "Ньютон",
    "Паскаль",
    "Архимед",
    "Джоуль",
  ]), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl "></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl "></div>
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-12 pb-8 px-4">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-cyan-300">
          Свяжи физику
        </h1>

        <p className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Соедини правильные формулы, физические величины и учёных.
        </p>

        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-200 text-black font-bold px-6 py-3 rounded-2xl"
          >
            Перемешать
          </button>
        </div>
      </header>

      {/* Domino cards */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-cyan-300 text-center">
              Формулы
            </h2>

            <div className="space-y-4">
              {formulas.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleClick("formula", item)}
                  className={`bg-slate-900 border rounded-2xl p-5 text-center text-xl font-bold text-cyan-200 transition-all duration-200 cursor-pointer ${selected.formula === item ? "border-cyan-400 scale-105 bg-cyan-500/10" : "border-cyan-500/20"}`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">
              Что это
            </h2>

            <div className="space-y-4">
              {meanings.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleClick("meaning", item)}
                  className={`bg-slate-900 border rounded-2xl p-5 text-center text-xl font-semibold text-white transition-all duration-200 cursor-pointer ${selected.meaning === item ? "border-green-400 scale-105 bg-green-500/10" : "border-white/10"}`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-purple-300 text-center">
              Учёные
            </h2>

            <div className="space-y-4">
              {scientists.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleClick("scientist", item)}
                  className={`bg-slate-900 border rounded-2xl p-5 text-center text-xl font-semibold text-slate-200 transition-all duration-200 cursor-pointer ${selected.scientist === item ? "border-purple-400 scale-105 bg-purple-500/10" : "border-purple-500/20"}`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-10">
        <div className={`border rounded-3xl p-6 transition-all duration-300 ${wrong ? "border-red-500 bg-red-500/10" : "border-green-500/30 bg-green-500/5"}`}>
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            Связи
          </h2>

          <div className="space-y-3">
            {connections.length === 0 && (
              <p className="text-center text-slate-300">
                Выбери формулу, значение и учёного
              </p>
            )}

            {connections.map((conn, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-green-500 rounded-2xl p-4 text-center text-lg text-green-300"
              >
                {conn.formula} → {conn.meaning} → {conn.scientist}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-10 text-slate-400 text-sm">
        Проект по физике • 7 класс • Physics Domino
      </footer>
    </div>
  );
}
