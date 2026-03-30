import { useEffect, useRef, useState } from 'react';
import { NativeModules } from 'react-native';
import dgram from 'react-native-udp';

const UDP_NATIVE_ERROR =
  'UDP native module yok (Expo Go veya prebuild eksik). UDP icin: npm run prebuild && npm run run:android / run:ios';

function isUdpNativeAvailable(): boolean {
  return Boolean(NativeModules.UdpSockets);
}

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

const HEADER_SIZE = 29;
const CAR_TELEMETRY_PACKET_ID = 6;
const CAR_TELEMETRY_DATA_SIZE = 60;
const UDP_STALE_AFTER_MS = 3000;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parseTelemetryPatch(packet: Buffer) {
  if (packet.length < HEADER_SIZE) return null;

  const packetId = packet.readUInt8(6);
  if (packetId !== CAR_TELEMETRY_PACKET_ID) return null;

  const playerCarIndex = packet.readUInt8(27);
  const carOffset = HEADER_SIZE + playerCarIndex * CAR_TELEMETRY_DATA_SIZE;
  if (packet.length < carOffset + CAR_TELEMETRY_DATA_SIZE) return null;

  const speed = packet.readUInt16LE(carOffset);
  const throttle = Math.round(clamp(packet.readFloatLE(carOffset + 2) * 100, 0, 100));
  const brake = Math.round(clamp(packet.readFloatLE(carOffset + 10) * 100, 0, 100));
  const rawGear = packet.readInt8(carOffset + 15);
  const gear = rawGear <= 0 ? 0 : rawGear;
  const rpm = packet.readUInt16LE(carOffset + 16);

  return { speed, throttle, brake, gear, rpm };
}

export function useUdpTelemetry({ port, enabled, onTelemetryPatch }: UseUdpTelemetryOptions): UdpState {
  const [state, setState] = useState<UdpState>({
    connected: false,
    packets: 0,
    lastPacketAt: null,
    error: null,
  });

  const onPatchRef = useRef(onTelemetryPatch);
  onPatchRef.current = onTelemetryPatch;

  useEffect(() => {
    if (!enabled) {
      setState({
        connected: false,
        packets: 0,
        lastPacketAt: null,
        error: null,
      });
      return;
    }

    if (!isUdpNativeAvailable() || !dgram || typeof dgram.createSocket !== 'function') {
      setState({
        connected: false,
        packets: 0,
        lastPacketAt: null,
        error: UDP_NATIVE_ERROR,
      });
      return;
    }

    let socket: ReturnType<typeof dgram.createSocket>;
    try {
      socket = dgram.createSocket({ type: 'udp4' });
    } catch {
      setState({
        connected: false,
        packets: 0,
        lastPacketAt: null,
        error: UDP_NATIVE_ERROR,
      });
      return;
    }

    const staleTimer = setInterval(() => {
      setState((prev) => {
        if (!prev.lastPacketAt) return prev;
        const connected = Date.now() - prev.lastPacketAt < UDP_STALE_AFTER_MS;
        if (connected === prev.connected) return prev;
        return { ...prev, connected };
      });
    }, 500);

    socket.once('error', (err: Error) => {
      setState((prev) => ({ ...prev, error: err.message, connected: false }));
    });

    socket.on('message', (msg: Buffer) => {
      const patch = parseTelemetryPatch(msg);
      const now = Date.now();

      setState((prev) => ({
        connected: true,
        packets: prev.packets + 1,
        lastPacketAt: now,
        error: null,
      }));

      if (patch) {
        onPatchRef.current(patch);
      }
    });

    socket.bind(port, '0.0.0.0');

    return () => {
      clearInterval(staleTimer);
      try {
        socket.close();
      } catch {
        // ignore
      }
    };
  }, [enabled, port]);

  return state;
}
