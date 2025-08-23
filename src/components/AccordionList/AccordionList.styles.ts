import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
  tournamentIcon: {
    width: 40,
    height: 45,
  },
  tournamentContainer: {
    padding: 16,
    marginTop: 10,
  },
  matchContainer: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  ballIcon: {
    width: 20,
    height: 20,
  },
  orangeContainer: {
    borderWidth: 1,
    borderColor: "#E17827",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  teamImage: {
    width: 60,
    height: 67,
  },
  matchDetailsContainer: {
    paddingVertical: 10,
    marginTop: 6,
    gap: 10,
  },
  gap: {
    gap: 6,
  },
  text12: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000000",
  },
  semiheader12: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000000",
  },
  text10: {
    fontSize: 10,
    fontWeight: "400",
    color: "#E17827",
    marginLeft: 26,
    marginBottom: 10,
  },
  semiheader10: {
    fontSize: 10,
    fontWeight: "500",
    color: "#E17827",
    textTransform: "capitalize",
  },
  header12: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000000",
  },
  flexEnd: {
    gap: 11,
    alignItems: "flex-end",
  },
  padded: {
    padding: 16,
  },
  expandIcon: {
    alignItems: "center",
    marginVertical: 10,
  },
  accordionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.06)",
    paddingVertical: 6,
  },
});
