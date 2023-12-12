import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import HomeIcon from '../Components/HomeIcon';
import HomeSearch from '../Components/HomeSearch';
import HomeBanner from '../Components/HomeBanner';
import ProductsTitle from '../Components/ProductsTitle';
import ProductsCarousel from '../Components/ProductsCarousel';
import Cookies from 'js-cookie';

const Home = () => {
  const navigation = useNavigation(); // instância de navegação

  const [items_data, setItemsData] = useState([]);

  const buscarItems = () => {
    const fetchData = async () => {
      try {
        let token = Cookies.get('token');

        const response = await fetch('http://localhost:3000/items', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, *',
            Authorization: 'Bearer ' + token,
          },
        });

        if (response.ok) {
          let data = await response.json();
          setItemsData(data);
        } else {
          console.error('buscar itens falhou');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  };

  useEffect(() => {
    buscarItems();
  }, []);

  // Função para lidar com o clique no ícone de carrinho
  const handleCartIconClick = () => {
    navigation.navigate('PedidoScreen'); // indo para a tela do carrinho
  };

  // Função para lidar com o clique no ícone de favoritos
  const handleFavoriteIconClick = () => {
    navigation.navigate('FavoriteItemScreen'); // indo para a tela de itens favoritos
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          paddingHorizontal: 0,
          paddingTop: 10,
        }}
      >
        <View style={{ gap: 20, paddingBottom: 20 }}>
          <HomeIcon />
          <HomeSearch />
          <HomeBanner />

          {/* ícone de carrinho clicável */}
          <TouchableOpacity onPress={handleCartIconClick}>
            <Icon name="shopping-cart" size={30} color="black" />
          </TouchableOpacity>

          {/* ícone de favoritos clicável */}
          <TouchableOpacity onPress={handleFavoriteIconClick}>
            <Icon name="heart" size={30} color="red" />
          </TouchableOpacity>

          <ProductsTitle title="Ofertas" />
          <ProductsCarousel data={items_data} />
          <ProductsTitle title="Mais vendidos" />
          <ProductsCarousel data={items_data} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
