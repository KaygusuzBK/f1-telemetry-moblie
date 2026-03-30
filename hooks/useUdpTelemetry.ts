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
  hint: string | null;
  error: string | null;
};

type UseUdpTelemetryOptions = {
  port: number;
  enabled: boolean;
  onTelemetryPatch: (patch: TelemetryPatch) => void;
};

export function useUdpTelemetry({ enabled }: UseUdpTelemetryOptions): UdpState {
  return {
    connected: false,
    packets: 0,
    lastPacketAt: null,
    hint: enabled ? 'UDP yalnızca Android veya iOS uygulamasında çalışır; web desteklenmez.' : null,
    error: null,
  };
}
