import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import Stars from "./Stars";
import { router } from "expo-router";

type Props = {
    data: {
        barber: {
            avatar: string;
            distance: number;
            id: number;
            latitude: string;
            longitude: string;
            name: string;
            stars: number;
        },
        datetime: string;
        id: number
        service: {
            id: number;
            id_barber: number;
            name: string;
            price: number;
        }
    }
}

function check() {
   
}

export default function AppointmentCard({ data }: Props) {
    const date = data.datetime.split(' ')[0]
    const  [year, month, day]  = date.split('-')

    return (
        <View className="flex-1 bg-white p-3 mb-4 rounded-xl w-80">
            <View className="flex-row items-center">
                <Image className="w-20 h-20 rounded-xl"
                    source={{ uri: data.barber.avatar }}
                />
                <Text className="text-xl font-bold ml-5" onPress={() => console.log(date)}>{data.barber.name}</Text>
            </View>
            <View className="flex-row justify-between mt-2">
                <Text className="font-bold text-base ">{data.service.name}</Text>
                <Text className="text-base font-bold">R$ {data.service.price.toFixed(2)}</Text>
            </View>
            <View className="justify-between flex-row mt-2">
                <Text className="font-bold text-white text-base px-2 py-1 rounded-xl bg-backGround">
                    {`${day}/${month}/${year}`}
                </Text>
                <Text className="font-bold text-white text-base px-2 py-1 rounded-xl bg-backGround">
                    {data.datetime.split(' ')[1].substring(0,5)}
                </Text>
            </View>
        </View>
    )
}