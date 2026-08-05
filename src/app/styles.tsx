import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  tvsWrapper: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
  },
  tvRow: {
    display: "flex",
    flexDirection: "row",
  },
  secondTvRow: {
    marginTop: 16,
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  televisionItem: {
    backgroundColor: "green",
    padding: 20,
    marginRight: 20,
    borderRadius: 20,
  },
  televisionItemOccupied: {
    backgroundColor: "red",
  },
  tvItemMargin: {
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  alignSelfFlexStart: {
    alignSelf: "flex-start",
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});
