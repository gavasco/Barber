import {  TextInput, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

type FontAwesomeIcons = keyof typeof FontAwesome.glyphMap;

type Props = {
    icon: FontAwesomeIcons;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    password?: boolean;
    placeholderColor?: string
}

export default function InputText ({ icon, placeholder, value, onChangeText, password, placeholderColor }: Props) {
    return (
        <View className="flex-row bg-lightBackGround w-full rounded-full items-center h-14 px-5 mb-3">
            <FontAwesome  name={icon} size={24} color="#268596"/>
            <TextInput className="ml-5 text-base text-darkBackGround"
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
                placeholderTextColor={placeholderColor}
                selectionColor='#FFF'
            />
        </View>
    )
}