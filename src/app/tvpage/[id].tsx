import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

import { styles } from "@/styles";
import { useAppContext } from "../../context/AppContext";
import {
  calculateInvoiceTotal,
  formatCurrency,
  formatDateTime,
  Game,
  Session,
  TelevisionState,
} from "../../utility/util";

const MATCH_TYPES_WITH_EXTRA_TIME: Game["gameType"][] = ["2F", "3F", "4F"];

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
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const [totalVisible, setTotalVisible] = useState(false);
  const invoice = useMemo(
    () => calculateInvoiceTotal(tv.currentSession),
    [tv.currentSession],
  );
  const total = useMemo(
    () =>
      calculateInvoiceTotal([
        ...tv.currentSession,
        ...tv.pastSessions.flatMap((session) => session.games),
      ]),
    [tv.currentSession, tv.pastSessions],
  );

  function completeSession() {
    if (tv.currentSession.length === 0) {
      return;
    }

    const completedSession: Session = {
      completedAt: Date.now(),
      isComplete: true,
      games: tv.currentSession.map((game) => ({
        ...game,
        endedAt: game.endedAt ?? Date.now(),
      })),
    };

    setTvsState(
      tvsState.map((item) =>
        item.tvNumber === tv.tvNumber
          ? {
              ...item,
              currentSession: [],
              pastSessions: [...item.pastSessions, completedSession],
            }
          : item,
      ),
    );
  }

  function deleteSessionByIndex(sessionIndex: number) {
    setTvsState(
      tvsState.map((item) =>
        item.tvNumber === tv.tvNumber
          ? {
              ...item,
              pastSessions: item.pastSessions.filter(
                (_, index) => index !== sessionIndex,
              ),
            }
          : item,
      ),
    );
  }

  function selectSession(sessionIndex: number) {
    const selectedSession = tv.pastSessions[sessionIndex];

    if (!selectedSession) {
      return;
    }

    const archivedActiveSession = tv.currentSession.length
      ? [
          {
            completedAt: Date.now(),
            isComplete: false,
            games: tv.currentSession.map((game) => ({
              ...game,
              endedAt: game.endedAt ?? Date.now(),
            })),
          },
        ]
      : [];

    setTvsState(
      tvsState.map((item) =>
        item.tvNumber === tv.tvNumber
          ? {
              ...item,
              currentSession: selectedSession.games.map((game) => ({
                ...game,
                endedAt: null,
              })),
              pastSessions: [
                ...item.pastSessions.filter(
                  (_, index) => index !== sessionIndex,
                ),
                ...archivedActiveSession,
              ],
            }
          : item,
      ),
    );
  }

  function toggleSessionCompletion(sessionIndex: number) {
    setTvsState(
      tvsState.map((item) =>
        item.tvNumber === tv.tvNumber
          ? {
              ...item,
              pastSessions: item.pastSessions.map((session, index) =>
                index === sessionIndex
                  ? {
                      ...session,
                      isComplete: !session.isComplete,
                      completedAt: !session.isComplete
                        ? Date.now()
                        : session.completedAt,
                    }
                  : session,
              ),
            }
          : item,
      ),
    );
  }

  return (
    <View style={styles.matchDetailsContainer}>
      <View style={styles.matchDetailsHeader}>
        <Pressable
          style={[styles.button, styles.headerActionButton]}
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

        <Pressable
          style={[
            styles.button,
            styles.headerActionButton,
            styles.invoiceButton,
          ]}
          onPress={() => setInvoiceVisible(true)}
        >
          <Text style={styles.buttonText}>Calculate invoice</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.headerActionButton, styles.totalButton]}
          onPress={() => setTotalVisible(true)}
        >
          <Text style={styles.buttonText}>Calculate total</Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            styles.headerActionButton,
            styles.invoiceButton,
          ]}
          onPress={completeSession}
          disabled={tv.currentSession.length === 0}
        >
          <Text style={styles.buttonText}>Mark session as complete</Text>
        </Pressable>
        {/* calculate total for selected history sessions. */}
      </View>

      <Modal
        transparent
        visible={invoiceVisible}
        animationType="fade"
        onRequestClose={() => setInvoiceVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Invoice</Text>
            <ScrollView
              style={styles.modalBody}
              contentContainerStyle={styles.modalBodyContent}
            >
              {invoice.lineItems.length > 0 ? (
                invoice.lineItems.map((item, index) => (
                  <View
                    key={`${item.label}-${index}`}
                    style={styles.invoiceRow}
                  >
                    <Text style={styles.invoiceRowLabel}>{item.label}</Text>
                    {item.details ? (
                      <Text style={styles.invoiceRowDetails}>
                        {item.details}
                      </Text>
                    ) : null}
                    <Text style={styles.invoiceRowAmount}>
                      {formatCurrency(item.amount)}
                    </Text>
                  </View>
                ))
              ) : (
                <Text>No matches yet</Text>
              )}
            </ScrollView>

            <View style={styles.invoiceTotalRow}>
              <Text style={styles.invoiceTotalLabel}>Total</Text>
              <Text style={styles.invoiceTotalAmount}>
                {formatCurrency(invoice.total)}
              </Text>
            </View>

            <Pressable
              style={[styles.button, styles.invoiceCloseButton]}
              onPress={() => setInvoiceVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={totalVisible}
        animationType="fade"
        onRequestClose={() => setTotalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>TV Total</Text>
            <Text style={styles.totalSummaryText}>
              {total.lineItems.length} match
              {total.lineItems.length === 1 ? "" : "es"}
            </Text>
            <Text style={styles.totalSummaryAmount}>
              {formatCurrency(total.total)}
            </Text>

            <Pressable
              style={[styles.button, styles.invoiceCloseButton]}
              onPress={() => setTotalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.matchListContainer}>
        <ScrollView contentContainerStyle={styles.matchList}>
          {tv.currentSession.length > 0 && (
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Active Matches</Text>
              {tv.currentSession.map((game, matchIndex) => (
                <MatchLine
                  game={game}
                  tvId={tv.tvNumber}
                  matchIndex={matchIndex}
                  showActions
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
            </View>
          )}

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>History</Text>
            {tv.pastSessions.length > 0 ? (
              tv.pastSessions
                .slice()
                .reverse()
                .map((session, reversedIndex) => {
                  const sessionNumber = tv.pastSessions.length - reversedIndex;
                  const sessionTotal = calculateInvoiceTotal(
                    session.games,
                  ).total;
                  const originalSessionIndex =
                    tv.pastSessions.length - reversedIndex - 1;

                  return (
                    <View
                      key={`session-${sessionNumber}`}
                      style={styles.sessionBlock}
                    >
                      <Text style={styles.sessionTitle}>
                        {session.isComplete ? "Complete" : "Incomplete"} -{" "}
                        {formatDateTime(session.completedAt)} - Total{" "}
                        {formatCurrency(sessionTotal)}
                      </Text>
                      {session.games.map((game, matchIndex) => (
                        <MatchLine
                          game={game}
                          tvId={tv.tvNumber}
                          matchIndex={matchIndex}
                          showActions={false}
                          onDelete={() => undefined}
                          key={`history-${sessionNumber}-${game.startedAt}`}
                        />
                      ))}
                      <View style={styles.matchDetailsHeader}>
                        <Pressable
                          style={[
                            styles.button,
                            styles.sessionActionButton,
                            styles.destructiveButton,
                          ]}
                          onPress={() => {
                            deleteSessionByIndex(originalSessionIndex);
                          }}
                        >
                          <Text style={styles.buttonText}>Delete session</Text>
                        </Pressable>
                        <Pressable
                          style={[styles.button, styles.sessionActionButton]}
                          onPress={() => selectSession(originalSessionIndex)}
                        >
                          <Text style={styles.buttonText}>Select session</Text>
                        </Pressable>
                        <Pressable
                          style={[styles.button, styles.sessionActionButton]}
                          onPress={() =>
                            toggleSessionCompletion(originalSessionIndex)
                          }
                        >
                          <Text style={styles.buttonText}>
                            {session.isComplete
                              ? "Mark incomplete"
                              : "Mark complete"}
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  );
                })
            ) : (
              <Text style={styles.noHistoryText}>No history yet</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function MatchLine({
  game,
  tvId,
  matchIndex,
  showActions,
  onDelete,
}: {
  game: Game;
  tvId: number;
  matchIndex: number;
  showActions: boolean;
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
        {MATCH_TYPES_WITH_EXTRA_TIME.includes(game.gameType) && (
          <> - Extra time: {game.extraTime ? "Yes" : "No"}</>
        )}
      </Text>
      {showActions && (
        <>
          <Pressable
            style={[styles.button, styles.inlineEditButton]}
            onPress={() => {
              blurFocusedElement();
              setTimeout(() => {
                router.push({
                  pathname: "/match-edit" as never,
                  params: {
                    tvId: String(tvId),
                    matchIndex: String(matchIndex),
                  },
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
        </>
      )}
    </View>
  );
}
