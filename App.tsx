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
import { Sport } from "./src/http/types";

export default function App() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const [sportsList, setSportsList] = useState<Sport[]>([]);
  const [tournamentList, setTournamentList] = useState<any>({});

  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      setLoading(true);

      const sportsList = await fetchSportsList();
      setSportsList(sportsList.data);

      const _tournamentDemo = await fetchTournamentDemo();
      setTournamentList(_tournamentDemo.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTournamentsOnSelectedDate = (allSportsTournaments: any) => {
    // Filter out tournaments for each sport where the start date matches the selected date
    const tournamentsOnSelectedDate = allSportsTournaments.flatMap(
      (sport: any) => {
        // If a selected sport is provided, filter by that sport_id
        if (selectedSport && sport.sport_id !== selectedSport) {
          return []; // Skip this sport if it doesn't match the selectedSport
        }

        return sport.tournaments
          .filter((tournament: any) => {
            // Compare only the date part (yyyy-mm-dd) of the start_date
            const tournamentStartDate = tournament.start_date.split("T")[0];
            return tournamentStartDate === selectedDate;
          })
          .map((tournament: any) => ({
            ...tournament,
            sport_name: sport.sport_name, // Add sport name for reference
            sport_id: sport.sport_id,
          }));
      }
    );

    return tournamentsOnSelectedDate;
  };

  // console.log(
  //   selectedDate &&
  //     tournamentList &&
  //     getTournamentsOnSelectedDate(tournamentList)
  // );

  useEffect(() => {
    getData();
  }, []);

  const sportEvent = selectedSport
    ? tournamentList.filter(
        (sport: { sport_id: number }) =>
          sport.sport_id === Number(selectedSport)
      )[0]
    : undefined;

  const markedDates = useMemo(() => {
    const dates: any = {};

    if (selectedSport)
      sportEvent?.tournaments.forEach((event: { start_date: string }) => {
        dates[event.start_date.split("T")[0]] = {
          selected: true,
          selectedTextColor: "#E17827",
          selectedColor: "#FFF",
        };
      });
    else if (tournamentList?.length > 0)
      tournamentList.map((event: any) =>
        event.tournaments.forEach((event: any) => {
          dates[event.start_date.split("T")[0]] = {
            selected: true,
            selectedTextColor: "#E17827",
            selectedColor: "#FFF",
          };
        })
      );

    if (selectedDate)
      dates[selectedDate] = {
        selected: true,
        selectedColor: "#E17827",
        selectedTextColor: "#fff",
      };

    return dates;
  }, [selectedDate, selectedSport, tournamentList]);

  if (loading) {
    return (
      <View style={styles.flex1}>
        <ActivityIndicator size="large" color="#E17827" />
      </View>
    );
  }

  const sportsData = [
    { label: "All", value: null },
    ...sportsList.map((sport) => ({
      label: sport.sport_name,
      value: sport.sport_id,
    })),
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.innerContainer}
          contentContainerStyle={styles.contentContainer}
        >
          <Dropdown
            style={styles.dropdown}
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
            placeholder={"Search your sport"}
            searchPlaceholder="Search..."
            value={selectedSport}
            onChange={(item) => {
              setSelectedSport(item.value);
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

          {selectedDate &&
            tournamentList &&
            getTournamentsOnSelectedDate(tournamentList)?.map(
              (tournament: any, index: number) => (
                <AccordionList key={index} tournament={tournament} />
              )
            )}
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
    paddingBottom: Platform.OS === "ios" ? 30 : 70,
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
    fontSize: 15,
    color: "#333333",
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
    color: "#000",
  },
});
