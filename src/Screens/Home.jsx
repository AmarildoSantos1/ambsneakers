import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import HomeIcon from "../Components/HomeIcon";
import HomeSearch from "../Components/HomeSearch";
import HomeBanner from "../Components/HomeBanner";
import ProductsTitle from "../Components/ProductsTitle";
import ProductsCarousel from "../Components/ProductsCarousel";
import { shoes, shirt } from "../Utils/Date";
import Cookies from 'js-cookie';

const Home = () => {
 
  const [items_data, setItemsData] = useState([])

  const buscarItems = () => { 
      const fetchData = async () => {
        try {
          let token = Cookies.get('token')

          const response = await fetch('http://localhost:3000/items', {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, *',
              'Authorization': "Bearer " + token
            }
          });

          if (response.ok) {
            let data = await response.json();
            setItemsData(data)
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          paddingHorizontal:0,
          paddingTop: 10,
        }}
      >
        <View style={{ gap: 20, paddingBottom: 20 }}>
          <HomeIcon />
          <HomeSearch />
          <HomeBanner />
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