import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import HomeScreen from "../screens/HomeScreen";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
