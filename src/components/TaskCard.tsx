import { Card, Text, Group, ActionIcon, Chip } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { TaskCardProps } from "../Todo.types";

export function TaskCard({ index, task, onDelete, onComplete }: TaskCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{cursor: 'pointer', minHeight: 126}}> 
      <Group justify="space-between" mb="xs">
        <Text fw={500} td={task.completed ? "line-through" : "none"}>{task.title}</Text>
        <Group gap={4}>
          <ActionIcon
            variant="filled"
            size="sm"
            p={2}
            color="red"
            onClick={() => onDelete(index)}
            aria-label="delete"
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      </Group>

      <Text size="sm" c="dimmed" truncate="end">
        {task.summary}
      </Text>

      <Group justify="flex-end" mt={2}>
        <Chip checked={task.completed} onClick={() => onComplete(task)}>
          {task.completed ? "Completed" : "Incomplete"}
        </Chip>
      </Group>
    </Card>
  );
}
