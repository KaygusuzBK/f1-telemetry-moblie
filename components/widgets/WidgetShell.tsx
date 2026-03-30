import type { PropsWithChildren } from 'react';
import { GripVertical } from 'lucide-react-native';
import { Text, View } from 'react-native';

type Props = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export function WidgetShell({ title, subtitle, children }: Props) {
  return (
    <View className="rounded-2xl border border-slate-900 bg-zinc-950 p-3">
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-1 pr-2">
          <Text className="text-xs uppercase tracking-widest text-zinc-500" numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text className="text-[11px] text-zinc-400" numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <GripVertical color="#71717a" size={16} />
      </View>
      {children}
    </View>
  );
}
