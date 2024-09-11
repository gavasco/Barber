import { Image, View } from "react-native";
import InputText from "./components/InputText";
import { useState } from "react";
import Buttons from "./components/Buttons";
import AuthService from "./API/Api";

export default function Login() {
    const { signUp } = AuthService()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignUp() {
        if (name !== '' || email !== '' || password !== '') {
            await signUp(name, email, password)
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
                icon="user"
                placeholder="Digite seu nome"
                value={name}
                onChangeText={e => setName(e)}
                placeholderColor="#268596"
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
            <Buttons text="Cadastrar" onPress={handleSignUp}/>
        </View>
    )
}