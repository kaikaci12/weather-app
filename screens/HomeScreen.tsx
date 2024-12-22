import React, { useState } from "react";
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
import { MapPinIcon } from "react-native-heroicons/solid";

const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

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
          {showSearch && (
            <TextInput
              placeholderTextColor={"lightgray"}
              placeholder="Search city"
              style={styles.input}
            />
          )}

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => toggleSearch(!showSearch)}
          >
            <MagnifyingGlassIcon size="25" color={"white"} />
          </TouchableOpacity>

          {/* Locations Container */}
          {locations.length > 0 && showSearch && (
            <View style={styles.locationsContainer}>
              {locations.map((loc, index) => {
                let showBorder = index + 1 !== locations.length;
                let borderClass = showBorder
                  ? { borderBottomWidth: 1, borderBottomColor: "black" }
                  : {};

                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.locationItem, borderClass]}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                      }}
                    >
                      <MapPinIcon size="25" color="gray" />
                      <Text style={styles.locationText}>UK, la</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
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
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start", // Align to the top
    alignItems: "center",
    paddingTop: 20, // Padding to give space from the top
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 40,
    width: "90%", // Adjust width to your needs
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 15,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 40,
  },
  locationsContainer: {
    position: "absolute",
    top: 60,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  locationItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "black",
  },
  locationText: {
    fontSize: 20,

    color: "#333",
  },
});

export default HomeScreen;
