import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "@/api/weather";
import { weatherImages } from "@/constants";
import * as Progress from "react-native-progress";
const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handleSearch = (value: string) => {
    if (value.length <= 2) {
      return;
    }
    fetchLocations({ cityName: value }).then((data: any) => {
      console.log("locations:", data);
      setLocations(data);
    });
  };
  const handleLocation = (loc) => {
    console.log("forecastt: ", loc);
    setLocations([]);
    toggleSearch(false);
    fetchWeatherForecast({ cityName: loc.name, days: "7" }).then((data) => {
      console.log("weather data", data);
      setWeather(data);
    });
  };
  const handleTextDebaunce = useCallback(debounce(handleSearch, 1200), []);
  const { current, location } = weather;
  useEffect(() => {
    fetchWeatherForecast({ cityName: "Zestafoni", days: "7" }).then((data) => {
      console.log("weather data", data);
      setWeather(data);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        blurRadius={10}
        source={require("../assets/images/bg.png")}
        style={styles.backgroundImage}
      />
      {loading ? (
        <View style={styles.loader}>
          <Progress.CircleSnail thickness={10} size={140} color={"green"} />
        </View>
      ) : (
        <View>
          <View style={styles.content}>
            <View style={styles.searchContainer}>
              {showSearch && (
                <TextInput
                  onChangeText={handleTextDebaunce}
                  placeholderTextColor={"lightgray"}
                  placeholder="Search city"
                  style={styles.input}
                />
              )}

              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => toggleSearch(!showSearch)}
              >
                <MagnifyingGlassIcon size={25} color={"white"} />
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
                        <View style={styles.locationContent}>
                          <MapPinIcon size="25" color="gray" />
                          <Text style={styles.locationText}>
                            {loc?.name},{loc?.country}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
          <View style={styles.forecastContainer}>
            <Text style={styles.cityText}>
              {location.name}
              <Text style={styles.countryText}> {" " + location?.country}</Text>
            </Text>
            <View style={styles.weatherImageContainer}>
              <Image
                style={styles.weatherImage}
                source={weatherImages[current?.condition?.text]}
              />
            </View>
            <View style={styles.weatherDetails}>
              <Text style={styles.temperatureText}>
                {current?.temp_c}&#176;
              </Text>
              <Text style={styles.weatherDescription}>
                {current?.condition?.text}
              </Text>
            </View>
            <View style={styles.otherStatsContainer}>
              <View style={styles.statItem}>
                <Image
                  style={styles.statIcon}
                  source={require("../assets/icons/wind.png")}
                />
                <Text style={styles.statValue}>{current?.wind_kph}km</Text>
              </View>
              <View style={styles.statItem}>
                <Image
                  style={styles.statIcon}
                  source={require("../assets/icons/drop.png")}
                />
                <Text style={styles.statValue}>{current?.humidity}%</Text>
              </View>
              <View style={styles.statItem}>
                <Image
                  style={styles.statIcon}
                  source={require("../assets/icons/sun.png")}
                />
                <Text style={styles.statValue}>8am</Text>
              </View>
            </View>
          </View>
          {/* Next days */}
          <View style={styles.nextDaysContainer}>
            <View style={styles.dailyForecastHeader}>
              <CalendarDaysIcon size={22} color="white" />
              <Text style={styles.dailyForecastText}>Daily forecast</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {weather?.forecast?.forecastday?.map((item, index) => {
                let date = new Date(item.date);
                let options = { weekday: "long" };
                let dayName = date.toLocaleDateString("en-US", options);
                return (
                  <View style={styles.nextDay} key={index}>
                    <Image
                      style={styles.nextDayImage}
                      source={weatherImages[item?.day?.condition?.text]}
                    />
                    <Text style={styles.nextDayText}>{dayName}</Text>
                    <Text style={styles.nextDayTemp}>
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 40,
    width: "100%",
    paddingHorizontal: 10,
    position: "relative",
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
    zIndex: 999,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  locationContent: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  locationText: {
    fontSize: 18,
    color: "#333",
  },
  forecastContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  cityText: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  countryText: {
    fontSize: 20,
    color: "gray",
    fontWeight: "semibold",
  },
  weatherImageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  weatherImage: {
    height: 208,
    width: 208,
  },
  weatherDetails: {
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
  },
  temperatureText: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },
  weatherDescription: {
    color: "white",
    fontSize: 17,
    fontWeight: "light",
    letterSpacing: 0.5,
  },
  otherStatsContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  statItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  statIcon: {
    height: 24,
    width: 24,
  },
  statValue: {
    color: "white",
    fontWeight: "semibold",
    fontSize: 20,
  },
  nextDaysContainer: {
    flexDirection: "column",
    gap: 16,
    paddingHorizontal: 40,
  },
  dailyForecastHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dailyForecastText: {
    color: "white",
    fontSize: 16,
  },
  nextDay: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 88,
    borderRadius: 33,
    paddingVertical: 12,
    marginRight: 10,
    backgroundColor: "gray",
  },
  nextDayImage: {
    width: 48,
    height: 48,
  },
  nextDayText: {
    color: "white",
    textAlign: "center",
  },
  nextDayTemp: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
