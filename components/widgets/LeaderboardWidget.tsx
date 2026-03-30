import { FlatList, Text, View } from 'react-native';
import { useTelemetry } from '@/TelemetryContext';
import { WidgetShell } from '@/components/widgets/WidgetShell';

export function LeaderboardWidget() {
  const { telemetry } = useTelemetry();

  return (
    <WidgetShell title="Leaderboard" subtitle="Gap · interval · last lap">
      <View className="mb-2 flex-row justify-between border-b border-slate-800/80 pb-2 px-0.5">
        <Text className="w-8 text-[9px] font-semibold uppercase tracking-wide text-zinc-500">Pos</Text>
        <Text className="w-14 text-[9px] font-semibold uppercase tracking-wide text-zinc-500">Driver</Text>
        <Text className="w-16 text-right text-[9px] font-semibold uppercase tracking-wide text-zinc-500">Gap</Text>
        <Text className="w-16 text-right text-[9px] font-semibold uppercase tracking-wide text-zinc-500">Int</Text>
        <Text className="w-[4.5rem] text-right text-[9px] font-semibold uppercase tracking-wide text-zinc-500">Lap</Text>
      </View>
      <FlatList
        data={telemetry.leaderboard}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const leader = item.position === 1;
          return (
            <View
              className={`mb-1.5 flex-row items-center justify-between rounded-xl border px-2 py-2 ${
                leader
                  ? 'border-red-900/50 bg-red-950/25'
                  : 'border-slate-800/80 bg-[#0c0c0c]'
              }`}>
              <Text
                className={`w-8 font-mono text-xs ${leader ? 'text-red-300' : 'text-zinc-300'}`}
                numberOfLines={1}>
                P{item.position}
              </Text>
              <Text className="w-14 font-semibold text-xs text-zinc-100" numberOfLines={1}>
                {item.code}
              </Text>
              <Text className="w-16 text-right font-mono text-[11px] text-zinc-400" numberOfLines={1}>
                {item.gap}
              </Text>
              <Text className="w-16 text-right font-mono text-[11px] text-zinc-500" numberOfLines={1}>
                {item.interval}
              </Text>
              <Text className="w-[4.5rem] text-right font-mono text-xs text-red-400/95" numberOfLines={1}>
                {item.lap}
              </Text>
            </View>
          );
        }}
      />
    </WidgetShell>
  );
}
