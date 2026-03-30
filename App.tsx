import 'react-native-gesture-handler';
import './global.css';

import { ComponentType, useMemo, useState } from 'react';
import { SafeAreaView, Text, useWindowDimensions, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TelemetryProvider, useTelemetry } from '@/TelemetryContext';
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
  const { layout, moveWidget } = useTelemetry();
  const { width } = useWindowDimensions();
  const [editingLayout, setEditingLayout] = useState(false);

  const itemWidth = width >= 900 ? '49%' : '100%';
  const listData = useMemo(() => layout.map((id: WidgetId) => ({ id })), [layout]);

  return (
    <SafeAreaView className="flex-1 bg-[#050505]">
      <View className="px-3 pb-2 pt-3">
        <Text className="text-center text-sm text-zinc-300" numberOfLines={1}>
          F1 25 Telemetry Dashboard - widget duzeni icin karti basili tut ve surukle
        </Text>
        <Text
          onPress={() => setEditingLayout((v) => !v)}
          className="mt-2 self-center rounded-full border border-slate-800 px-3 py-1 text-xs text-zinc-400"
          numberOfLines={1}>
          {editingLayout ? 'Duzenleme Acik' : 'Duzenleme Kapali'}
        </Text>
      </View>

      <DraggableFlatList
        // Explicit item typing keeps strict TypeScript happy.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data={listData}
        keyExtractor={(item) => item.id}
        activationDistance={editingLayout ? 8 : 9999}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 30 }}
        onDragEnd={({ data }: { data: Array<{ id: WidgetId }> }) =>
          moveWidget(data.map((item) => item.id))
        }
        renderItem={({ item, drag, isActive }: { item: { id: WidgetId }; drag: () => void; isActive: boolean }) => {
          const CurrentWidget = WIDGETS[item.id];

          return (
            <ScaleDecorator>
              <View
                className={`${isActive ? 'opacity-80' : 'opacity-100'} mb-2`}
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
      <TelemetryProvider>
        <DashboardScreen />
      </TelemetryProvider>
    </GestureHandlerRootView>
  );
}
