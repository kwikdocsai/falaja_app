import { Tabs } from 'expo-router';
import { Home, History, User, Diamond, BarChart2 } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#0f172a',
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(255, 255, 255, 0.05)',
                    paddingTop: 8,
                    height: 64,
                },
                tabBarActiveTintColor: '#3b82f6',
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? { borderBottomWidth: 2, borderBottomColor: '#3b82f6', paddingBottom: 4 } : {}}>
                            <Home size={24} color={color} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? { borderBottomWidth: 2, borderBottomColor: '#3b82f6', paddingBottom: 4 } : {}}>
                            <History size={24} color={color} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="usage"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? { borderBottomWidth: 2, borderBottomColor: '#3b82f6', paddingBottom: 4 } : {}}>
                            <BarChart2 size={24} color={color} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? { borderBottomWidth: 2, borderBottomColor: '#3b82f6', paddingBottom: 4 } : {}}>
                            <User size={24} color={color} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
