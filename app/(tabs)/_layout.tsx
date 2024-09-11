import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, StatusBar, View } from "react-native";
import { useUserContext } from "../context/UserContext";

export default function TabsLayout() {
    const { state: user } = useUserContext()

    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor='white' />
            <Tabs screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    backgroundColor: '#39a7bb',
                },
                tabBarActiveTintColor: '#FFF',
                tabBarInactiveTintColor: '#1e7585',
                tabBarShowLabel: false,
            }}>
                <Tabs.Screen name="Home"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome
                                name="home"
                                size={30}
                                color={focused ? '#FFF' : '#1e7585'}
                            />)
                    }}
                />
                <Tabs.Screen name="Search"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome
                                name="search"
                                size={30}
                                color={focused ? '#FFF' : '#1e7585'}
                            />)
                    }}
                />
                <Tabs.Screen name="Appointments"
                    options={{
                        title: '',
                        tabBarIcon: ({ focused }) => (
                            <View className="h-20 w-20 rounded-full border-2 border-darkBackGround relative bg-white mb-7">
                                <FontAwesome
                                    name="calendar"
                                    size={35}
                                    color='#1e7585'
                                    style={{ left: 22, top: 20 }}
                                />
                            </View>
                        )
                    }}
                />
                <Tabs.Screen name="Favorites"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome
                                name="heart"
                                size={30}
                                color={focused ? '#FFF' : '#1e7585'}
                            />)
                    }}
                />
                <Tabs.Screen name="Profile"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome
                                name="user"
                                size={32}
                                color={focused ? '#FFF' : '#1e7585'}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}