import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

import { styles } from "@/styles";
import { TVItem } from "../components/TVItem";
import { useAppContext } from "../context/AppContext";
import { calculateInvoiceTotal, formatCurrency } from "../utility/util";

export default function Index() {
  const { tvsState } = useAppContext();
  const [totalVisible, setTotalVisible] = useState(false);

  const totalByTv = useMemo(
    () =>
      tvsState.map((tv) => ({
        tvNumber: tv.tvNumber,
        total: calculateInvoiceTotal([
          ...tv.currentSession,
          ...tv.pastSessions.flatMap((session) => session.games),
        ]).total,
      })),
    [tvsState],
  );

  const grandTotal = useMemo(
    () => totalByTv.reduce((sum, item) => sum + item.total, 0),
    [totalByTv],
  );

  return (
    <View style={styles.pageContainer}>
      <View style={styles.indexActionBar}>
        <Pressable
          style={[styles.button, styles.totalButton]}
          onPress={() => setTotalVisible(true)}
        >
          <Text style={styles.buttonText}>Calculate total</Text>
        </Pressable>
      </View>

      <Modal
        transparent
        visible={totalVisible}
        animationType="fade"
        onRequestClose={() => setTotalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>All TVs Total</Text>
            <ScrollView
              style={styles.modalBody}
              contentContainerStyle={styles.modalBodyContent}
            >
              {totalByTv.map((tv) => (
                <View key={tv.tvNumber} style={styles.totalByTvRow}>
                  <Text style={styles.totalByTvLabel}>TV {tv.tvNumber}</Text>
                  <Text style={styles.totalByTvAmount}>
                    {formatCurrency(tv.total)}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.invoiceTotalRow}>
              <Text style={styles.invoiceTotalLabel}>Grand Total</Text>
              <Text style={styles.invoiceTotalAmount}>
                {formatCurrency(grandTotal)}
              </Text>
            </View>

            <Pressable
              style={[styles.button, styles.invoiceCloseButton]}
              onPress={() => setTotalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
