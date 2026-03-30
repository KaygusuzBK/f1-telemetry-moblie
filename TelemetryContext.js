import React, { createContext, useContext, useMemo, useState } from 'react';

const WIDGET_ORDER = [
  'header',
  'telemetryGauge',
  'leaderboard',
  'lapTiming',
  'carStatus',
  'trackMap',
];

/** Sabit demo telemetri — simülasyon yok; sadece UDP patch ile güncellenir. */
const defaultTelemetry = {
  sessionClock: '14:30',
  speed: 286,
  rpm: 10200,
  gear: 6,
  throttle: 67,
  brake: 12,
  currentLap: '1:33.982',
  bestLap: '1:31.554',
  sectors: ['31.221', '30.112', '32.649'],
  weather: 'Clear 28°C',
  track: 'Bahrain — Sakhir',
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
  leaderboard: [
    { id: 'VER', position: 1, code: 'VER', gap: 'LEADER', interval: '-', lap: '1:31.554' },
    { id: 'LEC', position: 2, code: 'LEC', gap: '+0.882', interval: '+0.412', lap: '1:32.436' },
    { id: 'NOR', position: 3, code: 'NOR', gap: '+1.764', interval: '+0.318', lap: '1:32.318' },
    { id: 'HAM', position: 4, code: 'HAM', gap: '+2.646', interval: '+0.205', lap: '1:32.851' },
    { id: 'RUS', position: 5, code: 'RUS', gap: '+3.528', interval: '+0.441', lap: '1:32.969' },
    { id: 'PIA', position: 6, code: 'PIA', gap: '+4.410', interval: '+0.267', lap: '1:33.236' },
    { id: 'ALO', position: 7, code: 'ALO', gap: '+5.292', interval: '+0.389', lap: '1:33.625' },
    { id: 'SAI', position: 8, code: 'SAI', gap: '+6.174', interval: '+0.156', lap: '1:33.781' },
  ],
};

const TelemetryContext = createContext(null);

export function TelemetryProvider({ children }) {
  const [telemetry, setTelemetry] = useState(defaultTelemetry);
  const [layout, setLayout] = useState(WIDGET_ORDER);
  const [udpConnected, setUdpConnected] = useState(false);

  const moveWidget = (nextLayout) => setLayout(nextLayout.map((item) => item));
  const applyLiveTelemetryPatch = (patch) =>
    setTelemetry((current) => ({
      ...current,
      ...patch,
    }));

  const value = useMemo(
    () => ({
      telemetry,
      layout,
      setLayout,
      moveWidget,
      applyLiveTelemetryPatch,
      udpConnected,
      setUdpConnected,
      widgetCatalog: WIDGET_ORDER,
    }),
    [telemetry, layout, udpConnected]
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
