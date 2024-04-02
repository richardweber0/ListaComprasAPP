import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Header, Icon, Image, ListItem, Text } from 'react-native-elements';
import styles from '../style/MainStyle.js';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Principal({ navigation }) {

  const logout = (navigation) => {
    AsyncStorage.removeItem("TOKEN")
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }]
    })
  }

  return (
    <View style={styles.container}>
      <Button
        title="Sair"
        onPress={() => logout(navigation)}
      />
    </View>
  );
}
