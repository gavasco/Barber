import { ActivityIndicator, Platform, RefreshControl, ScrollView, Text, TextInput, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";
import { useEffect, useState } from "react";

import * as Location from 'expo-location';
import AuthService from "../API/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../context/UserContext";
import { Barbers } from "../interface/Barbers";
import BarberCard from "../components/BarberCard";

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

export default function Home() {
    const { getBarbers } = AuthService()
    const { barbersList }: { barbersList: Barbers[] } = useUserContext();

    const [locationText, setLocationText] = useState(barbersList.length ? barbersList[0].loc : '')
    const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    async function handleLocationFinder() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permissão para acessar a localização negada');
            return;
        }
        setLoading(true);
        setLocationText('');

        let location = await Location.getCurrentPositionAsync({});
        setCoords(location.coords);
        setLoading(false);
    }

    async function getBarbersList() {
        setLoading(true);

        let lat = null;
        let lng = null;
        
        if (coords) {
            lat = coords.latitude;
            lng = coords.longitude;
        }
        
        const token = await AsyncStorage.getItem('token');
        if (token) {
            await getBarbers(token, lat, lng, locationText);
        } else {
            console.log('Token não encontrado');
        }
        setLoading(false);
    }

    useEffect(() => {
        getBarbersList();
    }, [])

    function onRefresh () {
        setRefreshing(true);
        getBarbersList();
        setRefreshing(false)
    }

    async function handleLocationSearch () {
        setCoords(null)
        getBarbersList()
    }

    return (
        <ScrollView className="flex-1 bg-backGround"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View className="mt-10 p-5">
                <View className="flex-row items-center justify-between">
                    <Text className="text-white text-2xl font-bold w-48">Encontre o seu barbeiro favorito</Text>
                    <FontAwesome name="search" size={25} color="#FFF" style={{ marginRight: 20 }}
                        onPress={() => router.navigate('Search')}
                    />
                </View>
                <View className="flex-row mb-4 h-16 items-center mt-6 rounded-full px-5 justify-between  bg-darkBackGround">
                    <TextInput className="text-base text-white"
                        placeholder="Onde você está?"
                        placeholderTextColor='#FFF'
                        selectionColor='#FFF'
                        value={locationText}
                        onChangeText={t => setLocationText(t)}
                        onEndEditing={handleLocationSearch}
                    />
                    <FontAwesome name="map-marker" size={30} color="#FFF" style={{ marginRight: 10 }}
                        onPress={handleLocationFinder}
                    />
                </View>

                {loading && <ActivityIndicator size="large" color="#FFF" />}

                <View className="items-center">
                    {list.map(item =>
                        <BarberCard key={item.id} data={item} />
                    )}
                </View>
            </View>
        </ScrollView>
    );
}
