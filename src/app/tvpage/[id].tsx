import { useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { useAppContext } from "../context/AppContext";
import { styles } from "../styles";
import { Game, TelevisionState } from "../utility/util";

export default function TVPage() {
  const { id } = useLocalSearchParams();
  const { tvsState, setTvsState } = useAppContext();

  const tvId = Number(id);
  const tv = tvId && tvsState.find((t) => t.tvNumber === tvId);

  return (
    <View style={[styles.pageContainer, styles.alignItemsCenter]}>
      {tv ? (
        <MatchDetails tv={tv} tvsState={tvsState} setTvsState={setTvsState} />
      ) : (
        <Text>Incorrect URL</Text>
      )}
    </View>
  );
}
function MatchDetails({
  tv,
  tvsState,
  setTvsState,
}: {
  tv: TelevisionState;
  tvsState: TelevisionState[];
  setTvsState: (newState: TelevisionState[]) => void;
}) {
  return (
    <View>
      <Pressable
        style={[styles.button, styles.alignSelfFlexStart]}
        onPress={() => {
          setTvsState(
            tvsState.map((t) =>
              t.tvNumber === tv.tvNumber
                ? {
                    ...t,
                    currentSession: [
                      ...t.currentSession,
                      {
                        gameType: "TBD",
                        startedAt: Date.now(),
                        endedAt: null,
                      },
                    ],
                  }
                : t,
            ),
          );
        }}
      >
        <Text style={styles.buttonText}>Create new match</Text>
      </Pressable>

      {tv.currentSession.map((game) => (
        <MatchLine game={game} key={`${game.startedAt}`} />
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
