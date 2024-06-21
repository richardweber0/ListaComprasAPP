import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Principal from './screens/Principal';
import Cadastro from './screens/Cadastro';
import Cadastrar from './screens/Cadastrar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alterar from './screens/Alterar';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Principal" component={Principal} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Cadastrar" component={Cadastrar} />
      <Stack.Screen name="Alterar" component={Alterar} />
    </Stack.Navigator>
  );
}

function refreshToken() {
  axios.interceptors.response.use(response => {
    return response
  }, err => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config
      console.log(err)
      if (err.response.status == 401 && err.config && !err.config._retry) {
        originalReq._retry = true
        AsyncStorage.getItem("TOKEN").then((token) => {
          let res = axios.put(`${Config.API_URL}token/refresh`, { oldToken: token })
            .then((res) => {
              AsyncStorage.setItem("TOKEN", res.data.access_token)
              originalReq.headers["Authorization"] = `Bearer ${res.data.access_token}`
              return axios(originalReq)
            })
          resolve(res)
        })
      } else {
        reject(err)
      }
    })
  })
}

export default function App() {
  refreshToken()
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};