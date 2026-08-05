import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useAppContext } from "../context/AppContext";

export default function TVPage() {
  const { id } = useLocalSearchParams();
  const { tvsState } = useAppContext();

  const tvId = Number(id);

  const tv = tvId && tvsState.find((t) => t.tvNumber === tvId);

  return (
    <View>{tv ? <Text>TV ID: {id}</Text> : <Text>Incorrect URL</Text>}</View>
  );
}
