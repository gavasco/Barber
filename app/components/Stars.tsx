import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
    stars: number
    showNumber: boolean
}

export default function Stars({ stars, showNumber }: Props) {

    let s = [0, 0, 0, 0, 0]

    let floor = Math.floor(stars)
    let left = stars - floor

    for (let i = 0; i < floor; i++) {
        s[i] = 2
        if (left) {
            s[i + 1] = 1
        }
    }

    return (
        <View className="flex-row items-center">
            {s.map((i, k) => (
                <View key={k} className="flex-row mr-1 my-2">
                    {i === 0 && <FontAwesome name="star-o" size={18} color="#FF9200" />}
                    {i === 1 && <FontAwesome name="star-half-empty" size={18} color="#FF9200" />}
                    {i === 2 && <FontAwesome name="star" size={18} color="#FF9200" />}
                </View>
            ))}
            {showNumber && <Text className="font-semibold ml-2 text-base">{stars}</Text>}
        </View>
    )
}