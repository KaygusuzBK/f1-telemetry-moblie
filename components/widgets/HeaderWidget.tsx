import { CloudSun, Flag, Timer } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { useTelemetry } from '@/TelemetryContext';
import { WidgetShell } from '@/components/widgets/WidgetShell';

export function HeaderWidget() {
  const { telemetry } = useTelemetry();

  return (
    <WidgetShell title="Session" subtitle="F1 25 — Live timing layout">
      <View className="gap-3">
        <View className="flex-row items-center justify-between gap-2">
          <View className="flex-row items-center gap-2.5">
            <View className="rounded-md border border-red-900/60 bg-red-950/40 p-1.5">
              <Flag size={16} color="#f87171" />
            </View>
            <View>
              <Text className="text-[10px] uppercase tracking-widest text-zinc-500">Telemetry</Text>
              <Text className="text-base font-semibold tracking-tight text-zinc-50" numberOfLines={1}>
                F1 DASHBOARD
              </Text>
            </View>
          </View>
          <View className="items-end rounded-lg border border-slate-800 bg-zinc-900/50 px-2.5 py-1.5">
            <View className="flex-row items-center gap-1">
              <Timer size={12} color="#a1a1aa" />
              <Text className="font-mono text-xs text-zinc-200">{telemetry.sessionClock}</Text>
            </View>
            <Text className="mt-0.5 text-[9px] text-zinc-500">Session clock</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between rounded-xl border border-slate-800/90 bg-[#080808] px-3 py-2.5">
          <View className="flex-1 pr-2">
            <Text className="text-[10px] uppercase text-zinc-500">Circuit</Text>
            <Text className="mt-0.5 text-sm font-medium text-zinc-100" numberOfLines={1}>
              {telemetry.track}
            </Text>
          </View>
          <View className="h-8 w-px bg-slate-800" />
          <View className="flex-row items-center gap-1.5 pl-2">
            <CloudSun size={14} color="#eab308" />
            <View>
              <Text className="text-[10px] uppercase text-zinc-500">Conditions</Text>
              <Text className="font-mono text-xs text-zinc-300" numberOfLines={1}>
                {telemetry.weather}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </WidgetShell>
  );
}
