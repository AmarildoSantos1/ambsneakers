import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import DropBox from "../Components/DropBox";
import { myColors } from "./../Utils/MyColors";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/CartSlice";
import Cookies from 'js-cookie';

const Details = ({ route }) => {
  const storeData = useSelector((state) => state.CartSlice);
  const dispatch = useDispatch();
  const productData = route.params.main;
  const { name, price, description, quantity, image_url } = productData;

  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    if (isAddingToCart) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: productData.id }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(addToCart(productData));
        Alert.alert("Sucesso", "Item adicionado ao carrinho com sucesso");
      } else {
        Alert.alert("Erro", "Falha ao adicionar item ao carrinho");
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      Alert.alert("Erro", "Falha ao adicionar item ao carrinho");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, gap: 20, backgroundColor: "white" }}>
      <StatusBar backgroundColor="white" />
      <View>
        <Image
          resizeMode="contain"
          style={{
            height: 300,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
          source={{
            uri: 'http://localhost:3000/' + image_url,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            position: "absolute",
            width: "100%",
            paddingHorizontal: 15,
            alignItems: "center",
          }}
        >
          <Ionicons
            onPress={() => {
              nav.goBack();
            }}
            name="chevron-back"
            size={28}
            color="black"
          />
          <Feather name="share" size={28} color="black" />
        </View>
      </View>
      <View
        style={{ paddingHorizontal: 15, backgroundColor: "white", flex: 1 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 25, color: "black", fontWeight: "600" }}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
          <MaterialIcons name="favorite-border" size={30} color="black" />
        </View>
        <Text style={{ marginTop: 5, fontSize: 15, color: "grey" }}>
          {quantity}
        </Text>
        <Text
          style={{
            marginTop: 5,
            fontSize: 28,
            color: "black",
            fontWeight: "bold",
          }}
        >
          R$ {price}
        </Text>
        <DropBox />
        <View
          style={{
            flex: 0.9,
            justifyContent: "flex-end",
          }}
        >
          {storeData.some((value) => value.name == productData.name) ? (
            <TouchableOpacity
              disabled={true}
              activeOpacity={0.8}
              style={{
                backgroundColor: "#E3E3E3",
                borderRadius: 10,
                height: 70,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "black", fontSize: 18, fontWeight: "700" }}>
                Adicionado ao carrinho
              </Text>
            </TouchableOpacity>
          ) : (
            <>
            <TouchableOpacity
            onPress={() => {
              dispatch(addToCart(productData));
              nav.navigate("Home");
            }}
            activeOpacity={0.8}
            style={{
              backgroundColor: myColors.primary,
              borderRadius: 10,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
              Adicionar ao carrinho
            </Text>
          </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAddToCart}
              activeOpacity={0.8}
              style={{
                backgroundColor: myColors.primary,
                borderRadius: 10,
                height: 70,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
<<<<<<< HEAD
                Efetuar Pedido
=======
                {isAddingToCart ? "Adicionando..." : "Adicionar ao carrinho"}
>>>>>>> d0b4de26323764af358df86490fcb476bae91cf9
              </Text>
            </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;