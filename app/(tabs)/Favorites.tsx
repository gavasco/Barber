import { ActivityIndicator, RefreshControl, ScrollView, Text, TextInput, View } from "react-native";
import AuthService from "../API/Api";
import { useEffect, useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BarberCard from "../components/BarberCard";
import { useUserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const list = [
    {
        "avatar": "https://api.b7web.com.br/devbarber/media/avatars/2.png",
        "distance": 0.691000000000108,
        "id": 5,
        "latitude": "-23.5530907",
        "longitude": "-46.6682795",
        "name": "Pedro Diniz",
        "stars": 4.5
    },
    { "avatar": "https://api.b7web.com.br/devbarber/media/avatars/3.png", "distance": 0.691000000000108, "id": 7, "latitude": "-23.5730907", "longitude": "-46.6682795", "name": "Ronaldo Sousa", "stars": 2.9 },
    { "avatar": "https://api.b7web.com.br/devbarber/media/avatars/4.png", "distance": 1.4430774243756335, "id": 9, "latitude": "-23.5530907", "longitude": "-46.6482795", "name": "Leticia Diniz", "stars": 3.3 },
    { "avatar": "https://api.b7web.com.br/devbarber/media/avatars/2.png", "distance": 1.5201936184696858, "id": 8, "latitude": "-23.5830907", "longitude": "-46.6582795", "name": "Ronaldo Gomes", "stars": 2.1 },
    { "avatar": "https://api.b7web.com.br/devbarber/media/avatars/3.png", "distance": 1.9001792731522114, "id": 2, "latitude": "-23.5630907", "longitude": "-46.6982795", "name": "Amanda Sousa", "stars": 4.7 }
]

export default function Favorites () {
    const { getFavorites } = AuthService();
    const { favoriteList }: { favoriteList: number[] } = useUserContext()

    const [loading, setLoading] = useState(false)
    const [empty, setEmpty] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    async function getFavoritesList() {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        await getFavorites(token)
        
        setLoading(false);
    }

    function onRefreshing () {
        setRefreshing(true);
        getFavoritesList()
        setRefreshing(false);
        console.log(favoriteList)
    }

    useEffect(() => {
        getFavoritesList()
    }, [])

    return (
        <View className="flex-1 bg-backGround items-center px-5 mt-8 p-5">
            <View className="w-full ">
                <Text className="text-white text-2xl font-bold mb-1">Favoritos</Text>
            </View>

            {!loading && list.length === 0 && <Text className="text-lg items-center text-white font-semibold mt-5">
                Não há favoritos
            </Text>}

            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefreshing} />
                }
            >
                <View className="mt-4">
                    
                    {list.map((item, k) =>{
                        if (favoriteList.includes(item.id)) {
                            return <BarberCard key={k} data={item} />
                        }
                    })}
                    
                </View>
            </ScrollView>
            
        </View>
    )
}