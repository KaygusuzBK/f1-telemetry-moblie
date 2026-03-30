import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { WidgetShell } from '@/components/widgets/WidgetShell';

export function TrackMapWidget() {
  return (
    <WidgetShell title="Track map" subtitle="Bahrain International Circuit">
      <View className="items-center overflow-hidden rounded-2xl border border-slate-800 bg-[#0a0a0a] px-2 py-4">
        <Svg width={280} height={150} viewBox="0 0 280 150">
          <Path
            d="M28 82 C30 34, 102 26, 124 48 C138 62, 158 63, 182 54 C228 38, 254 65, 240 100 C228 130, 188 130, 174 112 C160 94, 134 94, 118 108 C84 136, 30 126, 28 82 Z"
            stroke="#3f3f46"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <Path
            d="M28 82 C30 34, 102 26, 124 48 C138 62, 158 63, 182 54 C228 38, 254 65, 240 100 C228 130, 188 130, 174 112 C160 94, 134 94, 118 108 C84 136, 30 126, 28 82 Z"
            stroke="#e4e4e7"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <Path
            d="M41 82 C42 48, 99 43, 118 57 C135 70, 161 70, 187 62 C222 51, 238 71, 227 96 C216 118, 190 116, 180 103 C166 83, 131 82, 109 97 C84 114, 43 108, 41 82 Z"
            stroke="#dc2626"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </Svg>
        <Text className="mt-2 text-center text-[11px] text-zinc-500" numberOfLines={2}>
          Ideal line (red) — T1–T4 traction zone
        </Text>
      </View>
    </WidgetShell>
  );
}
