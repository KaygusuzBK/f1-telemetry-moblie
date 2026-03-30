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
    <WidgetShell title="Inputs" subtitle="RPM · speed · gear · pedals">
      <View className="flex-row items-stretch justify-between gap-3">
        <View className="h-40 w-8 items-center justify-end overflow-hidden rounded-xl border border-slate-800 bg-[#0c0c0c] p-1">
          <View className="w-full rounded-sm bg-red-500" style={{ height: `${telemetry.brake}%` }} />
          <Text className="mt-1 text-[9px] font-semibold uppercase text-red-400/90">Brk</Text>
        </View>

        <View className="relative min-h-[160px] flex-1 items-center justify-center">
          <Svg width={220} height={140} viewBox="0 0 220 140">
            <Path
              d={arcPath(110, 110, 74, sweepStart, sweepEnd)}
              stroke="#27272a"
              strokeWidth={11}
              strokeLinecap="round"
              fill="none"
            />
            <Path
              d={arcPath(110, 110, 74, sweepStart, sweep)}
              stroke="#dc2626"
              strokeWidth={11}
              strokeLinecap="round"
              fill="none"
            />
            <Circle cx={110} cy={110} r={5} fill="#fafafa" />
          </Svg>
          <View className="absolute items-center">
            <Text className="font-mono text-4xl font-bold tracking-tight text-zinc-50">{telemetry.speed}</Text>
            <Text className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">km/h</Text>
            <View className="mt-2 rounded-lg border border-red-900/40 bg-red-950/30 px-3 py-1">
              <Text className="text-center font-mono text-2xl font-semibold text-red-400">G{telemetry.gear}</Text>
            </View>
            <Text className="mt-2 font-mono text-[11px] text-zinc-500">{telemetry.rpm.toLocaleString()} rpm</Text>
          </View>
        </View>

        <View className="h-40 w-8 items-center justify-end overflow-hidden rounded-xl border border-slate-800 bg-[#0c0c0c] p-1">
          <View className="w-full rounded-sm bg-emerald-500" style={{ height: `${telemetry.throttle}%` }} />
          <Text className="mt-1 text-[9px] font-semibold uppercase text-emerald-400/90">Thr</Text>
        </View>
      </View>
    </WidgetShell>
  );
}
