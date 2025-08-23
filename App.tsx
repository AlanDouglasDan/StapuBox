import { useState, useMemo, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Dropdown } from "react-native-element-dropdown";
import Feather from "@expo/vector-icons/Feather";

import { fetchTournamentDemo, fetchSportsList } from "./src/http";
import { AccordionList } from "./src/components/AccordionList";
import { TournamentDemoResponse, Sport } from "./src/http/types";

export default function App() {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const [sportsList, setSportsList] = useState<Sport[]>([]);
  const [tournamentDemo, setTournamentDemo] = useState<TournamentDemoResponse>(
    {} as TournamentDemoResponse
  );

  const [loading, setLoading] = useState<boolean>(true);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);

      const sportsList = await fetchSportsList();
      setSportsList(sportsList.data);

      const tournamentDemo = await fetchTournamentDemo();
      setTournamentDemo(tournamentDemo);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const markedDates = useMemo(() => {
    return {
      [selectedDate]: {
        selected: true,
        selectedColor: "#E17827",
        selectedTextColor: "#fff",
      },
    };
  }, [selectedDate]);

  if (loading) {
    return (
      <View style={styles.flex1}>
        <ActivityIndicator size="large" color="#E17827" />
      </View>
    );
  }

  const sportsData = sportsList.map((sport) => ({
    label: sport.sport_name,
    value: sport.sport_id,
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.innerContainer}
          contentContainerStyle={styles.contentContainer}
        >
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "#000" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={styles.selectedTextStyle}
            data={sportsData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Search your sport" : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />

          <Calendar
            theme={{ textDayStyle: styles.text14 }}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            monthFormat="MMM yyyy"
            minDate="2025-08-01"
            maxDate="2025-10-31"
            firstDay={1}
            disableAllTouchEventsForDisabledDays={true}
            enableSwipeMonths={false}
            renderArrow={(direction) => (
              <Feather
                name={`chevron-${direction === "left" ? "left" : "right"}`}
                size={28}
                color={"#E17827"}
                style={[
                  direction === "left"
                    ? { marginLeft: 80 }
                    : { marginRight: 80 },
                ]}
              />
            )}
          />

          <AccordionList />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    paddingVertical: Platform.OS === "ios" ? 0 : 50,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  justifyEvenly: {
    justifyContent: "space-evenly",
  },
  text14: {
    fontSize: 14,
    fontWeight: "400",
    color: "##333333",
  },

  // dropdown
  dropdown: {
    height: 50,
    borderColor: "#8C8C8C",
    borderWidth: 0.2,
    borderRadius: 8,
    paddingHorizontal: 12,
    margin: 16,
    backgroundColor: "#FFF8F2",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#8C8C8C",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#000",
    textTransform: "capitalize",
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
