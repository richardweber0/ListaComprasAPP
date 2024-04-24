import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import styles from "../style/MainStyle";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import itemService from "../services/ItemService";

export default function Cadastrar({ navigation }) {
    const [itemNome, setItemNome] = useState('')
    const [itemDescricao, setItemDescricao] = useState('')
    const [itemQuantidade, setItemQuantidade] = useState(1)
    const [errorNome, setErrorNome] = useState('')
    const [errorDescricao, setErrorDescricao] = useState('')
    const [isLoading, setLoading] = useState(false)

    const validar = () => {
        let error = false
        setErrorNome(null)
        setErrorDescricao(null)
        if (itemNome == null || itemNome == '') {
            setErrorNome("Informe um nome")
            error = true
        }
        if (itemDescricao == null || itemDescricao == '') {
            setErrorDescricao("Informe uma descrição")
            error = true
        }
        return !error
    }

    const cadastrar = () => {
        if (validar()) {
            setLoading(true)

            let data = {
                nome: itemNome,
                descricao: itemDescricao
            }

            itemService.cadastrar(data)
                .then((response) => {
                    setLoading(false)
                    const titulo = (response.data.status) ? "Sucesso" : "Erro"
                    Alert.alert(titulo, response.data.mensagem)
                    setItemNome('')
                    setItemDescricao('')
                })
                .catch((error) => {
                    setLoading(false)
                    console.log(error)
                    Alert.alert("Erro", "Ocorreu um erro inesperado.")
                })
        }
    }
    return (
        <View style={styles.containerCadastro}>
            <Text style={styles.label}>Nome do Item:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome do item"
                value={itemNome}
                onChangeText={value => {
                    setItemNome(value)
                    setErrorNome(null)
                }}
            />
            {errorNome ? <Text style={specificStyle.error}>{errorNome}</Text> : null}


            <Text style={styles.label}>Descrição do Item:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite a descrição do item"
                value={itemDescricao}
                onChangeText={value => {
                    setItemDescricao(value)
                    setErrorDescricao(null)
                }}
                multiline
                numberOfLines={6}
            />

            {errorDescricao ? <Text style={specificStyle.error}>{errorDescricao}</Text> : null}

            {isLoading &&
                <Text>Cadastrando...</Text>
            }

            {!isLoading &&
                <Button
                    title="Cadastrar"
                    buttonStyle={specificStyle.button}
                    onPress={() => cadastrar()}
                />
            }
        </View>
    );
}

const specificStyle = StyleSheet.create({
    button: {
        marginTop: 20
    },
    error: {
        width: '80%',
        textAlign: 'left',
        color: 'red',
        marginBottom: 5,
        marginTop: 5,
    }
})