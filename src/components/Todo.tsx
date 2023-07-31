import { TodoType } from "../types/types";

export type TodoPropsType = {
  todo: TodoType;
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const Todo = ({ todo, todos, setTodos }: TodoPropsType) => {
  const handleDeleteTodo = () => {
    const newTodoList = todos.filter((item) => item.id !== todo.id);

    setTodos(newTodoList);
  };

  const toggleTodoState = () => {
    const newTodoList = todos.map((item) =>
      item.id === todo.id ? { ...item, done: !item.done } : item
    );
    console.log(newTodoList);

    setTodos(newTodoList);
  };

  return (
    <div
      key={todo.id}
      className={`flex flex-col gap-y-4 justify-between items-start p-2 rounded-sm bg-white`}
    >
      <div>
        <p className={`text-gray-800 text-xl`}>{todo.title}</p>
        <p className={`${todo.done && "line-through"} text-gray-800`}>
          {todo.text}
        </p>
        <p className="text-xs text-gray-600">
          {todo.published.split(" ").slice(0, 5).join(" ")}
        </p>
      </div>
      <div className="flex gap-x-2">
        <button
          className="py-1 px-4 rounded-sm shadow-sm bg-red-500 text-white transition-colors duration-300 hover:bg-red-600 cursor-pointer"
          onClick={() => handleDeleteTodo()}
        >
          Del
        </button>
        <button
          className="py-1 px-4 rounded-sm shadow-sm bg-green-500 text-white transition-colors duration-300 hover:bg-green-600 cursor-pointer"
          onClick={() => toggleTodoState()}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Todo;
