import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import styles from "../style/MainStyle";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import itemService from "../services/ItemService";

export default function Alterar({ route, navigation }) {
    const { id } = route.params;
    const [itemNome, setItemNome] = useState('')
    const [itemDescricao, setItemDescricao] = useState('')
    const [errorNome, setErrorNome] = useState('')
    const [errorDescricao, setErrorDescricao] = useState('')
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                itemService.buscar(id)
                    .then((response) => {
                        setItemNome(response.data.nome)
                        setItemDescricao(response.data.descricao)
                        setLoading(false)
                    })
                    .catch((error) => {
                        setLoading(false)
                        console.log(error)
                        Alert.alert("Erro", "Ocorreu um erro inesperado.")
                    })
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, [id]);

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

    const Alterar = () => {
        if (validar()) {
            setLoading(true)

            let data = {
                id: id,
                nome: itemNome,
                descricao: itemDescricao
            }

            itemService.alterar(data)
                .then((response) => {
                    setLoading(false)
                    const titulo = (response.data.status) ? "Sucesso" : "Erro"
                    Alert.alert(titulo, response.data.mensagem)
                    setItemNome('')
                    setItemDescricao('')
                    navigation.goBack();
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
                    title="Alterar"
                    buttonStyle={specificStyle.button}
                    onPress={() => Alterar()}
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