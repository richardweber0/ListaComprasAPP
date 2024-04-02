import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import styles from '../style/MainStyle.js';
import usuarioService from '../services/UsuarioService';

export default function Cadastro({ navigation }) {

    const [usuario, setUsuario] = useState(null)
    const [senha, setSenha] = useState(null)
    const [senhaRepetida, setSenhaRepetida] = useState(null)
    const [errorUsuario, setErrorUsuario] = useState(null)
    const [errorSenha, setErrorSenha] = useState(null)
    const [errorSenhaRepetida, setErrorSenhaRepetida] = useState(null)
    const [isLoading, setLoading] = useState(null)

    const validar = () => {
        let error = false
        setErrorUsuario(null)
        setErrorSenha(null)
        setErrorSenhaRepetida(null)
        if (usuario == null || usuario == '') {
            setErrorUsuario("Informe um usuário")
            error = true
        }
        if (senha == null || senha == '') {
            setErrorSenha("Informe uma senha")
            error = true
        }
        if (senha != senhaRepetida) {
            setErrorSenhaRepetida("As duas senhas informadas não conferem")
            error = true
        }
        return !error
    }

    const salvar = () => {
        if (validar()) {
            setLoading(true)

            let data = {
                id: 5,
                usuario: usuario,
                senha: senha
            }

            usuarioService.cadastrar(data)
                .then((response) => {
                    setLoading(false)
                    const titulo = (response.data.status) ? "Sucesso" : "Erro"
                    Alert.alert(titulo, response.data.mensagem)
                })
                .catch((error) => {
                    setLoading(false)
                    console.log(error)
                    Alert.alert("Erro", "Ocorreu um erro inesperado.")
                })
        }
    }

    return (
        <View style={styles.container}>
            <Text h3>Nova conta</Text>
            <Input
                placeholder="Usuário"
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                onChangeText={value => {
                    setUsuario(value)
                    setErrorUsuario(null)
                }}
                errorMessage={errorUsuario}
            />
            <Input
                placeholder="Senha"
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                onChangeText={value => {
                    setSenha(value)
                    setErrorSenha(null)
                }}
                secureTextEntry={true}
                errorMessage={errorSenha}
            />
            <Input
                placeholder="Repetir senha"
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                onChangeText={value => {
                    setSenhaRepetida(value)
                    setErrorSenhaRepetida(null)
                }}
                secureTextEntry={true}
                errorMessage={errorSenhaRepetida}
                returnKeyType='done'
            />
            {!isLoading &&
                <Button
                    title="Cadastrar"
                    buttonStyle={specificStyle.button}
                    onPress={() => salvar()}
                />
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