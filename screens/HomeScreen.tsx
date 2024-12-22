import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        blurRadius={10}
        source={require("../assets/images/bg.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholderTextColor={"lightgray"}
            placeholder="Search city"
            style={styles.input}
          />
          <TouchableOpacity style={styles.searchButton}>
            <MagnifyingGlassIcon size="25" color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensure proper image scaling
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    width: "80%",
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
  },
});

export default HomeScreen;
