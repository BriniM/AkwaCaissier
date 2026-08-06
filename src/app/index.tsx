import { View } from "react-native";

import { styles } from "@/styles";
import { TVItem } from "../components/TVItem";
import { useAppContext } from "../context/AppContext";

export default function Index() {
  const { tvsState } = useAppContext();

  return (
    <View style={styles.pageContainer}>
      <View style={styles.tvsWrapper}>
        <View>
          <View style={styles.tvRow}>
            {tvsState.slice(0, 4).map((tv) => (
              <TVItem tv={tv} key={tv.tvNumber} />
            ))}
          </View>
          <View style={[styles.tvRow, styles.secondTvRow]}>
            {tvsState.slice(4, 6).map((tv) => (
              <TVItem tv={tv} key={tv.tvNumber} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
