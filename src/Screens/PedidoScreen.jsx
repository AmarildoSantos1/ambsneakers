import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import Cookies from 'js-cookie';

const PedidoScreen = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        let token = Cookies.get('token');
        const response = await fetch('http://localhost:3000/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, *',
            'Authorization': 'Bearer ' + token,
          },
        });
        const data = await response.json();
        console.log(data);
        setPedidos(data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error.message);
      }
    };

    fetchPedidos();
  }, []);

  const renderPedidoItem = ({ item: pedido }) => {
    const imageUrl = pedido.image_url ? `http://localhost:3000/${pedido.image_url}` : '';

    return (
      <View>
        <Text>Data de Compra: {pedido.dataCompra}</Text>
        <Text>Status: {pedido.status}</Text>
        {pedido.image_url && <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 }} />}

        {/* Laço de repetição para os items dentro do pedido */}
        {pedido.items && pedido.items.map((item, index) => (
          <View key={index}>
            <Text>Nome do Item: {item.name}</Text>
            {item.image_url && <Image source={{ uri: `http://localhost:3000/${item.image_url}` }} style={{ width: 50, height: 50 }} />}
            {/* Adicione mais informações do item conforme necessário */}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pedidos</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={renderPedidoItem}
      />
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
