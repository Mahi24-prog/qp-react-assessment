import { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { Container, Group, Title, Button, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AddModal } from "./components/AddModal";
import { TaskCard } from "./components/TaskCard";
import { Task } from "./Todo.types";

export default function App() {
  /* states */
  const [opened, { open, close }] = useDisclosure(false);
  const [taskList, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState({ title: false });

  /* Functions */
  const onAdd = (task: Task) => {
    if (task.title) {
      const id = taskList.length;
      const updatedList = [...taskList, { id, ...task }];
      saveTasks(updatedList);
      close();
    } else {
      setError({ title: true });
    }
  };

  const onDelete = (index: number) => {
    const updatedList = [
      ...taskList.slice(0, index),
      ...taskList.slice(index + 1),
    ];
    saveTasks(updatedList);
  };

  const onComplete = (updatedTask: Task) => {
    const updatedList = taskList.map((task) => {
      if (task.id === updatedTask.id) {
        return { ...updatedTask, completed: !updatedTask.completed };
      } else {
        return task;
      }
    });
    saveTasks(updatedList);
  };

  function loadTasks() {
    let loadedTasks = localStorage.getItem("tasks");
    let tasks: Task[] = [];

    if (loadedTasks) {
      tasks = JSON.parse(loadedTasks);
    }

    setTasks(tasks);
  }

  function saveTasks(tasks: Task[]) {
    setTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setError({ title: false });
  }

  /*useEffetct added to load data from localstorage on first render*/
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Container
      size="xs"
      style={{
        backgroundColor: "#eee8f6",
        height: 700,
        marginTop: 4,
        borderRadius: 10,
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <Group justify="space-between" p={12} mb={4}>
        <Title>ToDo</Title>
        <Button onClick={open}>Add Task</Button>
      </Group>
      {opened && (
        <AddModal opened={opened} close={close} onAdd={onAdd} error={error} />
      )}
      {!taskList.length && (
        <Stack h={500} gap={0} justify="center" align="center">
          <Text fw={500} size="lg" ta="center">
            No Task Avilable
          </Text>
          <Text fw={300} size="sm" ta="center">
            Click on Add to add new Task
          </Text>
        </Stack>
      )}
      <Stack gap={8}>
        <List
          height={600}
          itemCount={taskList.length}
          itemSize={130}
          width="100%"
        >
          {({ index, style }) => (
            <div style={style}>
              <TaskCard
                key={taskList[index].id}
                index={index}
                task={taskList[index]}
                onDelete={onDelete}
                onComplete={onComplete}
              />
            </div>
          )}
        </List>
      </Stack>
    </Container>
  );
}
