import { Text, View } from 'react-native';
import { useTelemetry } from '@/TelemetryContext';
import { WidgetShell } from '@/components/widgets/WidgetShell';

function TireCard({ label, psi, temp, wear }: { label: string; psi: number; temp: number; wear: number }) {
  return (
    <View className="w-[47%] rounded-lg border border-slate-900 bg-[#090909] p-1.5">
      <Text className="text-[10px] text-zinc-500">{label}</Text>
      <Text className="font-mono text-[11px] text-zinc-100" numberOfLines={1}>
        {psi.toFixed(1)} PSI
      </Text>
      <Text className="font-mono text-[11px] text-orange-300" numberOfLines={1}>
        {temp}C
      </Text>
      <Text className="font-mono text-[11px] text-red-300" numberOfLines={1}>
        {wear}% wear
      </Text>
    </View>
  );
}

export function CarStatusWidget() {
  const { telemetry } = useTelemetry();

  return (
    <WidgetShell title="Car Status" subtitle="Damage + Tires">
      <View className="gap-3">
        <View className="relative h-36 rounded-xl border border-slate-900 bg-[#090909]">
          <View className="absolute left-1/2 top-4 h-24 w-16 -translate-x-1/2 rounded-lg border border-slate-800 bg-zinc-800/30" />
          <View className="absolute left-1/2 top-2 h-2 w-24 -translate-x-1/2 rounded-md bg-zinc-700/70" />
          <View className="absolute left-1/2 bottom-2 h-2 w-20 -translate-x-1/2 rounded-md bg-zinc-700/70" />

          <View className="absolute left-2 top-4 h-8 w-4 rounded-sm bg-zinc-700" />
          <View className="absolute right-2 top-4 h-8 w-4 rounded-sm bg-zinc-700" />
          <View className="absolute left-2 bottom-4 h-8 w-4 rounded-sm bg-zinc-700" />
          <View className="absolute right-2 bottom-4 h-8 w-4 rounded-sm bg-zinc-700" />

          <Text className="absolute left-2 top-2 text-[10px] text-red-300">
            ENG {telemetry.damage.engine}%
          </Text>
          <Text className="absolute right-2 top-2 text-[10px] text-red-300">
            FW {telemetry.damage.frontWing}%
          </Text>
          <Text className="absolute bottom-2 right-2 text-[10px] text-red-300">
            RW {telemetry.damage.rearWing}%
          </Text>
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
