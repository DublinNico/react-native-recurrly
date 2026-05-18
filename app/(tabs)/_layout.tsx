import {Tabs} from "expo-router";
import {tabs} from "@/constants/data";
import {View} from "react-native";
import { colors, components } from '@/constants/theme'
import clsx from "clsx";
import {Image} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabBar = components.tabBar;
const iconSize = tabBar.iconFrame * 0.98;
const barHeight = tabBar.height * 0.98;

const TabIcon = ({focused, icon}: TabIconProps) => {
    return (
        <View className="tabs-icon">
            <View style={focused ? { backgroundColor: colors.accent, borderRadius: 999, padding: 6 } : undefined}>
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{ width: iconSize, height: iconSize }}
                />
            </View>
        </View>
    );
};
const TabLayout = () => {
        const insets = useSafeAreaInsets();

        return (
            <Tabs
                screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarStyle: {
                                position: 'absolute',
                                bottom: Math.max(insets.bottom, tabBar.horizontalInset),
                                height: barHeight,
                                marginHorizontal: tabBar.horizontalInset,
                                borderRadius: tabBar.radius,
                                backgroundColor: colors.primary,
                                borderTopWidth: 0,
                                elevation: 0,
                        },
                        tabBarItemStyle: {
                                paddingVertical: barHeight / 2 - iconSize / 1.6
                        },
                        tabBarIconStyle: {
                                width: iconSize,
                                height: iconSize,
                                alignItems: 'center'
                        }
            }}
            >
                    {tabs.map((tab) => (
                        <Tabs.Screen
                            key={tab.name}
                            name={tab.name}
                            options={{
                                    title: tab.title,
                                    tabBarIcon: ({focused}) => (
                                        <TabIcon focused={focused} icon={tab.icon} />
                                    )
                            }}/>
                    ))}
                    <Tabs.Screen name="subscriptions/[id]" options={{ href: null }} />
            </Tabs>
        )
}

export default TabLayout;
