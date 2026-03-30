import { Text, View } from 'react-native';
import { useTelemetry } from '@/TelemetryContext';
import { WidgetShell } from '@/components/widgets/WidgetShell';

export function LapTimingWidget() {
  const { telemetry } = useTelemetry();

  return (
    <WidgetShell title="Lap Timing" subtitle="Sectors">
      <View className="gap-2">
        <View className="flex-row justify-between rounded-lg border border-slate-900 bg-[#090909] p-2">
          <Text className="text-xs text-zinc-400">Best Lap</Text>
          <Text className="font-mono text-xs text-purple-300">{telemetry.bestLap}</Text>
        </View>
        <View className="flex-row justify-between rounded-lg border border-slate-900 bg-[#090909] p-2">
          <Text className="text-xs text-zinc-400">Current Lap</Text>
          <Text className="font-mono text-xs text-zinc-200">{telemetry.currentLap}</Text>
        </View>
        <View className="flex-row gap-2">
          {telemetry.sectors.map((sector, index) => (
            <View key={`s-${index}`} className="flex-1 rounded-lg border border-slate-900 bg-[#090909] p-2">
              <Text className="text-[10px] text-zinc-500">S{index + 1}</Text>
              <Text className="font-mono text-xs text-zinc-100" numberOfLines={1}>
                {sector}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </WidgetShell>
  );
}
