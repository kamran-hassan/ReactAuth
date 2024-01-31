import React, { useEffect, useState } from 'react';
import { Alert, Animated, Easing, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { BlurView } from "@react-native-community/blur";
import { loginService } from './loginService';


function App(){

  const [loginContainerY] = useState(new Animated.Value(650));
  const [loginVisible, setLoginVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })


  const openLogin = () => {
    Animated.timing (loginContainerY, {
      toValue: 150,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(() => {setLoginVisible(true)})
  }

  const handleLogin = async () => {
    let res = await loginService(formData.email, formData.password);
    Alert.alert(res);
  }

  return (
    <View>
      <ImageBackground style ={style.mainContainer} source={require("./assets/download.webp")} resizeMode="cover">
        <Animated.View style={[style.loginContainer, {transform: [{ translateY: loginContainerY}]}]} >  
          <BlurView
          style={style.blurContainer}
          blurType="light"
          blurAmount={40}
          reducedTransparencyFallbackColor="white"
        >
          <TouchableOpacity onPress={openLogin}>
           {!loginVisible && <Image style={style.upArrow} source={require("./assets/up.png")} />}
          </TouchableOpacity>
          {loginVisible && (
            <ScrollView>
              <View style={style.logforn}>
            <Text style={style.loginTitle}>
              LOG IN
            </Text>
            <TextInput onChangeText={(text) => {formData.email = text; setFormData({...formData})}} style={style.input} value={formData.email}  placeholder='example@example.com' />
            <TextInput onChangeText={(text) => {formData.password = text; setFormData({...formData})}} style={style.input} value={formData.password} secureTextEntry={true} placeholder='Password' />
            <View style={style.loginButtonContainer} >
            <TouchableOpacity onPress={handleLogin} > 
                <Text style={style.loginbutton} >  Let's Go </Text>
            </TouchableOpacity>
            </View>
          </View>
            </ScrollView>
          )}

        </BlurView>
        </Animated.View>
      </ImageBackground>
    </View>
  )
}

const style =  StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%"
  },
  loginContainer: {
    width: "100%",
    height: "80%",
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "transparent"
    
  },
  blurContainer: {
    width: "100%",
    height: "100%",
  },
  upArrow: {
    width: 70,
    height: 70,
    margin: 10,
    alignSelf: "center",
  },
  logforn: {
    flexDirection: "column",
    alignItems: "center"
  },

  loginTitle: {
    margin: 20,
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  input: {
    margin: 12,
    borderWidth: 2,
    width: "80%",
    borderRadius: 20,
    borderColor: "white",
    paddingLeft: 20,
    paddingVertical: 12
  },
  loginbutton: {
    padding: 15,
    color: "white",
    width: 100
  },
  loginButtonContainer: {
    backgroundColor: "#961bf5",
    borderRadius: 15,
  }

})

export default App;
