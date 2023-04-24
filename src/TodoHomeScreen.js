import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native";
import { CheckBox, Input, Text, Button } from "@rneui/themed";
import * as Font from "expo-font";
import * as React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    margin: 5,
  },
  addTaskContainer: {
    flexDirection: "column", 
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
});

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font));
}

let initTasks = [
  { description: "Task1", completed: true, key: 1, relatedTasks: [2] },
  { description: "Task2", completed: true, key: 2 },
];

const Stack = createNativeStackNavigator();

const TodoHomeScreen = () => {
  let [tasks, setTasks] = useState(initTasks);
  let [showCompleted, setShowCompleted] = useState(true);
  useEffect(() => {
    async function getValue() {
      const value = await AsyncStorage.getItem("@tasks");
      if (value === null) {
        console.log(
          "Storing serialized version of our tasks" + JSON.stringify(tasks)
        );
      } else {
        let parsedValue = JSON.parse(value);
        console.log(parsedValue);
        setTasks(JSON.parse(value));
      }
    }
    getValue();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Todo List">
      <Stack.Screen name="Todo List">
        {(props) => (
          <TodoScreen
            {...props}
            tasks={tasks}
            setTasks={setTasks}
            showCompleted={showCompleted}
            setShowCompleted={setShowCompleted}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Details">
        {(props) => (
          <DetailsScreen {...props} tasks={tasks} setTasks={setTasks} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

function DetailsScreen({ navigation, route, setTasks, tasks }) {
  let { description, completed, key, relatedTasks } = route.params.item;
  useEffect(() => {
    navigation.setOptions({
      title: description === "" ? "No title" : description,
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>{description}</Text>
      {relatedTasks !== undefined && relatedTasks.length > 0 ? (
        <>
          <Text>Related Tasks:</Text>
          {tasks
            .filter((task) => relatedTasks.includes(task.key))
            .map((cTask) => (
              <Button
                key={cTask.key}
                title={cTask.description}
                onPress={() => {
                  navigation.dispatch(
                    StackActions.push("Details", { item: cTask })
                  );
                }}
              />
            ))}
        </>
      ) : undefined}
    </View>
  );
}

function TodoScreen({
  navigation,
  tasks,
  setTasks,
  showCompleted,
  setShowCompleted,
}) {

  const [fontsLoaded, setFontsLoaded] = useState(false);
  let [input, setInput] = useState("");
  useEffect(() => {
    async function loadFonts() {
      await cacheFonts([FontAwesome.font]);
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  let updateTask = async (task) => {
    console.log(task);
    task.completed = !task.completed;
    setTasks([...tasks]);
    await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
  };

  let addTask = async () => {
    let maxKey = 0;
    tasks.forEach((task) => {
      if (task.key > maxKey) {
        maxKey = task.key;
      }
    });
    let newTasks = [
      ...tasks,
      {
        description: input,
        completed: false,
        key: maxKey + 1,
      },
    ];
    setTasks(newTasks);
    console.log(newTasks);
    await AsyncStorage.setItem("@tasks", JSON.stringify(newTasks));
    setInput("");
  };

  function toggleShowCompleted() {
    setShowCompleted(!showCompleted);
  }

  function renderItem({ item }) {
    const deleteTask = async () => {
      const updatedTasks = tasks.filter((task) => task.key !== item.key);
      setTasks(updatedTasks);
      await AsyncStorage.setItem("@tasks", JSON.stringify(updatedTasks));
    };

    if (!showCompleted && item.completed) {
      return null;
    }
    return (
      <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
        <CheckBox
          textStyle={
            item.completed
              ? {
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid",
                }
              : undefined
          }
          title={item.description}
          checked={item.completed}
          onPress={() => updateTask(item)}
        />
        <Button
          style={styles.button}
          title="Details"
          onPress={() => navigation.navigate("Details", { item })}
        />
        <Button style={styles.button} title="Delete" onPress={deleteTask} />
      </View>
    );
  }

  return fontsLoaded ? (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button onPress={() => toggleShowCompleted()}>
        <Text>{showCompleted ? "Hide Completed" : "Show Completed"}</Text>
      </Button>
      <FlatList
        style={{ width: "100%" }}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key.toString()}
      />
      <View style={styles.addTaskContainer}>
        <Input
          onChangeText={setInput}
          value={input}
          placeholder="New Task..."
        ></Input>
        <Button title="Add Task" onPress={addTask} />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
}

export default TodoHomeScreen;
