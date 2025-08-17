import React, { useState, useEffect,} from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  RefreshControl,

} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import ModalDelete from "@/components/modals/ModalDelete";
import Department from "@/components/departament/Department";
import { IDepartment } from "@/interface/IDepartment";
import ModalEditDepartment from "@/components/modals/ModalEditDepartment";
import CreateDepButton from "@/components/button/CreateDepButton";

const Departamentos = () => {
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [selectedDepartment, setSelectedDepartment] =useState<IDepartment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState("");

  // Carrega os departamentos salvos
  const loadDepartments = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const departmentKeys = keys.filter((key) =>
        key.startsWith("department_")
      );
      const departmentsData = await AsyncStorage.multiGet(departmentKeys);
      const departmentsList = departmentsData.map(([key, value]) =>
        JSON.parse(value!)
      );

      const listaOrdenada = departmentsList.sort((a,b)=>a.nome.localeCompare(b.nome))
      
      setDepartments(listaOrdenada);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Ocorreu um erro ao carregar os departamentos.");
    }
  };

  // Abre o modal de confirmação para deletar
  const handleDeleteConfirmation = (department: IDepartment) => {
    setSelectedDepartment(department);
    setModalVisible(true);
  };

  // Deleta o departamento
  const handleDelete = async () => {
    if (!selectedDepartment) return;

    try {
      await AsyncStorage.removeItem(`department_${selectedDepartment.id}`);
      setModalVisible(false);
      loadDepartments();
      Alert.alert("Sucesso", "Departamento deletado com sucesso!");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Ocorreu um erro ao deletar o departamento.");
    }
  };

  // Abre o modal de edição
  const handleEdit = (department: IDepartment) => {
    setSelectedDepartment(department);
    setEditName(department.nome);
    setEditModalVisible(true);
  };

  // Salva as edições do departamento
  const handleSaveEdit = async () => {

    const keys = await AsyncStorage.getAllKeys();
    const departmentKeys = keys.filter((key) =>
      key.startsWith("department_")
    );
    const departmentsData = await AsyncStorage.multiGet(departmentKeys);
    const departmentsList = departmentsData.map(([key, value]) =>
      JSON.parse(value!)
    );
    
    const existe = departmentsList.some((item)=>{ 
      return item?.nome?.trim().toLowerCase() === editName.trim().toLowerCase() 
    });
    console.log(existe);

    if (existe) {
      Alert.alert("Erro", "Já existe um departamento com este nome.");
      return;
    };

    const updatedDepartment = {
      ...selectedDepartment,
      nome: editName.trim(),
    };

    try {
      await AsyncStorage.setItem(
        `department_${updatedDepartment.id}`,
        JSON.stringify(updatedDepartment)
      );
      setEditModalVisible(false);
      loadDepartments();
      Alert.alert("Sucesso", "Departamento editado com sucesso!");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Ocorreu um erro ao editar o departamento.");
    }
  };

 
  // Navegação do botão adicionar
  const handleNavigationCriarDep = () =>{
    router.push("/screens/criarDep")
  }

  // Carrega os departamentos ao abrir a página

  useEffect(() => {
    loadDepartments();
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     loadDepartments();
  //   }, [])
  // );

  const onRefresh = () => {
    setRefreshing(true);
    loadDepartments().then(() => setRefreshing(false));
  };

  return (
    <>
      <View style={styles.logoContainer}>
      
      </View>
    <View style={styles.container}>
      
      <View style={styles.buttonContainer}>
        <CreateDepButton
          handleNavigation={()=>handleNavigationCriarDep()}
        />
      </View>
      <Text style={styles.title}>Departamentos</Text>


      {/* Lista de departamentos */}
      

      <FlatList
        style={{width:375}}
        data={departments}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <Department
            nome={item.nome}
            handleEdit={() => handleEdit(item)}
            handleDeleteConfirmation={() => handleDeleteConfirmation(item)}
          />
          
        )}
      />
      

      {/* Modal de Exlusão */}
      <ModalDelete
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(false)}
        handleDelete={handleDelete}
        modalText={`Tem certeza que deseja deletar o departamento "${selectedDepartment?.nome}"?`}

      />

      {/* Modal de edição */}  
      <ModalEditDepartment
        editModalVisible={editModalVisible}
        editName={editName}
        setEditName={setEditName}
        setEditModalVisible={()=> setEditModalVisible(false)}
        handleSaveEdit={handleSaveEdit}
      />

      <Text style={styles.footer}>
        Projeto Forum Acadêmico
      </Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logoContainer: {
    width: "100%",
    backgroundColor: "#E7F6D4",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 40,
    flexDirection: 'row',
    
  },
   buttonContainer: {
    marginVertical: 10, 
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  footer: {
    marginTop: 20,
    fontSize: 12,
    color: "#666",
  },
  modeText: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  iconButton: {
    alignItems: "center", // Centraliza o ícone e o texto horizontalmente
  },
  iconText: {
    marginTop: 5, // Espaço entre o ícone e o texto
    fontSize: 14,
    color: "#333",
  },
});

export default Departamentos;
