type TelemetryPatch = {
  speed?: number;
  rpm?: number;
  gear?: number;
  throttle?: number;
  brake?: number;
};

type UdpState = {
  connected: boolean;
  packets: number;
  lastPacketAt: number | null;
  error: string | null;
};

type UseUdpTelemetryOptions = {
  port: number;
  enabled: boolean;
  onTelemetryPatch: (patch: TelemetryPatch) => void;
};

export function useUdpTelemetry(_options: UseUdpTelemetryOptions): UdpState {
  return {
    connected: false,
    packets: 0,
    lastPacketAt: null,
    error: 'UDP listener is available on native builds only.',
  };
}
