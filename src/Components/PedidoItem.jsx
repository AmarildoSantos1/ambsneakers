
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PedidoItem = ({ pedido }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Número do Pedido: {pedido.numero}</Text>
      <Text style={styles.text}>Produto: {pedido.produto}</Text>
      <Text style={styles.text}>Quantidade: {pedido.quantidade}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 16,
  },
});

export default PedidoItem;
