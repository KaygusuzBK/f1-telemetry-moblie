import { Text, View } from 'react-native';
import { useTelemetry } from '@/TelemetryContext';
import { WidgetShell } from '@/components/widgets/WidgetShell';

export function LapTimingWidget() {
  const { telemetry } = useTelemetry();

  return (
    <WidgetShell title="Lap timing" subtitle="Best · current · sectors">
      <View className="gap-2.5">
        <View className="flex-row gap-2">
          <View className="flex-1 rounded-xl border border-slate-800 bg-[#0c0c0c] p-3">
            <Text className="text-[10px] uppercase tracking-wide text-zinc-500">Best lap</Text>
            <Text className="mt-1 font-mono text-lg text-fuchsia-300/95">{telemetry.bestLap}</Text>
          </View>
          <View className="flex-1 rounded-xl border border-slate-800 bg-[#0c0c0c] p-3">
            <Text className="text-[10px] uppercase tracking-wide text-zinc-500">Current</Text>
            <Text className="mt-1 font-mono text-lg text-zinc-100">{telemetry.currentLap}</Text>
          </View>
        </View>
        <View className="flex-row gap-2">
          {telemetry.sectors.map((sector, index) => (
            <View
              key={`s-${index}`}
              className="flex-1 rounded-xl border border-slate-800 bg-[#0c0c0c] p-2.5">
              <View className="mb-1 flex-row items-center justify-between">
                <Text className="text-[10px] font-semibold uppercase text-zinc-500">S{index + 1}</Text>
                <View className="h-1 w-1 rounded-full bg-red-600" />
              </View>
              <Text className="font-mono text-sm text-zinc-100" numberOfLines={1}>
                {sector}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </WidgetShell>
  );
}
