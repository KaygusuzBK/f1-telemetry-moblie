import { FlatList, Text, View } from 'react-native';
import { useTelemetry } from '@/TelemetryContext';
import { WidgetShell } from '@/components/widgets/WidgetShell';

export function LeaderboardWidget() {
  const { telemetry } = useTelemetry();

  return (
    <WidgetShell title="Leaderboard" subtitle="Race Pace">
      <View className="mb-2 flex-row justify-between px-1">
        <Text className="w-8 text-[10px] text-zinc-500">POS</Text>
        <Text className="w-14 text-[10px] text-zinc-500">DRV</Text>
        <Text className="w-16 text-right text-[10px] text-zinc-500">GAP</Text>
        <Text className="w-16 text-right text-[10px] text-zinc-500">INT</Text>
        <Text className="w-20 text-right text-[10px] text-zinc-500">LAP</Text>
      </View>
      <FlatList
        data={telemetry.leaderboard}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View className="mb-1 flex-row items-center justify-between rounded-lg border border-slate-900 bg-[#090909] px-2 py-1.5">
            <Text className="w-8 font-mono text-xs text-zinc-100" numberOfLines={1}>
              P{item.position}
            </Text>
            <Text className="w-14 font-semibold text-xs text-zinc-200" numberOfLines={1}>
              {item.code}
            </Text>
            <Text className="w-16 text-right font-mono text-xs text-zinc-300" numberOfLines={1}>
              {item.gap}
            </Text>
            <Text className="w-16 text-right font-mono text-xs text-zinc-400" numberOfLines={1}>
              {item.interval}
            </Text>
            <Text className="w-20 text-right font-mono text-xs text-red-400" numberOfLines={1}>
              {item.lap}
            </Text>
          </View>
        )}
      />
    </WidgetShell>
  );
}
