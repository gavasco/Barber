import { ActivityIndicator, ScrollView, Text, TextInput, View } from "react-native";
import AuthService from "../API/Api";
import { useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BarberCard from "../components/BarberCard";
import { useUserContext } from "../context/UserContext";

export default function Search() {
    const { search } = AuthService();
    const { list } = useUserContext()

    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [empty, setEmpty] = useState(false)

    async function searchBarbers() {
        setLoading(true);
        if (searchText != '') {
            await search(searchText)
        }
        if (list.length === 0) {
            setEmpty(true)
        }
        setLoading(false);
        
    }

    return (
        <View className="flex-1 bg-backGround items-center px-5 mt-8 p-5">
            <View className="bg-darkBackGround py-2 px-3 w-full rounded-full flex-row items-center">
                <FontAwesome name="search" size={20} color="#FFF" />
                <TextInput className="text-base ml-3 text-white"
                    placeholder="Digite o nome do barbeiro"
                    placeholderTextColor='#FFF'
                    selectionColor='#FFF'
                    value={searchText}
                    onChangeText={t => setSearchText(t)}
                    onEndEditing={searchBarbers}
                    returnKeyType="search"
                    autoFocus
                    selectTextOnFocus
                />
            </View>

            {empty && list.length === 0 && <Text className="text-lg items-center text-white font-semibold mt-5">
                Não acharmos nenhum barbeiro com o nome "{searchText}"
            </Text>}

            <ScrollView showsVerticalScrollIndicator={false}>
                {loading && <ActivityIndicator size="large" color="#FFF" />}
                <View className="mt-4">
                    {list.map((item, k) =>
                        <BarberCard key={k} data={item} />
                    )}
                </View>
            </ScrollView>
            
        </View>
    )
}