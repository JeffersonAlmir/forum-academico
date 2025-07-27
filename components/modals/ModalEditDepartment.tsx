import { Modal, StyleSheet, TouchableOpacity,Text, TextInput, View  } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";

export type ModalDepartmentProps ={
    editModalVisible:boolean;
    editName: string;
    setEditName: (name: string) => void;
    setEditModalVisible: (visible: boolean) => void;
    handleSaveEdit: () => void;

};
const validationSchema = Yup.object().shape({
  nome: Yup.string()
    .trim()
    .min(5, "O campo tem que ter no mínimo 5 caracteres")
    .max(30)
    .required("O nome do departamento é obrigatório."),
});

export default function ModalEditDepartment({editModalVisible,setEditModalVisible,editName,setEditName,handleSaveEdit }:ModalDepartmentProps){

    return(
        <Modal
            visible={editModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setEditModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Editar Departamento</Text>
                    <Formik
                      initialValues={{nome:editName}}
                      validationSchema={validationSchema}
                      onSubmit={()=> handleSaveEdit()}
                    >
                      {({
                        handleChange,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        handleBlur, 
                      })=>(
                        <>
                          <TextInput
                            style={styles.input}
                            placeholder="Nome do Departamento"
                            value={values.nome}
                            onChangeText={(text) => {
                              handleChange("nome")(text);
                              setEditName(text);
                            }}
                            onBlur={handleBlur("nome")}
                          />
                          {touched.nome && errors.nome && (
                            <Text style={{ color: "red", marginBottom: 20 }}>{errors.nome}</Text>
                          )}
                          <View style={styles.modalButtons}>
                              <TouchableOpacity
                              style={styles.modalButton}
                              onPress={() => handleSubmit()}
                              >
                              <Text style={styles.buttonText}>Salvar</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setEditModalVisible(false)}
                              >
                                <Text style={styles.buttonText}>Cancelar</Text>
                              </TouchableOpacity>
                          </View>
                        </>
                      )}

                    </Formik>
                </View>
            </View>
        </Modal>  
    )
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
   input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});