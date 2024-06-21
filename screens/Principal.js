import React, { useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity, View, StyleSheet, SafeAreaView, Animated, Pressable } from 'react-native';
import { Button, Header, Icon, Image, ListItem, Text } from 'react-native-elements';
import styles from '../style/MainStyle.js';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from '@expo/vector-icons';
import itemService from '../services/ItemService.js';
import { ActivityIndicator } from 'react-native-paper';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Principal({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchData = async () => {
    itemService.listar()
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        Alert.alert("Erro", "Ocorreu um erro inesperado.")
      })
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const SwipeableListItem = ({ item, onDismiss }) => {
    const rightSwipe = (progress, dragX) => {
      const opacity = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [0, 0, 0.7, 1]
      });
      return (
        <Animated.View style={[styles.deleteBox, { opacity }]}>
          <Text style={styles.deleteText}>Deletando...</Text>
        </Animated.View>
      );
    };

    return (
      <Swipeable
        renderRightActions={rightSwipe}
        onSwipeableRightOpen={() => onDismiss(item)}
        rightThreshold={100}  // Define o limiar para disparar a exclusão
      >
        <View style={specificStyle.itemContainer}>
          <Text style={specificStyle.nome}>{item.nome}</Text>
          <Text style={specificStyle.descricao}>{item.descricao}</Text>
        </View>
      </Swipeable>
    );
  };

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

  const alterarItem = (navigation, id) => {
    navigation.navigate("Alterar", { id: id })
  }

  const excluirItem = (itemToRemove) => {
    itemService.excluir(itemToRemove.id)
      .then((response) => {
        setLoading(false)
        fetchData()
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
        Alert.alert("Erro", "Ocorreu um erro inesperado.")
      })
  };

  const renderFooter = () => {
    return <View style={{ height: 100 }} />; // Espaço extra no fim da lista
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View >
          <View style={styles.menuBar}>
            <TouchableOpacity onPress={showLogoutConfirmation} style={styles.icon}>
              <Ionicons name="exit" size={32} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Minhas compras</Text>
            <View style={styles.iconsRight}>
              <TouchableOpacity onPress={() => cadastrarItem(navigation)} style={styles.icon}>
                <Ionicons name="add-circle-outline" size={32} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Pressable onLongPress={() => alterarItem(navigation, item.id)}
                style={({ pressed }) => [
                  styles.item,
                  { backgroundColor: pressed ? '#ddd' : '#fff' }
                ]}
              >
                <SwipeableListItem item={item} onDismiss={() => excluirItem(item)} />
              </Pressable>
            )}
            ListFooterComponent={renderFooter}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView >
  );
}

const specificStyle = StyleSheet.create({
  itemContainer: {
    padding: 20,
    marginVertical: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  descricao: {
    fontSize: 14,
    color: 'grey'
  }
})