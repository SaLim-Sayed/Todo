import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import CheckBox from "@react-native-community/checkbox"; // Import CheckBox from @react-native-community/checkbox

export default function App() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);

  const addTodo = () => {
    if (value !== "") {
      setTodo([...todo, { title: value, completed: false }]);
      setValue("");
    } else {
      Alert.alert("Please Enter Todo");
    }
  };

  const toggleComplete = (index) => {
    const updatedTodo = [...todo];
    updatedTodo[index].completed = !updatedTodo[index].completed;
    setTodo(updatedTodo);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Todo List </Text>
      </View>

      <View style={styles.todo}>
        <TextInput
          placeholder="Enter Todo"
          placeholderTextColor="gray"
          multiline
          numberOfLines={2}
          autoCapitalize="characters"
          style={styles.input}
          onChangeText={(val) => setValue(val)}
          value={value}
        />
        <TouchableOpacity style={styles.btn} onPress={addTodo}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />

      {todo.map((item, index) => (
        <View key={index} style={styles.todo}>
          <Text
            numberOfLines={1}
            autoCapitalize={true}
            style={item.completed ? styles.completedText : null}
          >
            {item.title}
          </Text>
          {/* Checkbox to mark task as completed */}
          <TouchableOpacity
            style={styles.btn}
            value={item.completed}
            onPress={() => toggleComplete(index)}
          >
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
  },
  input: {
    borderColor: "#000",
    borderRadius: 10,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  btn: {
    backgroundColor: "#ccf",
    borderRadius: 10,
    marginVertical: 10,
    padding: 8,
  },
  todo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
    gap: 8,
  },
  completedText: {
    textDecorationLine: "line-through",
  },
});
