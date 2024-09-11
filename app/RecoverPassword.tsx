import { Image, SafeAreaView, Text, View } from "react-native";
import InputText from "./components/InputText";
import { useState } from "react";
import Buttons from "./components/Buttons";
import { router } from "expo-router";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    return (
        <View className="flex-1 items-center justify-center bg-backGround p-6">
            <Image className="w-60 h-60 mb-10"
                source={require('../assets/barber.png')}
            />
            <InputText
                icon="envelope"
                placeholder="Digite seu email"
                value={email}
                onChangeText={e => setEmail(e)}
                placeholderColor="#268596"
            />
            <InputText
                icon="lock"
                placeholder="Digite sua senha"
                value={password}
                onChangeText={e => setPassword(e)}
                password={true}
                placeholderColor="#268596"
            />
            <InputText
                icon="lock"
                placeholder="Digite uma senha nova"
                value={newPassword}
                onChangeText={e => setNewPassword(e)}
                password={true}
                placeholderColor="#268596"
            />
            <Buttons text="Recuperar senha" onPress={() => router.replace('Login')} />
        </View>
    )
}