import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import styles from '../style/MainStyle.js';

export default function Login({ navigation }) {

    const [usuario, setUsuario] = useState(null)
    const [senha, setSenha] = useState(null)

    const entrar = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Principal" }]
        })
    }

    return (
        <View style={styles.container}>
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
            <Button
                title="Entrar"
                onPress={() => entrar()}
            />
        </View>
    );
}
