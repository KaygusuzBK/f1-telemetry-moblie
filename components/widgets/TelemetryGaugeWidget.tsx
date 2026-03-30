import { Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useTelemetry } from '@/TelemetryContext';
import { WidgetShell } from '@/components/widgets/WidgetShell';

function polar(cx: number, cy: number, radius: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function arcPath(cx: number, cy: number, radius: number, start: number, end: number) {
  const startPt = polar(cx, cy, radius, end);
  const endPt = polar(cx, cy, radius, start);
  const largeArc = end - start <= 180 ? 0 : 1;
  return `M ${startPt.x} ${startPt.y} A ${radius} ${radius} 0 ${largeArc} 0 ${endPt.x} ${endPt.y}`;
}

export function TelemetryGaugeWidget() {
  const { telemetry } = useTelemetry();
  const rpmMax = 15000;
  const progress = Math.min(1, telemetry.rpm / rpmMax);
  const sweepStart = 140;
  const sweepEnd = 400;
  const sweep = sweepStart + progress * (sweepEnd - sweepStart);

  return (
    <WidgetShell title="Telemetry Gauge" subtitle="RPM + Speed + Gear">
      <View className="flex-row items-center justify-between gap-2">
        <View className="h-36 w-7 items-center justify-end rounded-md border border-slate-900 bg-[#090909] p-1">
          <View className="w-full rounded-sm bg-red-500" style={{ height: `${telemetry.brake}%` }} />
          <Text className="mt-1 text-[10px] text-red-400">BRK</Text>
        </View>

        <View className="relative h-40 flex-1 items-center justify-center">
          <Svg width={220} height={140} viewBox="0 0 220 140">
            <Path d={arcPath(110, 110, 74, sweepStart, sweepEnd)} stroke="#1f2937" strokeWidth={12} fill="none" />
            <Path d={arcPath(110, 110, 74, sweepStart, sweep)} stroke="#ef4444" strokeWidth={12} fill="none" />
            <Circle cx={110} cy={110} r={6} fill="#f4f4f5" />
          </Svg>
          <View className="absolute items-center">
            <Text className="font-mono text-3xl font-bold text-zinc-100">{telemetry.speed}</Text>
            <Text className="font-mono text-xs text-zinc-400">KM/H</Text>
            <Text className="mt-1 font-mono text-2xl text-red-400">G{telemetry.gear}</Text>
            <Text className="mt-1 font-mono text-[11px] text-zinc-500">{telemetry.rpm} RPM</Text>
          </View>
        </View>

        <View className="h-36 w-7 items-center justify-end rounded-md border border-slate-900 bg-[#090909] p-1">
          <View className="w-full rounded-sm bg-green-500" style={{ height: `${telemetry.throttle}%` }} />
          <Text className="mt-1 text-[10px] text-green-400">THR</Text>
        </View>
      </View>
    </WidgetShell>
  );
}
