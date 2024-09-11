import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Providers } from "./context/Providers";

export default function RootLayout() {
    return (
        <Providers>
            <StatusBar barStyle='dark-content' backgroundColor='white'/>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="Login" />
                <Stack.Screen name="SignUp" />
                <Stack.Screen name="RecoverPassword" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="BarberProfile/[id]" />
            </Stack>
        </Providers>

    )
}