import React, { FC, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

import { images } from "../../core/images";
import styles from "./AccordionList.styles";

interface AccordionListProps {
  tournament: any;
}

const SkeletonLoader: FC<{ style: any }> = ({ style }) => (
  <View style={[style, { backgroundColor: '#f0f0f0', borderRadius: 4 }]} />
);

const ImageWithSkeleton: FC<{
  source: any;
  placeholder: any;
  style: any;
  contentFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
}> = ({ source, placeholder, style, contentFit = 'cover' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const opacity = useState(new Animated.Value(0))[0];
  const [imageSource, setImageSource] = useState(source);

  const onLoad = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsLoading(false));
  }, [opacity]);

  // Handle case where source might be undefined
  useEffect(() => {
    if (source?.uri) {
      setImageSource(source);
    } else if (source) {
      // For local images
      setIsLoading(false);
      onLoad();
    }
  }, [source]);

  return (
    <View style={[style, { position: 'relative' }]}>
      {isLoading && <SkeletonLoader style={[StyleSheet.absoluteFillObject, { zIndex: 1 }]} />}
      <Animated.View style={[{ opacity, width: '100%', height: '100%' }, isLoading && { position: 'absolute', zIndex: 0 }]}>
        <Image
          source={imageSource}
          style={[{ width: '100%', height: '100%' }]}
          placeholder={placeholder}
          contentFit={contentFit}
          onLoad={onLoad}
          onError={() => {
            // Fallback to placeholder if image fails to load
            if (placeholder) {
              setImageSource(placeholder);
            }
          }}
          transition={300}
        />
      </Animated.View>
    </View>
  );
};

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

  console.log(tournament.matches);

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
            <ImageWithSkeleton
              source={{ uri: tournament.tournament_img_url }}
              style={styles.tournamentIcon}
              placeholder={images.tournamentIcon}
              contentFit="cover"
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

        {tournament.matches.length > 0 && (
          <View style={styles.expandIcon}>
            {expanded ? (
              <Entypo name="chevron-thin-up" size={20} color={"#E17827"} />
            ) : (
              <Entypo name="chevron-thin-down" size={20} color={"#E17827"} />
            )}
          </View>
        )}
      </TouchableOpacity>

      {expanded &&
        tournament.matches.length > 0 &&
        tournament.matches.map((match: any, index: number) => (
          <View style={styles.padded} key={index}>
            <View style={styles.matchContainer}>
              <View style={[styles.flexRow, styles.justifyBetween]}>
                <View style={[styles.flexRow, styles.gap]}>
                  <ImageWithSkeleton
                    source={{ uri: tournament.tournament_img_url }}
                    style={styles.ballIcon}
                    placeholder={images.tournamentIcon}
                    contentFit="cover"
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
                <ImageWithSkeleton
                  source={images.team1}
                  style={styles.teamImage}
                  placeholder={images.tournamentIcon}
                  contentFit="cover"
                />

                <Text style={styles.header12}>VS</Text>

                <ImageWithSkeleton
                  source={images.team2}
                  style={styles.teamImage}
                  placeholder={images.tournamentIcon}
                  contentFit="cover"
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
