import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { getTvsStateInitialState, TelevisionState } from "./utility/util";

export default function Index() {
  let [tvsState, setTvsState] = useState<TelevisionState[]>(
    getTvsStateInitialState(),
  );

  return (
    <View style={styles.container}>
      {tvsState.map((tv) => (
        <Pressable
          onPress={() => console.log(`Pressed TV ${tv}`)}
          key={tv.tvNumber}
        >
          <View
            style={[
              styles.televisionItem,
              tv.isOccupied && styles.televisionItemOccupied,
            ]}
            key={tv.tvNumber}
          >
            <p style={styles.tvItemMargin}>P{tv.tvNumber}</p>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 20,
  },
  televisionItem: {
    color: "white",
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
});
