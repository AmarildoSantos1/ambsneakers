// PedidosScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PedidoItem from "../Components/PedidoItem";
import Cookies from 'js-cookie';

const PedidoScreen = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        let token = Cookies.get('token')
        const response = await fetch('http://localhost:3000/orders',{
        method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, *',
              'Authorization': "Bearer " + token
            }
        });
        const data = await response.json();
        console.log(data)
        setPedidos(data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error.message);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pedidos</Text>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PedidoScreen;
