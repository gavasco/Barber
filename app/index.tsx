import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import AuthService from "./API/Api";

export default function Preload() {

    const { checkToken } = AuthService()

    async function checkingToken() {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            await checkToken(token)
        } else {
            router.replace('Login')
        }
    }

    useEffect(() => {
        checkingToken()
    }, [])

    return (
        <View className="flex-1 bg-backGround justify-center items-center px-5">
            <Image className="w-60 h-60"
                source={require('../assets/barber.png')}
            />
            <ActivityIndicator size="large" color="#FFF" className="mt-10" />
        </View>
    )
}