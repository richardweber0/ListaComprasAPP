import React, { useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Button, Header, Icon, Image, ListItem, Text } from 'react-native-elements';
import styles from '../style/MainStyle.js';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from '@expo/vector-icons';

export default function Principal({ navigation }) {
  const showLogoutConfirmation = () => {
    Alert.alert(
      'Sair da conta',
      'Você deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => logout(navigation),
        },
      ],
      { cancelable: false },
    );
  };

  const logout = (navigation) => {
    AsyncStorage.setItem("TOKEN", "").then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }]
      })
    }).catch((error) => {
      console.log(error)
      Alert.alert("Erro ao sair.")
    })
  }

  const cadastrarItem = (navigation) => {
    navigation.navigate("Cadastrar")
  }

  return (
    <View style={styles.container}>
      <View style={styles.menuBar}>
        <TouchableOpacity onPress={showLogoutConfirmation} style={styles.icon}>
          <Ionicons name="exit" size={32} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Minhas compras</Text>
        <View style={styles.iconsRight}>
          <TouchableOpacity onPress={() => cadastrarItem(navigation)} style={styles.icon}>
            <Ionicons name="add-circle-outline" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Buscar clicado')} style={styles.icon}>
            <Ionicons name="search" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}