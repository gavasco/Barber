import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import AuthService from "../API/Api";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Swiper from "react-native-swiper";
import Stars from "../components/Stars";
import ModalBarber from "../components/ModalBarber";

export default function BarberProfile() {
    const [loading, setLoading] = useState(false);

    const { getBarber, setFavorite } = AuthService();
    const { barberInfo, setFavoriteList, favoriteList }: { barberInfo: any, setFavoriteList: any, favoriteList: number[] } = useUserContext();

    const barberParams = useLocalSearchParams()
    const barberID = barberParams.id
    const barberArray = Array.isArray(barberParams.barber) ? barberParams.barber[0] : barberParams.barber;
    const barber = JSON.parse(barberArray);

    const [favorited, setFavorited] = useState(barberInfo?.data.favorited);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    async function getBarberProfile() {
        setLoading(true);

        await getBarber(barberID)

        setLoading(false);
    }

    useEffect(() => {
        getBarberProfile()
    }, []) 

    async function handleFavClick() {
        setFavorited(!favorited)
        if (!barberInfo) return null

        const barberId = barberInfo?.data.id
        if (favoriteList.includes(barberId)) {
            setFavoriteList(favoriteList.filter(i => i !== barberId))
        } else {
            setFavoriteList([...favoriteList, barberInfo?.data.id])
        }
        await setFavorite(barberInfo?.data.id ?? 0)
    }

    function handleServicesChoice (index: any) {
        setSelectedService(index)
        setShowModal(true)
    }

    return (
        <ScrollView className="flex-1 bg-white relative">

            <View className="flex-1 items-center mt-8">
                {barberInfo?.data.photos && barberInfo?.data.photos.length > 0 ?
                    <Swiper
                        style={{ height: 256 }}
                        dot={<FontAwesome name="circle" size={10} color="#FFF" style={{ marginHorizontal: 3 }} />}
                        activeDot={<FontAwesome name="circle" size={10} color="#23cae4" style={{ marginHorizontal: 3 }} />}
                        autoplay={true}
                        autoplayTimeout={5}
                        paginationStyle={{ bottom: 220, top: 0, right: 0, left: 310 }}
                    >
                        {barberInfo?.data.photos.map((photo: any, index: number) =>
                            <View key={index} className="flex-1 items-center justify-center ">
                                <Image className="w-full h-full"
                                    source={{ uri: photo.url }}
                                    resizeMode="cover"
                                />
                            </View>
                        )}
                    </Swiper>
                    :
                    <View className="h-32 w-full bg-backGround"></View>
                }
            </View>

            <View className="flex-1 w-full -mt-9 bg-white "
                style={{ borderTopLeftRadius: 40 }}
            >
                <View className="flex-row -mt-8">
                    <Image className="w-28 h-28  rounded-2xl mx-6"
                        style={{
                            borderWidth: 2,  
                            borderColor: "#FFF"  
                        }}
                        source={{ uri: barber.avatar }}
                    />
                    <View className="justify-end ">
                        <Text className="font-bold text-xl">{barber.name}</Text>
                        <Stars stars={barber.stars} showNumber={true} />
                    </View>
                    <Pressable className="border w-10 ml-5 h-10 border-black bg-white justify-center items-center rounded-full mt-4"
                        onPress={handleFavClick}
                    >
                        <FontAwesome
                            name={(favoriteList.includes(Number(barberID))) ? 'heart' : 'heart-o'}
                            size={23}
                            color='#FF0000'
                        />
                    </Pressable>
                </View>

                {loading && <ActivityIndicator size="large" color="#23cae4" className="my-5" />}

                <View>
                    <Text className="text-xl font-bold text-darkBackGround px-6 mt-6">Lista de serviços:</Text>
                    {barberInfo?.data.services && barberInfo?.data.services.map((service: any, index: number) =>
                        <View key={index} className="flex-row justify-between px-6 py-3">
                            <View>
                                <Text className="text-base font-bold text-primary">{service.name}</Text>
                                <Text className="text-base text-primary">R$ {service.price.toFixed(2)}</Text>
                            </View>
                            <TouchableOpacity className="bg-backGround justify-center rounded-2xl px-3"
                                onPress={() => handleServicesChoice(index)}
                            >
                                <Text className="font-bold text-base text-white">Agendar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>

            <View className="mt-5 mb-10">
                {barberInfo?.data.testimonials && barberInfo?.data.testimonials.length > 0 &&
                    <Swiper
                        style={{ height: 110 }}
                        showsPagination={false}
                        showsButtons={true}
                        prevButton={<FontAwesome name="chevron-left" size={24} color="#000" style={{ marginLeft: 5 }} />}
                        nextButton={<FontAwesome name="chevron-right" size={24} color="#000" style={{ marginRight: 5 }} />}
                        autoplay={true}
                        autoplayTimeout={6}
                    >
                        {barberInfo?.data.testimonials.map((testimonial: any, index: number) =>
                            <View key={index} className="px-5 pt-3 pb-6 bg-[#24a6b9] mx-10 rounded-2xl">
                                <View className="flex-row justify-between items-center">
                                    <Text className="font-bold text-white text-base">{testimonial.name}</Text>
                                    <Stars stars={testimonial.rate} showNumber={false} />
                                </View>
                                <Text className="text-white">{testimonial.body}</Text>
                            </View>
                        )}
                    </Swiper>
                }
            </View>

            <TouchableOpacity className="absolute top-12 left-4" onPress={() => router.back()}>
                <FontAwesome name="chevron-left" size={24} color="#FFF" className="" />
            </TouchableOpacity>

            {showModal && 
                <ModalBarber 
                    setShowModal={setShowModal} 
                    selectedService={selectedService} 
                    barberInfo={barberInfo} 
                />
            }
            
        </ScrollView>
    )
}