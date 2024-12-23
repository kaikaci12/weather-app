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

  const handleLocation = (loc) => {
    console.log(loc);
  };
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
                    onPress={() => handleLocation(loc)}
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
                      <Text style={styles.locationText}>USA,Los Angeles</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </View>
      <View style={styles.forecastContainer}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          London,
          <Text style={{ fontSize: 20, color: "gray", fontWeight: "semibold" }}>
            United Kingdom
          </Text>
        </Text>
        {/*weather image */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Image
            height={208}
            width={208}
            style={{ height: 208, width: 208 }}
            source={require("../assets/images/partlycloudy.png")}
          />
        </View>
        <View style={{ flexDirection: "column", gap: 5, alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 50, fontWeight: "bold" }}>
            23&#176;
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 17,
              fontWeight: "light",
              letterSpacing: 0.5,
            }}
          >
            Partly Cloudy
          </Text>
        </View>
        <View style={styles.otherStatsContainer}>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Image
              height={24}
              width={24}
              style={{ height: 24, width: 24 }}
              source={require("../assets/icons/wind.png")}
            />
            <Text
              style={{ color: "white", fontWeight: "semibold", fontSize: 20 }}
            >
              22km
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Image
              height={24}
              width={24}
              style={{ height: 24, width: 24 }}
              source={require("../assets/icons/wind.png")}
            />
            <Text
              style={{ color: "white", fontWeight: "semibold", fontSize: 20 }}
            >
              23%
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Image
              height={24}
              width={24}
              style={{ height: 24, width: 24 }}
              source={require("../assets/icons/wind.png")}
            />
            <Text
              style={{ color: "white", fontWeight: "semibold", fontSize: 20 }}
            >
              8am
            </Text>
          </View>
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
    width: "100%", // Adjust width to your needs
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
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 40,
  },
  locationsContainer: {
    position: "absolute",
    top: 70,
    left: 10,
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
  forecastContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-around",

    paddingHorizontal: 40,
  },
  otherStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default HomeScreen;
