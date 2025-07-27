import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type ModalDeleteProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  handleDelete: () => void;
  modalText:string;
};

export default function ModalDelete({
  modalVisible,
  setModalVisible,
  handleDelete,
  modalText
}: ModalDeleteProps) {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            {modalText} 
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
              <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
