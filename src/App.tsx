import { useState } from "react";
import { TodoType } from "./types/types";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [error, setError] = useState("");

  const submitNewTodo = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!text || !title) setError("Input cannot be empty!");

    if (text && title) {
      setError("");
      const randomId = Math.floor(Math.random() * 1000);

      const data: TodoType = {
        id: randomId,
        title,
        text,
        published: new Date().toString(),
        done: false,
      };

      setTodos([...todos, data]);
      setText("");
      setTitle("");
    }
  };

  return (
    <main className="grid place-items-center min-h-screen bg-gray-950 py-16">
      <div className="max-w-5xl mx-auto px-2 flex flex-col gap-y-4">
        <form className="flex flex-col gap-y-4">
          <input
            type="text"
            className="focus:outline-none rounded-sm shadow-sm p-2 border flex-grow"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            value={title}
            placeholder="Title"
          />
          <textarea
            className="focus:outline-none rounded-sm shadow-sm p-2 border flex-grow"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
            value={text}
            placeholder="Take a note..."
          />
          <input
            type="button"
            value="Add New Note"
            className="py-2 px-4 rounded-sm shadow-sm bg-blue-500 text-white transition-colors duration-300 hover:bg-blue-600 cursor-pointer"
            onClick={submitNewTodo}
          />
        </form>
        {error && (
          <p className="p-2 rounded-sm bg-red-100 border border-red-400 text-red-700">
            {error}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {todos.length === 0 ? (
            <p className="p-2 bg-yellow-200 text-yellow-900 rounded-sm">
              No todos for now...
            </p>
          ) : (
            todos.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  todos={todos}
                  todo={todo}
                  setTodos={setTodos}
                />
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
