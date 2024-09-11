import { ActivityIndicator, RefreshControl, ScrollView, Text, TextInput, View } from "react-native";
import AuthService from "../API/Api";
import { useEffect, useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BarberCard from "../components/BarberCard";
import { useUserContext } from "../context/UserContext";
import AppointmentCard from "../components/AppointmentCard";

export default function Appointments () {
    const { getAppointments } = AuthService();
    const { appointmentsList } = useUserContext()

    const [loading, setLoading] = useState(false)
    const [empty, setEmpty] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    async function getAppointmentsList() {
        setLoading(true);
        await getAppointments()
        setLoading(false);
    }

    function onRefreshing () {
        setRefreshing(true);
        getAppointmentsList()
        setRefreshing(false);
    }

    useEffect(() => {
        getAppointments()
    }, [])

    return (
        <View className="flex-1 bg-backGround items-center px-5 mt-8 p-5">
            <View className="w-full ">
                <Text className="text-white text-2xl font-bold mb-1">Agendamentos</Text>
            </View>

            {appointmentsList.length === 0 && <Text className="text-lg items-center text-white font-semibold mt-5">
                Não há agendamentos
            </Text>}

            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefreshing} />
                }
            >
                <View className="mt-4">
                    {appointmentsList.map((item, k) =>
                        <AppointmentCard key={k} data={item} />
                    )}
                </View>
            </ScrollView>
        </View>
    )
}