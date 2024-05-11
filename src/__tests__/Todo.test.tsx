import { render, fireEvent, waitFor } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import App from "../App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear(); 
  });

  test("adds a task", async () => {
    const { getByText, getByPlaceholderText } = render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
    const addButton = getByText("Add Task");

    fireEvent.click(addButton);

    const titleInput = getByPlaceholderText("Enter Task Title");
    fireEvent.change(titleInput, { target: { value: "New Task" } });

    const addButtonInModal = getByText("Add");
    fireEvent.click(addButtonInModal);

    await waitFor(() => {
      expect(localStorage.getItem("tasks")).toBeTruthy();
    });

    const taskElement = getByText("New Task");
    expect(taskElement).toBeDefined();
  });

  test("deletes a task", async () => {
    localStorage.setItem("tasks", JSON.stringify([{ id: 1, title: "Task 1" }]));
    expect(JSON.parse(localStorage.getItem("tasks") ?? '[]')?.length).toBe(1)

    const { getByLabelText } = render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
    const deleteButton = getByLabelText("delete");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("tasks") ?? '[]')?.length).toBe(0)
    });
  });

  test("completes a task", async () => {
    localStorage.setItem(
      "tasks",
      JSON.stringify([{ id: 1, title: "Task 1", completed: false }])
    );

    const { getByText } = render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
    const completeButton = getByText("Incomplete");

    fireEvent.click(completeButton);

    await waitFor(() => {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "");
      expect(tasks[0].completed).toBe(true);
    });
  });

  test("incompletes a task", async () => {
    localStorage.setItem(
      "tasks",
      JSON.stringify([{ id: 1, title: "Task 1", completed: true }])
    );

    const { getByText } = render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
    const completeButton = getByText("Completed");

    fireEvent.click(completeButton);

    await waitFor(() => {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "");
      expect(tasks[0].completed).toBe(false);
    });
  });
});
