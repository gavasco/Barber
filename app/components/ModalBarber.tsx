import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BarberProfile } from "../interface/BarberProfile";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import AuthService from "../API/Api";

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

type Props = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedService: null
    barberInfo: BarberProfile | null
}

export default function ModalBarber({ setShowModal, selectedService, barberInfo }: Props) {
    const { setAppointment } = AuthService()

    const choosedService = selectedService !== null ? barberInfo?.data.services[selectedService]?.id : null
    const BarberID = barberInfo?.data.id
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(0);
    const [listDays, setListDays] = useState<{ status: boolean; weekday: string; number: number; }[]>([])
    const [listHours, setListHours] = useState([])

    useEffect(() => {
        let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
        let newListDays = [];

        for (let i = 1; i < daysInMonth; i++) {
            let d = new Date(selectedYear, selectedMonth, i)
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            let formattedMonth = month < 10 ? '0' + month : month;
            let formattedDay = day < 10 ? '0' + day : day;
            let selDate = `${year}-${formattedMonth}-${formattedDay}`

            let availability = barberInfo?.data.available.filter(d => d.date === selDate)

            newListDays.push({
                status: availability?.length ?? 0 > 0 ? true : false,
                weekday: days[d.getDay()],
                number: i
            })
        }
        setListDays(newListDays)
        setSelectedDay(0)
        setSelectedHour(0)
        setListHours([])
    }, [selectedMonth, selectedYear])

    useEffect(() => {
        if (selectedDay > 0) {
            let d = new Date(selectedYear, selectedMonth, selectedDay)
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            let formattedMonth = month < 10 ? '0' + month : month;
            let formattedDay = day < 10 ? '0' + day : day;
            let selDate = `${year}-${formattedMonth}-${formattedDay}`

            let availability = barberInfo?.data.available.filter(d => d.date === selDate)

            if (availability && availability.length > 0) {
                setListHours(availability[0].hours)
            }
        }
        setSelectedHour(0)
    }, [selectedDay])

    useEffect(() => {
        let today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth())
        setSelectedDay(today.getDate())
    }, [])

    function handleLeftClick() {
        let mountDate = new Date(selectedYear, selectedMonth, 1)
        mountDate.setMonth(mountDate.getMonth() - 1)
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth())
        setSelectedDay(0)
    }

    function handleRightClick() {
        let mountDate = new Date(selectedYear, selectedMonth, 1)
        mountDate.setMonth(mountDate.getMonth() + 1)
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth())
        setSelectedDay(0)
    }

    async function handleFinishClick () {
        if (choosedService && BarberID && selectedYear > 0 && selectedMonth > 0 && selectedDay > 0 ) {
            await setAppointment(BarberID, choosedService, selectedYear, (selectedMonth + 1), selectedDay, selectedHour)
        } else {
            console.log('Preencha todos os campos')
        }
        setShowModal(false)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
        >
            <View className="bg-blackTransparent flex-1 justify-end">
                <View className=" bg-lightBackGround rounded-t-3xl p-4">
                    <FontAwesome name="chevron-down" size={24} color="#000" onPress={() => setShowModal(false)} />
                    <View className="bg-white flex-row rounded-2xl mt-4 p-2 items-center">
                        <Image className="w-20 h-20 rounded-2xl "
                            source={{ uri: barberInfo?.data.avatar }}
                        />
                        <Text className="text-2xl font-bold ml-5">{barberInfo?.data.name}</Text>
                    </View>

                    <View className="bg-white flex-row rounded-2xl mt-4 p-3 items-center justify-between">
                        {selectedService !== null && (
                            <Text className="font-bold text-lg">{barberInfo?.data.services[selectedService].name}</Text>
                        )}
                        {selectedService !== null && (
                            <Text className="font-bold text-lg">R$ {barberInfo?.data.services[selectedService].price}</Text>
                        )}
                    </View>

                    <View className="bg-white rounded-2xl mt-4 p-3 items-center justify-between mb-4">
                        <View className="flex-row items-center justify-between mb-3">
                            <TouchableOpacity className="items-center w-20">
                                <FontAwesome name="chevron-left" size={24} color='#000' onPress={handleLeftClick} />
                            </TouchableOpacity>
                            <Text className="font-bold text-xl">
                                {months[selectedMonth]} {selectedYear}
                            </Text>
                            <TouchableOpacity className="w-20 items-center">
                                <FontAwesome name="chevron-right" size={24} color='#000' onPress={handleRightClick} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {listDays && listDays.map((day, index) =>
                                <TouchableOpacity className="items-center px-2 py-1 rounded-xl"
                                    style={{
                                        opacity: day.status ? 1 : 0.2,
                                        backgroundColor: day.number === selectedDay ? '#63C2D1' : '#fff',
                                    }}
                                    key={index}
                                    onPress={() => day.status ? setSelectedDay(day.number) : null}
                                >
                                    <Text className="text-base font-semibold w-10 text-center "
                                        style={{ color: day.number === selectedDay ? '#fff' : '#000' }}
                                    >
                                        {day.weekday}
                                    </Text>
                                    <Text className="text-base font-semibold w-10 text-center"
                                        style={{ color: day.number === selectedDay ? '#fff' : '#000' }}
                                    >
                                        {day.number}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                    </View>
                    {listHours.length > 0 && listHours && selectedDay > 0 &&
                        <View className="bg-white rounded-2xl mb-4 p-4  items-center justify-between">
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {listHours.map((hour, index) =>
                                    <TouchableOpacity key={index} className="w-16 rounded-xl"
                                        onPress={() => setSelectedHour(hour)}
                                        style={{backgroundColor: hour === selectedHour ? '#63C2D1' : '#fff'}}
                                    >
                                        <Text className="text-base font-semibold text-center py-1"
                                            style={{ color: hour === selectedHour ? '#fff' : '#000' }}
                                        >
                                            {hour}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </ScrollView>
                        </View>
                    }

                    <TouchableOpacity onPress={handleFinishClick} className="self-center bg-darkBackGround w-full rounded-2xl py-3">
                        <Text className="text-center font-bold text-white text-xl">Finalizar agendamento</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}