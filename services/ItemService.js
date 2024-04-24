import axios from "axios"
import Config from "../util/Config"
import AsyncStorage from "@react-native-async-storage/async-storage"

class ItemService {

    async cadastrar(data) {
        let token = await AsyncStorage.getItem("TOKEN")
        return axios({
            url: Config.API_URL + "item/cadastrar",
            method: "POST",
            timeout: Config.TIMEOUT_REQUEST,
            data: data,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
}

const itemService = new ItemService()
export default itemService