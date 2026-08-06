import { useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { useAppContext } from "../context/AppContext";
import { styles } from "../styles";
import { Game, TelevisionState } from "../utility/util";

export default function TVPage() {
  const { id } = useLocalSearchParams();
  const { tvsState } = useAppContext();

  const tvId = Number(id);
  const tv = tvId && tvsState.find((t) => t.tvNumber === tvId);

  return (
    <View style={[styles.pageContainer, styles.alignItemsCenter]}>
      {tv ? (
        <MatchDetails tv={tv} tvsState={tvsState} />
      ) : (
        <Text>Incorrect URL</Text>
      )}
    </View>
  );
}
function MatchDetails({
  tv,
  tvsState,
}: {
  tv: TelevisionState;
  tvsState: TelevisionState[];
}) {
  return (
    <View>
      <Pressable
        style={[styles.button, styles.alignSelfFlexStart]}
        onPress={() => {
          // we mutate the state here.
          // from tvsState, we need to find the tv with the same tvNumber as tv.tvNumber and splice it.
          let splicedTv = tvsState.splice(
            tvsState.findIndex((t) => t.tvNumber === tv.tvNumber),
            1,
          )[0];
        }}
      >
        <Text style={styles.buttonText}>Create new match</Text>
      </Pressable>

      {tv.currentSession.map((game) => (
        <MatchLine game={game} />
      ))}
      {tv.currentSession.length == 0 && <Text>No matches played yet</Text>}
    </View>
  );
}

function MatchLine({ game }: { game: Game }) {
  return (
    <Text>
      Match type: {game.gameType} - Started at: {game.startedAt.toString()} -
      Ended at: {game.endedAt?.toString() || "Ongoing"} - Notes:{" "}
      {game.notes || "None"}
    </Text>
  );
}
