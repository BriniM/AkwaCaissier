import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  tvPageContainer: {
    justifyContent: "flex-start",
    padding: 16,
  },
  matchDetailsContainer: {
    flex: 1,
    width: "100%",
  },
  matchDetailsHeader: {
    alignItems: "center",
    marginBottom: 12,
  },
  matchListContainer: {
    flex: 1,
    width: "100%",
  },
  matchList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    gap: 12,
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
  destructiveButton: {
    backgroundColor: "red",
  },
  alignSelfFlexStart: {
    alignSelf: "flex-start",
  },
  inlineEditButton: {
    marginBottom: 0,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});