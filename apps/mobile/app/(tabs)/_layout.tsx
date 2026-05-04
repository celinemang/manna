import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import Svg, { Path } from "react-native-svg";

function Icon({ d, color }: { d: string; color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d={d} stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3A2E22",
        tabBarInactiveTintColor: "#8A7A66",
        tabBarStyle: {
          backgroundColor: "#F4ECDF",
          borderTopColor: "#D9CBB1",
        },
        tabBarLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: 10.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("nav.today"),
          tabBarIcon: ({ color }) => (
            <Icon d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="feelings"
        options={{
          title: t("nav.feelings"),
          tabBarIcon: ({ color }) => (
            <Icon d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 6.5-7 11-7 11z" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: t("nav.saved"),
          tabBarIcon: ({ color }) => <Icon d="M6 4h12v17l-6-4-6 4z" color={color} />,
        }}
      />
      <Tabs.Screen
        name="you"
        options={{
          title: t("nav.you"),
          tabBarIcon: ({ color }) => (
            <Icon
              d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
