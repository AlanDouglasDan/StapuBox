import React, { FC, useState } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
  Image,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

import { images } from "../../core/images";
import styles from "./AccordionList.styles";

interface AccordionListProps {
  tournament: any;
}

const AccordionList: FC<AccordionListProps> = ({ tournament }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  console.log(tournament);

  return (
    <View>
      <TouchableOpacity
        onPress={() => toggleExpand()}
        activeOpacity={1}
        style={styles.accordionContainer}
      >
        <View
          style={[
            styles.flexRow,
            styles.justifyBetween,
            styles.tournamentContainer,
          ]}
        >
          <View style={[styles.flexRow, styles.gap]}>
            <Image
              source={images.tournamentIcon}
              style={styles.tournamentIcon}
              resizeMode="cover"
            />

            <View>
              <Text style={styles.semiheader12}>{tournament.name}</Text>
              <Text style={styles.semiheader10}>{tournament.sport_name}</Text>
              <Text
                style={[styles.semiheader10, { color: "rgba(0, 0, 0, 0.6)" }]}
              >
                {new Date(tournament.start_date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(tournament.end_date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
            </View>
          </View>

          <View style={styles.flexEnd}>
            <TouchableOpacity onPress={() => setLiked(!liked)}>
              <AntDesign
                name={liked ? "heart" : "hearto"}
                size={20}
                color={liked ? "#E17827" : "rgba(0, 0, 0, 0.6)"}
              />
            </TouchableOpacity>

            <Text style={[styles.text10, { color: "#00B0F0" }]}>
              {tournament.level}
            </Text>
          </View>
        </View>

        <View style={styles.expandIcon}>
          {expanded ? (
            <Entypo name="chevron-thin-up" size={20} color={"#E17827"} />
          ) : (
            <Entypo name="chevron-thin-down" size={20} color={"#E17827"} />
          )}
        </View>
      </TouchableOpacity>

      {expanded &&
        tournament.matches.length > 0 &&
        tournament.matches.map((match: any, index: number) => (
          <View style={styles.padded} key={index}>
            <View style={styles.matchContainer}>
              <View style={[styles.flexRow, styles.justifyBetween]}>
                <View style={[styles.flexRow, styles.gap]}>
                  <Image
                    source={images.soccerBall}
                    style={styles.ballIcon}
                    resizeMode="cover"
                  />

                  <Text style={styles.text12}>
                    {match.team_a} vs {match.team_b}
                  </Text>
                </View>

                <View style={styles.orangeContainer}>
                  <Text style={[styles.text12, { color: "#E17827" }]}>
                    {match.stage}
                  </Text>
                </View>
              </View>

              <Text style={styles.text10}>Team Men</Text>

              <View style={[styles.flexRow, styles.justifyEvenly]}>
                <Image
                  source={images.team1}
                  style={styles.teamImage}
                  resizeMode="cover"
                />

                <Text style={styles.header12}>VS</Text>

                <Image
                  source={images.team2}
                  style={styles.teamImage}
                  resizeMode="cover"
                />
              </View>

              <View
                style={[styles.orangeContainer, styles.matchDetailsContainer]}
              >
                <View style={[styles.flexRow, styles.justifyBetween]}>
                  <View style={[styles.flexRow, styles.gap]}>
                    <Feather name="calendar" size={20} color="black" />

                    <Text style={styles.semiheader12}>
                      {new Date(match.start_date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </Text>
                  </View>

                  <View style={[styles.flexRow, styles.gap]}>
                    <Feather name="clock" size={20} color="black" />

                    <Text style={styles.semiheader12}>
                      {new Date(match.start_date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </Text>
                  </View>
                </View>

                <View style={[styles.flexRow, styles.justifyBetween]}>
                  <View style={[styles.flexRow, styles.gap]}>
                    <Feather name="map-pin" size={20} color="black" />

                    <Text style={styles.semiheader12}>{match.venue}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
    </View>
  );
};

export default AccordionList;
