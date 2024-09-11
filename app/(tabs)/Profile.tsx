import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AuthService from "../API/Api";

const list = { "avatar": "https://api.b7web.com.br/devbarber/media/avatars/4.png" }

export default function Profile() {

    const { logout } = AuthService();

    async function hangleLogout() {
        await AsyncStorage.removeItem('token');
        router.replace('Login');
    }

    return (
        <View className="flex-1 bg-backGround items-center px-6 mt-8">
            <Image className="h-48 w-48 rounded-full mt-16" style={{ borderWidth: 1, borderColor: '#fff' }}
                source={{ uri: list.avatar }}
            />
            <View className="justify-start mt-6">
                <Text className="text-darkBackGround font-semibold text-xl mb-1">
                    Nome: <Text className="text-white"> Gabriel Vasco </Text >
                </Text>
                <Text className="text-darkBackGround font-semibold text-xl mb-1">
                    Endereço: <Text className="text-white"> Rua Walhmstrap </Text >    nº <Text className="text-white"> 824</Text>
                </Text>
                <Text className="text-darkBackGround font-semibold text-xl mb-1">
                    Cidade: <Text className="text-white"> Hamburg / Alemanha</Text >
                </Text>
                <Text className="text-darkBackGround font-semibold text-xl mb-1">
                    Telefone: <Text className="text-white"> (54) 95485-5278</Text >
                </Text>
            </View>
            <TouchableOpacity className="mt-10 bg-darkBackGround w-40 py-2 rounded-full">
                <Text onPress={hangleLogout} className="text-white font-semibold text-xl text-center">Sair</Text>
            </TouchableOpacity>
        </View>
    )
}