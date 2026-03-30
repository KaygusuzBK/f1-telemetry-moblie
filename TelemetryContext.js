import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const WIDGET_ORDER = [
  'header',
  'telemetryGauge',
  'leaderboard',
  'lapTiming',
  'carStatus',
  'trackMap',
];

const DRIVERS = [
  { code: 'VER', name: 'Max Verstappen' },
  { code: 'LEC', name: 'Charles Leclerc' },
  { code: 'NOR', name: 'Lando Norris' },
  { code: 'HAM', name: 'Lewis Hamilton' },
  { code: 'RUS', name: 'George Russell' },
  { code: 'PIA', name: 'Oscar Piastri' },
  { code: 'ALO', name: 'Fernando Alonso' },
  { code: 'SAI', name: 'Carlos Sainz' },
];

const defaultTelemetry = {
  speed: 286,
  rpm: 10200,
  gear: 6,
  throttle: 67,
  brake: 12,
  currentLap: '1:33.982',
  bestLap: '1:31.554',
  sectors: ['31.221', '30.112', '32.649'],
  weather: 'Clear 28C',
  track: 'Bahrain - Sakhir',
  tires: {
    fl: { psi: 22.4, temp: 95, wear: 12 },
    fr: { psi: 22.6, temp: 97, wear: 14 },
    rl: { psi: 21.8, temp: 92, wear: 16 },
    rr: { psi: 22.0, temp: 94, wear: 15 },
  },
  damage: {
    engine: 7,
    frontWing: 5,
    rearWing: 3,
  },
  leaderboard: DRIVERS.map((driver, index) => ({
    id: driver.code,
    position: index + 1,
    code: driver.code,
    gap: index === 0 ? 'LEADER' : `+${(index * 0.882).toFixed(3)}`,
    interval: index === 0 ? '-' : `+${(0.3 + index * 0.11).toFixed(3)}`,
    lap: `1:${(31 + index).toString().padStart(2, '0')}.${(532 + index * 3)
      .toString()
      .padStart(3, '0')}`,
  })),
};

const TelemetryContext = createContext(null);

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function TelemetryProvider({ children }) {
  const [telemetry, setTelemetry] = useState(defaultTelemetry);
  const [layout, setLayout] = useState(WIDGET_ORDER);

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry((current) => {
        const speed = clamp(current.speed + (Math.random() * 18 - 9), 95, 360);
        const rpm = clamp(current.rpm + (Math.random() * 1200 - 600), 5000, 15000);
        const throttle = clamp(current.throttle + (Math.random() * 26 - 13), 0, 100);
        const brake = clamp(current.brake + (Math.random() * 20 - 10), 0, 100);
        const gear = clamp(Math.round((speed - 80) / 40), 1, 8);

        return {
          ...current,
          speed: Math.round(speed),
          rpm: Math.round(rpm),
          throttle: Math.round(throttle),
          brake: Math.round(brake),
          gear,
          sectors: current.sectors.map((sector) => {
            const [sec, ms] = sector.split('.');
            const adjusted = clamp(Number(ms) + Math.random() * 10 - 5, 10, 999);
            return `${sec}.${Math.round(adjusted).toString().padStart(3, '0')}`;
          }),
          tires: {
            fl: {
              psi: Number((current.tires.fl.psi + (Math.random() * 0.2 - 0.1)).toFixed(1)),
              temp: Math.round(clamp(current.tires.fl.temp + (Math.random() * 4 - 2), 70, 125)),
              wear: Math.round(clamp(current.tires.fl.wear + Math.random() * 0.4, 0, 100)),
            },
            fr: {
              psi: Number((current.tires.fr.psi + (Math.random() * 0.2 - 0.1)).toFixed(1)),
              temp: Math.round(clamp(current.tires.fr.temp + (Math.random() * 4 - 2), 70, 125)),
              wear: Math.round(clamp(current.tires.fr.wear + Math.random() * 0.4, 0, 100)),
            },
            rl: {
              psi: Number((current.tires.rl.psi + (Math.random() * 0.2 - 0.1)).toFixed(1)),
              temp: Math.round(clamp(current.tires.rl.temp + (Math.random() * 4 - 2), 70, 125)),
              wear: Math.round(clamp(current.tires.rl.wear + Math.random() * 0.4, 0, 100)),
            },
            rr: {
              psi: Number((current.tires.rr.psi + (Math.random() * 0.2 - 0.1)).toFixed(1)),
              temp: Math.round(clamp(current.tires.rr.temp + (Math.random() * 4 - 2), 70, 125)),
              wear: Math.round(clamp(current.tires.rr.wear + Math.random() * 0.4, 0, 100)),
            },
          },
          leaderboard: current.leaderboard.map((driver, idx) => {
            const lapDelta = Math.round(Math.random() * 18 - 9);
            const [minSec, milli] = driver.lap.split('.');
            const ms = clamp(Number(milli) + lapDelta, 1, 999);
            return {
              ...driver,
              interval: idx === 0 ? '-' : `+${(0.2 + idx * 0.13 + Math.random() * 0.04).toFixed(3)}`,
              lap: `${minSec}.${ms.toString().padStart(3, '0')}`,
            };
          }),
        };
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  const moveWidget = (nextLayout) => setLayout(nextLayout.map((item) => item));

  const value = useMemo(
    () => ({
      telemetry,
      layout,
      setLayout,
      moveWidget,
      widgetCatalog: WIDGET_ORDER,
    }),
    [telemetry, layout]
  );

  return <TelemetryContext.Provider value={value}>{children}</TelemetryContext.Provider>;
}

export function useTelemetry() {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used inside TelemetryProvider');
  }
  return context;
}
