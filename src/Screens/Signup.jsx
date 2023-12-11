import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "./../Utils/MyColors";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Cookies from 'js-cookie';
import uuid from 'react-native-uuid';

const Signup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nav = useNavigation();

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:3000/Register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
        },
        body: JSON.stringify(userCredentials),
      });

      if (response.ok) {
        // Sucesso no cadastro
        Alert.alert("Cadastro realizado com sucesso!");
        nav.navigate("Login"); // Navega para a tela de login após o cadastro
      } else {
        // Falha no cadastro
        console.error('Falha no cadastro');
        Alert.alert("Erro", "Falha no cadastro. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar cadastrar. Por favor, tente novamente.");
    }
  };

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
            value={userCredentials.name}
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
            value={userCredentials.email}
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
              value={userCredentials.password}
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

          <TouchableOpacity
            onPress={handleSignup}
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
