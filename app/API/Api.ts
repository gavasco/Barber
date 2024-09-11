import { router } from "expo-router";
import url from "./BaseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../context/UserContext";

export default function AuthService() {
    const { dispatch: userDispatch, setBarbersList, setBarberInfo, setList, setFavoriteList, setAppointmentsList } = useUserContext();

    const checkToken = async (token: string) => {
        const data = { token };
        url.post('/auth/refresh', data, {
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(response => {
                AsyncStorage.setItem('token', response.data.token);
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: response.data.data.avatar
                    }
                });

                router.replace('Home')
            })
            .catch(err => {
                console.log('Erro ao requisitar o refresh token', err.response.data);
                router.replace('Login');
            });
    };

    const login = async (email: string, password: string) => {
        const data = { email, password };
        url.post('/auth/login', data, {
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(response => {
                AsyncStorage.setItem('token', response.data.token);

                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: response.data.data.avatar,
                    }
                });
                router.replace('Home');
            })
            .catch(err => console.log('Erro ao logar', err.response.data));
    };

    const logout = async (token: string | null) => {

        url.post('/auth/logout', token, {
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(response => {
                console.log('Logout:', response.data);
            })
            .catch(err => console.log('Erro ao deslogar', err.response.data));
    };

    const signUp = async (name: string, email: string, password: string) => {
        const data = { name, email, password };
        url.post('/user', data, {
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(response => {
                console.log('Cadastro:', response.data);
                router.replace('Login')
            })
            .catch(err => console.log('Erro ao fazer cadastro', err.response.data));
    };

    const getBarbers = async (token: string, lat: number | null, lng: number | null, locationText: string) => {

        url.get(`/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${locationText}`)
            .then(response => {
                setBarbersList(response.data)
            })
            .catch(err => console.log('Erro ao pegar os barbeiros', err.response.data));
    };

    const getBarber = async (id:any) => {

        const token = await AsyncStorage.getItem('token');

        url.get(`/barber/${id}?token=${token}`)
            .then(response => {
                setBarberInfo(response.data)
            })
            .catch(err => console.log('Erro ao pegaros dados do barbeiro por id:', err.response.data));
    };

    const setFavorite = async (id: number) => {

        const token = await AsyncStorage.getItem('token');

        const data = { id, token  };
        url.post(`/user/favorite`, data, {
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(response => {
                console.log('Favorito:', response.data);
            })
            .catch(err => console.log('Erro ao setar favorito', err.response.data));
    };

    const setAppointment = async (BarberID: number, choosedService: any, selectedYear: number, selectedMonth: number, selectedDay: number, selectedHour: number) => {

        const token = await AsyncStorage.getItem('token');

        const data = { 
            service: choosedService, 
            year: selectedYear, 
            month: selectedMonth, 
            day: selectedDay, 
            hour: selectedHour, 
            token 
        };
        url.post(`/barber/${BarberID}/appointment`, data, {
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(response => {
                if ( response.data.error == '' ) {
                    router.navigate('Appointments')
                }
            })
            .catch(err => console.log('Erro ao fazer o agendamento', err.response.data));
    };

    const search = async (barberName:string) => {

        const token = await AsyncStorage.getItem('token');

        url.get(`/search?q=${barberName}&token=${token}`)
            .then(response => {
                setList(response.data.list)
            })
            .catch(err => console.log('Erro ao fazer a busca do barbeiro:', err.response.data));
    };

    const getFavorites = async (token: string | null) => {

        url.get(`/user/favorites?token=${token}`)
            .then(response => {
                console.log(response.data.list)
            })
            .catch(err => console.log('Erro ao fazer a busca dos favoritos:', err.response.data));
    };

    const getAppointments = async () => {

        const token = await AsyncStorage.getItem('token');

        url.get(`/user/appointments?token=${token}`)
            .then(response => {
                setAppointmentsList(response.data.list)
            })
            .catch(err => console.log('Erro ao fazer a busca dos agendamentos:', err.response.data));
    };

    const updateUser = async (dataUser: any) => {
        const token = await AsyncStorage.getItem('token');

        const data = { token, ...dataUser };
        url.put(`/user`, data, {
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(response => {
                console.log('Alteração:', response.data);
            })
            .catch(err => console.log('Erro ao alterar dados', err.response.data));
    };

    return { checkToken, login, signUp, getBarbers, logout, getBarber, setFavorite, setAppointment, 
        search, getFavorites, getAppointments, updateUser  };
}
