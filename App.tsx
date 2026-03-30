import 'react-native-gesture-handler';
import './global.css';

import { ComponentType, useEffect, useMemo, useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TelemetryProvider, useTelemetry } from '@/TelemetryContext';
import { useUdpTelemetry } from '@/hooks/useUdpTelemetry';
import { CarStatusWidget } from '@/components/widgets/CarStatusWidget';
import { HeaderWidget } from '@/components/widgets/HeaderWidget';
import { LapTimingWidget } from '@/components/widgets/LapTimingWidget';
import { LeaderboardWidget } from '@/components/widgets/LeaderboardWidget';
import { TelemetryGaugeWidget } from '@/components/widgets/TelemetryGaugeWidget';
import { TrackMapWidget } from '@/components/widgets/TrackMapWidget';
import type { WidgetId } from '@/TelemetryContext';

const WIDGETS: Record<string, ComponentType> = {
  header: HeaderWidget,
  telemetryGauge: TelemetryGaugeWidget,
  leaderboard: LeaderboardWidget,
  lapTiming: LapTimingWidget,
  carStatus: CarStatusWidget,
  trackMap: TrackMapWidget,
};

function DashboardScreen() {
  const { layout, moveWidget, applyLiveTelemetryPatch, udpConnected, setUdpConnected } = useTelemetry();
  const { width } = useWindowDimensions();
  const [editingLayout, setEditingLayout] = useState(false);
  const [udpEnabled, setUdpEnabled] = useState(true);

  const udpState = useUdpTelemetry({
    port: 20777,
    enabled: udpEnabled,
    onTelemetryPatch: applyLiveTelemetryPatch,
  });

  useEffect(() => {
    setUdpConnected(udpState.connected);
  }, [setUdpConnected, udpState.connected]);

  const itemWidth = width >= 900 ? '49%' : '100%';
  const listData = useMemo(() => layout.map((id: WidgetId) => ({ id })), [layout]);

  return (
    <SafeAreaView className="flex-1 bg-[#030303]" edges={['top', 'left', 'right']}>
      <View className="border-b border-slate-900/90 bg-[#050505] px-3 pb-3 pt-2">
        <View className="mb-2 h-px w-full bg-red-900/25" />
        <View className="h-0.5 w-16 self-center rounded-full bg-red-600" />
        <Text className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-500">
          F1 Telemetry
        </Text>
        <Text
          className="mt-1 text-center text-sm font-semibold text-zinc-100"
          numberOfLines={2}>
          Widget sırasını değiştirmek için kartı basılı tutup sürükleyin
        </Text>
        <View className="mt-3 flex-row flex-wrap items-center justify-center gap-2">
          <View className="rounded-full border border-slate-800 bg-zinc-900/70 px-3 py-1.5">
            <Text className="text-center font-mono text-[10px] text-zinc-400" numberOfLines={1}>
              UDP {udpEnabled ? 'ON' : 'OFF'} · {udpConnected ? 'LIVE' : 'IDLE'} · :20777
            </Text>
          </View>
          <Text
            onPress={() => setEditingLayout((v) => !v)}
            className="rounded-full border border-slate-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200"
            numberOfLines={1}>
            {editingLayout ? 'Düzenleme: açık' : 'Düzenleme: kapalı'}
          </Text>
          <Text
            onPress={() => setUdpEnabled((v) => !v)}
            className="rounded-full border border-slate-700 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-300"
            numberOfLines={1}>
            {udpEnabled ? 'UDP kapat' : 'UDP aç'}
          </Text>
        </View>
        {udpState.error ? (
          <Text className="mt-2 text-center text-[11px] leading-4 text-red-400/95" numberOfLines={3}>
            {udpState.error}
          </Text>
        ) : null}
      </View>

      <DraggableFlatList
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data={listData}
        keyExtractor={(item) => item.id}
        activationDistance={editingLayout ? 8 : 9999}
        contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 12, paddingBottom: 36 }}
        onDragEnd={({ data }: { data: Array<{ id: WidgetId }> }) =>
          moveWidget(data.map((item) => item.id))
        }
        renderItem={({ item, drag, isActive }: { item: { id: WidgetId }; drag: () => void; isActive: boolean }) => {
          const CurrentWidget = WIDGETS[item.id];

          return (
            <ScaleDecorator>
              <View
                className={`${isActive ? 'scale-[0.98] opacity-90' : 'opacity-100'} mb-3`}
                style={{ width: itemWidth, alignSelf: 'center' }}>
                <View onTouchStart={drag}>
                  <CurrentWidget />
                </View>
              </View>
            </ScaleDecorator>
          );
        }}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TelemetryProvider>
          <DashboardScreen />
        </TelemetryProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
