import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { styles } from "@/styles";
import { useAppContext } from "../context/AppContext";
import {
    formatDateTime,
    Game,
    GAME_TYPES,
    TelevisionState,
} from "../utility/util";

const MATCH_TYPES_WITH_EXTRA_TIME: Game["gameType"][] = ["2F", "3F", "4F"];

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function blurFocusedElement() {
  if (typeof document === "undefined") {
    return;
  }

  const activeElement = document.activeElement as HTMLElement | null;

  if (activeElement && typeof activeElement.blur === "function") {
    activeElement.blur();
  }
}

export default function MatchEditPage() {
  const { tvId, matchIndex } = useLocalSearchParams();
  const router = useRouter();
  const { tvsState, setTvsState } = useAppContext();

  const parsedTvId = Number(firstParam(tvId));
  const parsedMatchIndex = Number(firstParam(matchIndex));

  const tv = tvsState.find((item) => item.tvNumber === parsedTvId);
  const game = tv?.currentSession[parsedMatchIndex];

  function goBack() {
    blurFocusedElement();
    setTimeout(() => {
      router.back();
    }, 0);
  }

  if (
    !tv ||
    !game ||
    Number.isNaN(parsedTvId) ||
    Number.isNaN(parsedMatchIndex)
  ) {
    return (
      <View style={[styles.pageContainer, styles.alignItemsCenter]}>
        <Text>Incorrect URL</Text>
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Edit match</Text>
        <Text>TV {tv.tvNumber}</Text>
        <Text>Started at: {formatDateTime(game.startedAt)}</Text>
        <Text>
          Ended at: {game.endedAt ? formatDateTime(game.endedAt) : "Ongoing"}
        </Text>
        <MatchEditor
          game={game}
          setTvsState={setTvsState}
          tvId={parsedTvId}
          matchIndex={parsedMatchIndex}
          onDone={goBack}
        />
      </ScrollView>
    </View>
  );
}

function MatchEditor({
  game,
  setTvsState,
  tvId,
  matchIndex,
  onDone,
}: {
  game: Game;
  setTvsState: React.Dispatch<React.SetStateAction<TelevisionState[]>>;
  tvId: number;
  matchIndex: number;
  onDone: () => void;
}) {
  const [gameType, setGameType] = useState<Game["gameType"]>(game.gameType);
  const [extraTime, setExtraTime] = useState<boolean>(game.extraTime ?? false);
  const [notes, setNotes] = useState(game.notes ?? "");
  const [endedAt, setEndedAt] = useState<number | null>(game.endedAt);

  useEffect(() => {
    setGameType(game.gameType);
    setExtraTime(game.extraTime ?? false);
    setNotes(game.notes ?? "");
    setEndedAt(game.endedAt);
  }, [game]);

  const canHaveExtraTime = MATCH_TYPES_WITH_EXTRA_TIME.includes(gameType);

  function saveMatch(nextEndedAt: number | null = endedAt) {
    setTvsState((currentState) =>
      currentState.map((item) =>
        item.tvNumber === tvId
          ? {
              ...item,
              currentSession: item.currentSession.map(
                (currentGame, currentIndex) =>
                  currentIndex === matchIndex
                    ? {
                        ...currentGame,
                        gameType,
                        extraTime: canHaveExtraTime ? extraTime : undefined,
                        notes: notes.trim() ? notes.trim() : undefined,
                        endedAt: nextEndedAt,
                      }
                    : currentGame,
              ),
            }
          : item,
      ),
    );

    if (nextEndedAt !== endedAt) {
      setEndedAt(nextEndedAt);
    }
  }

  function deleteMatch() {
    setTvsState((currentState) =>
      currentState.map((item) =>
        item.tvNumber === tvId
          ? {
              ...item,
              currentSession: item.currentSession.filter(
                (_, currentIndex) => currentIndex !== matchIndex,
              ),
            }
          : item,
      ),
    );

    onDone();
  }

  function completeMatch() {
    saveMatch(Date.now());

    onDone();
  }

  return (
    <View style={{ gap: 12 }}>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>Match type</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {GAME_TYPES.map((type) => (
          <Pressable
            key={type}
            onPress={() => setGameType(type)}
            style={{
              backgroundColor: gameType === type ? "green" : "#d1d5db",
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 999,
            }}
          >
            <Text style={{ color: gameType === type ? "white" : "black" }}>
              {type}
            </Text>
          </Pressable>
        ))}
      </View>

      {canHaveExtraTime && (
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Was there extra time?
          </Text>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            <Pressable
              onPress={() => setExtraTime(true)}
              style={{
                backgroundColor: extraTime ? "green" : "#d1d5db",
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: extraTime ? "white" : "black" }}>Yes</Text>
            </Pressable>
            <Pressable
              onPress={() => setExtraTime(false)}
              style={{
                backgroundColor: !extraTime ? "green" : "#d1d5db",
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: !extraTime ? "white" : "black" }}>No</Text>
            </Pressable>
          </View>
        </View>
      )}

      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Notes</Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          style={{
            minHeight: 120,
            borderColor: "#9ca3af",
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            textAlignVertical: "top",
          }}
        />
      </View>

      <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
        <Pressable
          style={[styles.button, styles.alignSelfFlexStart]}
          onPress={() => saveMatch()}
        >
          <Text style={styles.buttonText}>Save changes</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.alignSelfFlexStart]}
          onPress={completeMatch}
        >
          <Text style={styles.buttonText}>Mark Match as complete</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.alignSelfFlexStart]}
          onPress={onDone}
        >
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            styles.destructiveButton,
            styles.alignSelfFlexStart,
          ]}
          onPress={deleteMatch}
        >
          <Text style={styles.buttonText}>Delete Match</Text>
        </Pressable>
      </View>
    </View>
  );
}
