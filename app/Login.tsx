import { Image, Text, View } from "react-native";
import InputText from "./components/InputText";
import { useState } from "react";
import Buttons from "./components/Buttons";
import { router } from "expo-router";
import AuthService from "./API/Api";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = AuthService()

    async function handleLogin() {
        if (email !== '' || password !== '') {
            await login(email, password)
        } else {
            alert('Preencha todos os campos')
        }
    }

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
            <Buttons text="Entrar" onPress={handleLogin} />
            <Text className="text-white text-base  self-end mt-1" 
                onPress={() => router.replace('RecoverPassword')}
            >
                Esqueceu a senha?
            </Text>
            <Text className="text-darkBackGround mt-14 text-lg">
                Ainda não possui conta? 
                    <Text className="font-bold"
                        onPress={() => router.replace('SignUp')}
                    > 
                        Cadastre-se 
                    </Text>
            </Text>
        </View>
    )
}