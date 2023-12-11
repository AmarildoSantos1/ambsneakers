import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
//import FavoriteItem from '../components/FavoriteItem';

const FavoriteItemScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Faça uma chamada à API para obter detalhes do item favorito com o ID específico
    const fetchFavoriteItem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user_items/${item_id}`,{  
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, *',
          'Authorization': "Bearer " + token
        },
    });
        if (response.ok) {
          const itemData = await response.json();
          setItem(itemData);
        } else {
          console.error('Erro ao buscar detalhes do item favorito');
        }
      } catch (error) {
        console.error('Erro ao comunicar com o backend', error);
      }
    };

    fetchFavoriteItem();
  }, [itemId]);

  const handleRemoveItem = async () => {
    try {
        let token = Cookies.get('token')
        // requisição para o backend para remover o item favorito
      const response = await fetch(`http://localhost:3000/user_items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, *',
          'Authorization': "Bearer " + token
        },
      });

      if (response.ok) {
        // Redirecione de volta à tela anterior após a remoção
        //navigation.navigate('Home');
        navigation.goBack();
      } else {
        console.error('Erro ao remover item favorito');
      }
    } catch (error) {
      console.error('Erro ao comunicar com o backend', error);
    }
  };

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{item.name}</Text>
      {/* Adicione mais detalhes do item conforme necessário */}
      <FavoriteItem item={item} onRemove={handleRemoveItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoriteItemScreen;
