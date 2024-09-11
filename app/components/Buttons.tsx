import { Text, TouchableOpacity } from "react-native";

type Props = {
    text: string;
    onPress: () => void;
}

export default function Buttons ({ text, onPress }: Props) {
    return (
        <TouchableOpacity className="bg-darkBackGround w-full rounded-full items-center justify-center h-14"
            onPress={onPress}
        >
            <Text className="text-white text-xl">{text}</Text>
        </TouchableOpacity>
    )
}