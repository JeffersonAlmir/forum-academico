import { AntDesign, Feather } from '@expo/vector-icons';
import { View,StyleSheet, TouchableOpacity } from 'react-native';
import {Card, Text } from 'react-native-paper';






export type DepartmentProps ={
    nome: string;
    handleEdit:()=>void;
    handleDeleteConfirmation:()=>void;
};




export default function Department({nome,handleEdit,handleDeleteConfirmation}:DepartmentProps) {
    return (
    <Card style={styles.card}>
      <Card.Content style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text variant="titleMedium" numberOfLines={2}>{nome}</Text>
        </View>

        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}
            onPress={handleEdit}>
            <AntDesign name="edit" size={20} color='#4CAF50'/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}
            onPress={handleDeleteConfirmation}>
            <Feather name="trash-2" size={20} color='#F44336'/>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
    );
}



const styles = StyleSheet.create({
  card: {  
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eabfb3',
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
