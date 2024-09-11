import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import Stars from "./Stars";
import { router } from "expo-router";

type Props = {
    data: {
        avatar: string;
        distance: number;
        id: number;
        latitude: string;
        longitude: string;
        name: string;
        stars: number;
    }
}

function handleSeeProfile (barber: any) {
    router.navigate({
        pathname: `BarberProfile/${barber.id}`,
        params: { barber: JSON.stringify(barber) }
    })
}

export default function BarberCard({ data }: Props) {
    return (
        <View className="flex-1 bg-white items-center p-3 flex-row mb-4 rounded-xl w-80">
            <Image className="w-24 h-24 rounded-xl"
                source={{ uri: data.avatar }}
            />
            <View className="ml-6 justify-between h-full">
                <Text className="font-bold text-lg ">
                    {data.name}
                </Text>
                <Stars stars={data.stars} showNumber={true} />
                <TouchableOpacity className="border border-[#4EADBE] w-20 items-center rounded-xl p-1"
                    onPress={() => handleSeeProfile(data)}
                >
                    <Text className="text-darkBackGround">Ver Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}