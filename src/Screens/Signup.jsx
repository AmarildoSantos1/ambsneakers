import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "./../Utils/MyColors";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import uuid from 'react-native-uuid';
import Cookies from "js-cookie";

const Signup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { email, password, name } = userCredentials;

  const uid = uuid.v4();

  const registerUser = () => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, *'
          },
          body: JSON.stringify({ username: name, email, password, password_confirmation: password }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Register successful:', data);
          console.log(data.token)
          Cookies.set('token', data.token)
          Alert.alert("Cadastro realizado com sucesso!");
          setTimeout(() => {
            nav.navigate("Home");
          }, 2000); 
        } else {
          Alert.alert("Registro falhou!");
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }

  const userAccount = () => {
    
    console.log("Usuário cadastrado:", userCredentials);

    // Limpar os campos após o cadastro (simulação)
    setUserCredentials({
      name: "",
      email: "",
      password: "",
    });

    Alert.alert("Cadastro realizado com sucesso!");
  };

  const nav = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: myColors.secondary }}>
      <StatusBar />
      <ScrollView style={{ flex: 1, paddingTop: 2 }}>
        <Image
          style={{ alignSelf: "center" }}
          source={require("../assets/mainIcon.png")}
        />

        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text
            style={{ color: myColors.third, fontSize: 24, fontWeight: "500" }}
          >
            Cadastre-se
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "grey",
              marginTop: 10,
            }}
          >
            Insira suas credenciais
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "grey",
              marginTop: 40,
            }}
          >
            Usuario
          </Text>
          <TextInput
            maxLength={9}
            value={name}
            onChangeText={(val) => {
              setUserCredentials({ ...userCredentials, name: val });
            }}
            keyboardType="name-phone-pad"
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 15,
            }}
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "grey",
              marginTop: 30,
            }}
          >
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={(val) => {
              setUserCredentials({ ...userCredentials, email: val });
            }}
            keyboardType="email-address"
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 15,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "grey",
              marginTop: 40,
            }}
          >
            Senha
          </Text>
          <View
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              value={password}
              onChangeText={(val) => {
                setUserCredentials({ ...userCredentials, password: val });
              }}
              secureTextEntry={isVisible}
              maxLength={6}
              keyboardType="ascii-capable"
              style={{
                fontSize: 17,
                marginTop: 15,
                flex: 0.9,
              }}
            />
            <Ionicons
              onPress={() => {
                setIsVisible(!isVisible);
              }}
              name={isVisible == true ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="black"
            />
          </View>

          <Text
            numberOfLines={2}
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: "black",
              marginTop: 15,
              letterSpacing: 0.7,
              lineHeight: 25,
              width: "95%",
              opacity: 0.7,
            }}
          >
            Direitos reservados Amb_neakers
          </Text>
          <TouchableOpacity
            onPress={registerUser}
            style={{
              backgroundColor: myColors.primary,
              marginTop: 30,
              height: 70,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 19,
                color: myColors.secondary,
                fontWeight: "500",
              }}
            >
              Cadastre-se
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              gap: 5,
            }}
          >
            <Text style={{ fontSize: 16 }}>Já possui conta?</Text>
            <TouchableOpacity
              onPress={() => {
                nav.navigate("Login");
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: myColors.primary,
                  fontWeight: "600",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
