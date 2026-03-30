import { CloudSun, Flag, Timer } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { useTelemetry } from '@/TelemetryContext';
import { WidgetShell } from '@/components/widgets/WidgetShell';

export function HeaderWidget() {
  const { telemetry } = useTelemetry();
  const clock = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  return (
    <WidgetShell title="Header" subtitle="F1 25 Weekend">
      <View className="gap-3">
        <View className="flex-row items-center justify-between gap-2">
          <View className="flex-row items-center gap-2">
            <Flag size={18} color="#ef4444" />
            <Text className="text-base font-semibold text-zinc-100" numberOfLines={1}>
              F1 TELEMETRY LIVE
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Timer size={14} color="#a1a1aa" />
            <Text className="font-mono text-xs text-zinc-300">{clock}</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between rounded-xl border border-slate-900 bg-[#050505] p-2">
          <Text className="text-sm text-zinc-200" numberOfLines={1}>
            {telemetry.track}
          </Text>
          <View className="flex-row items-center gap-1">
            <CloudSun size={14} color="#facc15" />
            <Text className="font-mono text-xs text-zinc-300">{telemetry.weather}</Text>
          </View>
        </View>
      </View>
    </WidgetShell>
  );
}
