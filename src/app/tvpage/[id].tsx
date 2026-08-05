import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function TVPage() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>TV ID: {id}</Text>
    </View>
  );
}
