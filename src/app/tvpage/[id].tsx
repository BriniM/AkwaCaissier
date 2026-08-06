import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { styles } from "@/styles";
import { useAppContext } from "../../context/AppContext";
import { formatDateTime, Game, TelevisionState } from "../../utility/util";

function blurFocusedElement() {
  if (typeof document === "undefined") {
    return;
  }

  const activeElement = document.activeElement as HTMLElement | null;

  if (activeElement && typeof activeElement.blur === "function") {
    activeElement.blur();
  }
}

export default function TVPage() {
  const { id } = useLocalSearchParams();
  const { tvsState, setTvsState } = useAppContext();

  const tvId = Number(id);
  const tv = tvId && tvsState.find((t) => t.tvNumber === tvId);

  return (
    <View style={[styles.pageContainer, styles.tvPageContainer]}>
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
    <View style={styles.matchDetailsContainer}>
      <View style={styles.matchDetailsHeader}>
        <Pressable
          style={styles.button}
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
      </View>

      <View style={styles.matchListContainer}>
        <ScrollView contentContainerStyle={styles.matchList}>
          {tv.currentSession.map((game, matchIndex) => (
            <MatchLine
              game={game}
              tvId={tv.tvNumber}
              matchIndex={matchIndex}
              onDelete={(currentMatchIndex) => {
                setTvsState(
                  tvsState.map((t) =>
                    t.tvNumber === tv.tvNumber
                      ? {
                          ...t,
                          currentSession: t.currentSession.filter(
                            (_, index) => index !== currentMatchIndex,
                          ),
                        }
                      : t,
                  ),
                );
              }}
              key={`${game.startedAt}`}
            />
          ))}
          {tv.currentSession.length == 0 && <Text>No matches played yet</Text>}
        </ScrollView>
      </View>
    </View>
  );
}

function MatchLine({
  game,
  tvId,
  matchIndex,
  onDelete,
}: {
  game: Game;
  tvId: number;
  matchIndex: number;
  onDelete: (matchIndex: number) => void;
}) {
  const router = useRouter();

  return (
    <View
      style={{
        marginBottom: 12,
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Text style={{ flexShrink: 1, textAlign: "center" }}>
        Match type: {game.gameType} - Started at:{" "}
        {formatDateTime(game.startedAt)} - Ended at:{" "}
        {game.endedAt ? formatDateTime(game.endedAt) : "Ongoing"} - Notes:{" "}
        {game.notes || "None"}
      </Text>
      <Pressable
        style={[styles.button, styles.inlineEditButton]}
        onPress={() => {
          blurFocusedElement();
          setTimeout(() => {
            router.push({
              pathname: "/match-edit" as never,
              params: { tvId: String(tvId), matchIndex: String(matchIndex) },
            });
          });
        }}
      >
        <Text style={styles.buttonText}>✎ Edit</Text>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          styles.destructiveButton,
          styles.inlineEditButton,
        ]}
        onPress={() => onDelete(matchIndex)}
      >
        <Text style={styles.buttonText}>Delete Match</Text>
      </Pressable>
    </View>
  );
}
