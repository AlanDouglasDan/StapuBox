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
import Feather from "@expo/vector-icons/Feather";

import { images } from "../../core/images";
import styles from "./AccordionList.styles";

interface AccordionListProps {
  title?: string;
  body?: string;
}

const AccordionList: FC<AccordionListProps> = ({ title, body }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => toggleExpand()} activeOpacity={1}>
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
              <Text style={styles.semiheader12}>Durand Cup 2025</Text>
              <Text style={styles.semiheader10}>Football</Text>
              <Text
                style={[styles.semiheader10, { color: "rgba(0, 0, 0, 0.6)" }]}
              >
                17 Aug 2025 - 19 Aug 2025
              </Text>
            </View>
          </View>

          <View style={styles.flexEnd}>
            <TouchableOpacity>
              <Feather name="heart" size={20} color="rgba(0, 0, 0, 0.6)" />
            </TouchableOpacity>

            <Text style={[styles.text10, { color: "#00B0F0" }]}>Domestic</Text>
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

      {expanded && (
        <View style={styles.padded}>
          <View style={styles.matchContainer}>
            <View style={[styles.flexRow, styles.justifyBetween]}>
              <View style={[styles.flexRow, styles.gap]}>
                <Image
                  source={images.soccerBall}
                  style={styles.ballIcon}
                  resizeMode="cover"
                />

                <Text style={styles.text12}>Jamshedpur vs Hyderabad</Text>
              </View>

              <View style={styles.orangeContainer}>
                <Text style={[styles.text12, { color: "#E17827" }]}>
                  Quarter Final
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

                  <Text style={styles.semiheader12}>17 Aug 2025</Text>
                </View>

                <View style={[styles.flexRow, styles.gap]}>
                  <Feather name="clock" size={20} color="black" />

                  <Text style={styles.semiheader12}>07:10 PM</Text>
                </View>
              </View>

              <View style={[styles.flexRow, styles.justifyBetween]}>
                <View style={[styles.flexRow, styles.gap]}>
                  <Feather name="map-pin" size={20} color="black" />

                  <Text style={styles.semiheader12}>Saket Sports Club</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default AccordionList;
