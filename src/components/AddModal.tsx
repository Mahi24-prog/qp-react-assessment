import { Modal, Button, TextInput, Stack, Textarea } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { AddModalProps } from "../Todo.types";

export function AddModal({ opened, close, onAdd, error }: AddModalProps) {
  /* states */
  const [task, setTask] = useState({
    title: "",
    summary: "",
    completed: false,
  });

  /* Functions */
  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTask((task) => ({ ...task, [name]: value }));
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Task">
        <Stack gap="md">
          <TextInput
            label="Title"
            name="title"
            value={task.title}
            placeholder="Enter Task Title"
            withAsterisk
            onChange={(event) => onChange(event)}
            withErrorStyles={false}
            {...(error.title &&
              !task.title && { error: "Please enter task title" })}
          />
          <Textarea
            label="Summary"
            name="summary"
            value={task.summary}
            placeholder="Emter Task Summary"
            onChange={(event) => onChange(event)}
          />
          <Button onClick={() => onAdd(task)}>Add</Button>
        </Stack>
      </Modal>
    </>
  );
}
