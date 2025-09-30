"use client";
import { useState } from "react";

export default function Home() {
  const expTable: Record<number, number> = {
    1: 150, 2: 220, 3: 295, 4: 380, 5: 475, 6: 580, 7: 695, 8: 820, 9: 955,
    10: 1100, 11: 1255, 12: 1420, 13: 1595, 14: 1780, 15: 1975, 16: 2180,
    17: 2395, 18: 2620, 19: 2855, 20: 3100, 21: 3355, 22: 3620, 23: 3895,
    24: 4180, 25: 4475, 26: 4780, 27: 5095, 28: 5420, 29: 5755,
  };

  // pakai union type supaya bisa "" (string kosong) atau number
  const [currentLevel, setCurrentLevel] = useState<number | "">(1);
  const [targetLevel, setTargetLevel] = useState<number | "">(2);
  const [activeHours, setActiveHours] = useState<number | "">(1);
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    if (currentLevel === "" || targetLevel === "" || activeHours === "") {
      setResult("Please fill all fields!");
      return;
    }

    if (targetLevel <= currentLevel) {
      setResult("Target level must be higher than current level!");
      return;
    }

    let totalExp = 0;
    for (let lvl = currentLevel; lvl < targetLevel; lvl++) {
      totalExp += expTable[lvl];
    }

    const expPerMinute = 4.5;
    const expPerDay = expPerMinute * activeHours * 60;

    const daysNeeded = totalExp / expPerDay;
    const hoursNeeded = daysNeeded * 24;

    setResult(
      `Total EXP: ${totalExp.toLocaleString()} | Need ${daysNeeded.toFixed(
        1
      )} Day (${hoursNeeded.toFixed(1)} Hour).`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black p-6">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Zenchain XP Calculator
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block mb-1">Current Level</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={currentLevel}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || /^[0-9]+$/.test(val)) {
                  setCurrentLevel(val === "" ? "" : Number(val));
                }
              }}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1">Target Level</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={targetLevel}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || /^[0-9]+$/.test(val)) {
                  setTargetLevel(val === "" ? "" : Number(val));
                }
              }}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1">Active Hours / Day</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={activeHours}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || /^[0-9]+$/.test(val)) {
                  setActiveHours(val === "" ? "" : Number(val));
                }
              }}
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full p-3 rounded-xl font-semibold text-black transition
             bg-gradient-to-r from-[#FEF300] to-[#00E86A] hover:from-[#FDFB02] hover:to-[#3BF900]"
          >
            Calculate
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-black/30 rounded-lg text-center">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
