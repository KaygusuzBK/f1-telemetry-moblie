import { Text, View } from 'react-native';
import { useTelemetry } from '@/TelemetryContext';
import { WidgetShell } from '@/components/widgets/WidgetShell';

function TireCard({ label, psi, temp, wear }: { label: string; psi: number; temp: number; wear: number }) {
  return (
    <View className="w-[47%] rounded-xl border border-slate-800 bg-[#0c0c0c] p-2.5">
      <Text className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{label}</Text>
      <Text className="mt-1 font-mono text-[11px] text-zinc-200" numberOfLines={1}>
        {psi.toFixed(1)} PSI
      </Text>
      <Text className="font-mono text-[11px] text-amber-300/95" numberOfLines={1}>
        {temp}°C
      </Text>
      <View className="mt-1.5 h-1 overflow-hidden rounded-full bg-zinc-800">
        <View className="h-full rounded-full bg-red-600/80" style={{ width: `${wear}%` }} />
      </View>
      <Text className="mt-1 font-mono text-[10px] text-zinc-500" numberOfLines={1}>
        {wear}% wear
      </Text>
    </View>
  );
}

export function CarStatusWidget() {
  const { telemetry } = useTelemetry();

  return (
    <WidgetShell title="Car status" subtitle="Damage · tyres">
      <View className="gap-3">
        <View className="relative h-36 overflow-hidden rounded-2xl border border-slate-800 bg-[#0c0c0c]">
          <View className="absolute inset-0 opacity-30">
            <View className="absolute left-1/2 top-6 h-20 w-14 -translate-x-1/2 rounded-lg border border-zinc-700 bg-zinc-800/40" />
            <View className="absolute left-1/2 top-3 h-2 w-20 -translate-x-1/2 rounded-md bg-zinc-700/80" />
            <View className="absolute left-1/2 bottom-2 h-2 w-16 -translate-x-1/2 rounded-md bg-zinc-700/80" />
            <View className="absolute left-3 top-1/2 h-8 w-3 -translate-y-1/2 rounded-sm bg-zinc-700" />
            <View className="absolute right-3 top-1/2 h-8 w-3 -translate-y-1/2 rounded-sm bg-zinc-700" />
          </View>
          <View className="absolute left-2 top-2 rounded bg-black/40 px-1.5 py-0.5">
            <Text className="text-[10px] font-mono text-red-300/95">ENG {telemetry.damage.engine}%</Text>
          </View>
          <View className="absolute right-2 top-2 rounded bg-black/40 px-1.5 py-0.5">
            <Text className="text-[10px] font-mono text-red-300/95">FW {telemetry.damage.frontWing}%</Text>
          </View>
          <View className="absolute bottom-2 right-2 rounded bg-black/40 px-1.5 py-0.5">
            <Text className="text-[10px] font-mono text-red-300/95">RW {telemetry.damage.rearWing}%</Text>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between gap-y-2">
          <TireCard label="FL" {...telemetry.tires.fl} />
          <TireCard label="FR" {...telemetry.tires.fr} />
          <TireCard label="RL" {...telemetry.tires.rl} />
          <TireCard label="RR" {...telemetry.tires.rr} />
        </View>
      </View>
    </WidgetShell>
  );
}
