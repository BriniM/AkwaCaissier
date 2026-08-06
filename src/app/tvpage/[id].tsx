import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { styles } from "@/styles";
import { useAppContext } from "../../context/AppContext";
import { formatDateTime, Game, TelevisionState } from "../../utility/util";

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

      {tv.currentSession.map((game, matchIndex) => (
        <MatchLine
          game={game}
          tvId={tv.tvNumber}
          matchIndex={matchIndex}
          key={`${game.startedAt}`}
        />
      ))}
      {tv.currentSession.length == 0 && <Text>No matches played yet</Text>}
    </View>
  );
}

function MatchLine({
  game,
  tvId,
  matchIndex,
}: {
  game: Game;
  tvId: number;
  matchIndex: number;
}) {
  const router = useRouter();

  return (
    <View
      style={{
        marginBottom: 12,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Text style={{ flexShrink: 1 }}>
        Match type: {game.gameType} - Started at:{" "}
        {formatDateTime(game.startedAt)} - Ended at:{" "}
        {game.endedAt ? formatDateTime(game.endedAt) : "Ongoing"} - Notes:{" "}
        {game.notes || "None"}
      </Text>
      <Pressable
        style={[styles.button, styles.inlineEditButton]}
        onPress={() => {
          router.push({
            pathname: "/match-edit" as never,
            params: { tvId: String(tvId), matchIndex: String(matchIndex) },
          });
        }}
      >
        <Text style={styles.buttonText}>✎ Edit</Text>
      </Pressable>
    </View>
  );
}
