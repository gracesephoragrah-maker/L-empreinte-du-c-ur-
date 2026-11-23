import {useEffect, useState} from 'react';
import {Clock} from 'lucide-react';

// Grand-Lahou (Côte d'Ivoire) est sur le fuseau GMT / UTC+0 toute l'année.
const COLLECTE_START_MS = Date.UTC(2026, 11, 26, 11, 0, 0); // 26 déc. 2026, 11h00 GMT
const COLLECTE_DAY1_END_MS = Date.UTC(2026, 11, 26, 16, 0, 0);
const COLLECTE_DAY2_START_MS = Date.UTC(2026, 11, 27, 10, 0, 0);
const COLLECTE_END_MS = Date.UTC(2026, 11, 27, 16, 0, 0); // 27 déc. 2026, 16h00 GMT

interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type EventPhase = 'upcoming' | 'day1_live' | 'between_days' | 'day2_live' | 'finished';

interface CountdownState {
  phase: EventPhase;
  parts: TimeParts;
}

function splitDuration(ms: number): TimeParts {
  const safeMs = Math.max(0, ms);
  const totalSeconds = Math.floor(safeMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {days, hours, minutes, seconds};
}

function computeCountdown(nowMs: number): CountdownState {
  if (nowMs < COLLECTE_START_MS) {
    return {
      phase: 'upcoming',
      parts: splitDuration(COLLECTE_START_MS - nowMs),
    };
  }
  if (nowMs < COLLECTE_DAY1_END_MS) {
    return {
      phase: 'day1_live',
      parts: splitDuration(COLLECTE_DAY1_END_MS - nowMs),
    };
  }
  if (nowMs < COLLECTE_DAY2_START_MS) {
    return {
      phase: 'between_days',
      parts: splitDuration(COLLECTE_DAY2_START_MS - nowMs),
    };
  }
  if (nowMs < COLLECTE_END_MS) {
    return {
      phase: 'day2_live',
      parts: splitDuration(COLLECTE_END_MS - nowMs),
    };
  }
  return {
    phase: 'finished',
    parts: {days: 0, hours: 0, minutes: 0, seconds: 0},
  };
}

function padTwo(value: number): string {
  return String(value).padStart(2, '0');
}

export function CountdownTimer() {
  const [state, setState] = useState<CountdownState>(() => computeCountdown(Date.now()));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setState(computeCountdown(Date.now()));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  if (state.phase === 'finished') {
    return (
      <div
        aria-live="polite"
        className="mt-6 max-w-xl rounded-2xl bg-[#1E6B30] text-[#F3E6B5] px-5 py-4 shadow-[0_8px_24px_rgba(20,69,31,0.18)]"
      >
        <p className="text-sm font-bold text-white">
          La Grande Collecte des 26 et 27 décembre 2026 est terminée. Merci pour votre générosité.
        </p>
      </div>
    );
  }

  const headerLabel =
    state.phase === 'upcoming'
      ? 'La première édition approche · 26 déc. à 11h00 · Grand-Lahou'
      : state.phase === 'day1_live'
        ? 'Collecte en cours aujourd’hui · Fin du jour 1 dans'
        : state.phase === 'between_days'
          ? 'Reprise de la collecte · Dimanche 27 déc. à 10h00'
          : 'Collecte en cours (Jour 2) · Clôture dans';

  const units = [
    {
      key: 'days',
      value: padTwo(state.parts.days),
      label: state.parts.days > 1 ? 'jours' : 'jour',
    },
    {
      key: 'hours',
      value: padTwo(state.parts.hours),
      label: 'heures',
    },
    {
      key: 'minutes',
      value: padTwo(state.parts.minutes),
      label: 'minutes',
    },
    {
      key: 'seconds',
      value: padTwo(state.parts.seconds),
      label: 'secondes',
    },
  ];

  return (
    <div
      aria-label="Compte à rebours avant la Grande Collecte Solidaire"
      className="mt-6 max-w-xl rounded-2xl bg-[#1E6B30] p-4 sm:p-5 shadow-[0_10px_28px_rgba(20,69,31,0.2)]"
    >
      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#E2AC0B] mb-3.5">
        <Clock className="w-4 h-4 text-[#F4C623] shrink-0" aria-hidden="true" />
        <span>{headerLabel}</span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-3" role="timer" aria-live="off">
        {units.map((unit) => (
          <div
            key={unit.key}
            className="flex flex-col items-center justify-center rounded-2xl bg-white py-3 px-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
          >
            <strong className="font-display font-bold text-2xl sm:text-3xl leading-none text-[#1E6B30] tabular-nums">
              {unit.value}
            </strong>
            <span className="mt-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.06em] text-[#1E6B30]">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs sm:text-sm font-semibold text-[#F3E6B5]">
        Chaque geste compte. Merci de faire partie de cette aventure solidaire.
      </p>
    </div>
  );
}
