import type { ReactElement, ReactNode } from 'react';

export type WidgetId =
  | 'header'
  | 'telemetryGauge'
  | 'leaderboard'
  | 'lapTiming'
  | 'carStatus'
  | 'trackMap';

export type TelemetryState = {
  sessionClock: string;
  speed: number;
  rpm: number;
  gear: number;
  throttle: number;
  brake: number;
  currentLap: string;
  bestLap: string;
  sectors: string[];
  weather: string;
  track: string;
  tires: {
    fl: { psi: number; temp: number; wear: number };
    fr: { psi: number; temp: number; wear: number };
    rl: { psi: number; temp: number; wear: number };
    rr: { psi: number; temp: number; wear: number };
  };
  damage: {
    engine: number;
    frontWing: number;
    rearWing: number;
  };
  leaderboard: Array<{
    id: string;
    position: number;
    code: string;
    gap: string;
    interval: string;
    lap: string;
  }>;
};

export function TelemetryProvider(props: { children: ReactNode }): ReactElement;

export function useTelemetry(): {
  telemetry: TelemetryState;
  layout: WidgetId[];
  setLayout: (layout: WidgetId[]) => void;
  moveWidget: (nextLayout: WidgetId[]) => void;
  applyLiveTelemetryPatch: (patch: Partial<TelemetryState>) => void;
  udpConnected: boolean;
  setUdpConnected: (connected: boolean) => void;
  widgetCatalog: WidgetId[];
};
