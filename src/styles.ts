import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  indexActionBar: {
    alignItems: "center",
    marginBottom: 16,
  },
  tvPageContainer: {
    justifyContent: "flex-start",
    padding: 16,
  },
  matchDetailsContainer: {
    flex: 1,
    width: "100%",
  },
  matchDetailsHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  matchListContainer: {
    flex: 1,
    width: "100%",
  },
  matchList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    gap: 12,
  },
  sectionBlock: {
    width: "100%",
    gap: 12,
  },
  sessionBlock: {
    width: "100%",
    gap: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
  },
  sessionActionButton: {
    alignSelf: "center",
    marginTop: 4,
  },
  noHistoryText: {
    textAlign: "center",
    width: "100%",
    color: "#4b5563",
  },
  tvsWrapper: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
  },
  tvRow: {
    display: "flex",
    flexDirection: "row",
  },
  secondTvRow: {
    marginTop: 16,
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  televisionItem: {
    backgroundColor: "green",
    padding: 20,
    marginRight: 20,
    borderRadius: 20,
  },
  televisionItemOccupied: {
    backgroundColor: "red",
  },
  tvItemMargin: {
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerActionButton: {
    marginBottom: 0,
  },
  destructiveButton: {
    backgroundColor: "red",
  },
  invoiceButton: {
    backgroundColor: "#0f766e",
  },
  totalButton: {
    backgroundColor: "#2563eb",
  },
  invoiceCloseButton: {
    alignSelf: "center",
  },
  alignSelfFlexStart: {
    alignSelf: "flex-start",
  },
  inlineEditButton: {
    marginBottom: 0,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalCard: {
    width: "100%",
    maxWidth: 560,
    maxHeight: "85%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  modalBody: {
    flexGrow: 0,
  },
  modalBodyContent: {
    gap: 12,
    paddingBottom: 8,
  },
  invoiceRow: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  invoiceRowLabel: {
    fontWeight: "600",
  },
  invoiceRowDetails: {
    color: "#4b5563",
  },
  invoiceRowAmount: {
    fontWeight: "700",
    textAlign: "right",
  },
  invoiceTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#d1d5db",
  },
  invoiceTotalLabel: {
    fontSize: 18,
    fontWeight: "700",
  },
  invoiceTotalAmount: {
    fontSize: 18,
    fontWeight: "700",
  },
  totalSummaryText: {
    textAlign: "center",
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 8,
  },
  totalSummaryAmount: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
  },
  totalByTvRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
  },
  totalByTvLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  totalByTvAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  buttonText: {
    color: "white",
  },
});