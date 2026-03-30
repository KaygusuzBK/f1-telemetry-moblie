import type { PropsWithChildren } from 'react';
import { GripVertical } from 'lucide-react-native';
import { Text, View } from 'react-native';

type Props = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export function WidgetShell({ title, subtitle, children }: Props) {
  return (
    <View className="overflow-hidden rounded-2xl border border-slate-800/90 bg-zinc-950 shadow-lg shadow-black/40">
      <View className="absolute bottom-0 left-0 top-0 w-1 bg-red-600" />
      <View className="border-b border-slate-900/80 bg-[#0a0a0a] px-3 py-2.5 pl-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-2">
            <Text
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500"
              numberOfLines={1}>
              {title}
            </Text>
            {subtitle ? (
              <Text className="mt-0.5 text-[11px] text-zinc-400" numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>
          <View className="rounded-md border border-slate-800 bg-zinc-900/80 p-1">
            <GripVertical color="#71717a" size={15} />
          </View>
        </View>
      </View>
      <View className="p-3 pl-4">{children}</View>
    </View>
  );
}
