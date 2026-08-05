import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { styles } from "./styles";
import { TelevisionState } from "./utility/util";

export function TVItem({ tv }: { tv: TelevisionState }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/tvpage/[id]",
          params: { id: tv.tvNumber },
        });
      }}
    >
      <View
        style={[
          styles.televisionItem,
          tv.isOccupied && styles.televisionItemOccupied,
        ]}
      >
        <Text style={[styles.tvItemMargin, styles.buttonText]}>
          P{tv.tvNumber}
        </Text>
      </View>
    </Pressable>
  );
}
