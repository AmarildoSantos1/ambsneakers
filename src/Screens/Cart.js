import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { AntDesign } from "@expo/vector-icons";
import { myColors } from "../Utils/MyColors";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../Redux/CartSlice";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.CartSlice);

  let amount = 0;
  storeData.forEach((element) => {
    amount += element.price;
  });

  const createOrder = (item_ids) => {
    const fetchData = async () => {
      try {
        let token = Cookies.get('token')
        const response = await fetch('http://localhost:3000/orders', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, *',
            'Authorization': 'Bearer '+ token
          },
          body: JSON.stringify({ status: 'paid', item_ids: item_ids }),
        });
  
        if (response.ok) {
          const data = await response.json();
          nav.navigate('OrderPlaced')
        } else {
          console.error('Login failed');
          // Handle login failure, display an error message, etc.
        }
  
      } catch (error) {
  
        console.error('Error fetching data:', error);
  
      }
  }
  fetchData();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "white",
        gap: 15,
      }}
    >
      {/* Botão de Voltar para a Tela Inicial */}
      <TouchableOpacity onPress={() => nav.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "500" }}>
        Meu carrinho
      </Text>

      <View
        style={{
          flex: 0.93,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{}}
          data={storeData}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: responsiveHeight(18),

                borderBottomColor: "#E3E3E3",
                borderBottomWidth: 2,
                flexDirection: "row",
              }}
            >
              {/* ///extra */}

              <View
                style={{
                  flex: 0.35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ height: 120, width: 120, resizeMode: "contain" }}
                  source={{
                    uri: 'http://localhost:3000/' + item.image_url,
                  }}
                />
              </View>

              {/* ///extra */}
              <View
                style={{
                  flex: 0.7,
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "600" }}>
                    {item.name}
                  </Text>
                  <AntDesign
                    name="close"
                    size={25}
                    color="grey"
                    onPress={() => {
                      dispatch(removeFromCart(item));
                    }}
                  />
                </View>
                <Text style={{ fontSize: 17, color: "grey", marginTop: 5 }}>
                  {item.pieces}, Price
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",

                    marginTop: 10,
                  }}
                >
                  {/* ///Quantidade Container// */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <AntDesign
                      name="minuscircleo"
                      size={28}
                      color={myColors.primary}
                      onPress={() => {
                        dispatch(decrementQuantity(item));
                      }}
                    />
                    <Text style={{ fontSize: 17 }}>{item.quantity}</Text>
                    <AntDesign
                      name="pluscircleo"
                      size={28}
                      color={myColors.primary}
                      onPress={() => {
                        if (item.quantity == 7) {
                        } else {
                          dispatch(incrementQuantity(item));
                        }
                      }}
                    />
                  </View>

                  {/* ///Quantidade Container// */}

                  <Text style={{ fontSize: 22, fontWeight: "600" }}>
                    R$ {item.quantity * item.price}
                  </Text>
                </View>
              </View>

              {/* ///Container extra */}
            </View>
          )}
        />
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {   
            let arr = []
            storeData.forEach((item) => arr.push(item.id) )  
            createOrder(arr)
            
          }
          // n.navigate("OrderPlaced");
          }
          activeOpacity={0.8}
          style={{
            backgroundColor: myColors.primary,
            borderRadius: 10,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 30,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
              Efetuar Pagamento!
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>
              R$ {amount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
