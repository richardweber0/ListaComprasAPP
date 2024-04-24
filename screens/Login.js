import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import styles from '../style/MainStyle.js';
import { ActivityIndicator } from 'react-native-paper';
import usuarioService from '../services/UsuarioService.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {

    const [usuario, setUsuario] = useState(null)
    const [senha, setSenha] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [isLoadingToken, setLoadingToken] = useState(true)

    const entrar = () => {

        let data = {
            username: usuario,
            password: senha
        }

        usuarioService.login(data)
            .then((response) => {
                setLoading(false)
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Principal" }]
                })
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
                Alert.alert("Erro", "Ocorreu um erro inesperado.")
            })
    }

    const loginToken = (token) => {

        setLoadingToken(true)
        let data = {
            token: token,
        }

        usuarioService.loginToken(data)
            .then((response) => {
                setLoadingToken(false)
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Principal" }]
                })
            })
            .catch((error) => {
                setLoadingToken(false)

            })
    }
    const cadastrar = () => {
        navigation.navigate("Cadastro")
    }

    useEffect(() => {
        AsyncStorage.getItem("TOKEN").then((token) => {
            loginToken(token)
        })
    }, [])

    return (
        <View style={styles.containerLogin}>

            {isLoadingToken &&
                <Text>Carregando...</Text>
            }

            {!isLoadingToken &&
                <>
                    <Text h3>Login</Text>
                    <Input
                        placeholder="Usuário"
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        onChangeText={value => setUsuario(value)}
                    />
                    <Input
                        placeholder="Senha"
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        onChangeText={value => setSenha(value)}
                        secureTextEntry={true}
                    />

                    {isLoading &&
                        <ActivityIndicator> </ActivityIndicator>
                    }

                    {!isLoading &&
                        <Button
                            title="Entrar"
                            buttonStyle={specificStyle.button}
                            onPress={() => entrar()}
                        />
                    }

                    <Button
                        title="Criar nova conta"
                        buttonStyle={specificStyle.button}
                        onPress={() => cadastrar()}
                    />
                </>
            }
        </View>
    );
}

const specificStyle = StyleSheet.create({
    sespecificContainer: {
        backgroundColor: "#fff"
    },
    button: {
        width: '100%',
        marginTop: 10
    }
})