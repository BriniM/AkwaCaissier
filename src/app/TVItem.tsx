import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
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
        <p style={styles.tvItemMargin}>P{tv.tvNumber}</p>
      </View>
    </Pressable>
  );
}
