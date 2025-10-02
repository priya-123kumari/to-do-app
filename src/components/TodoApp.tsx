import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const addTodo = () => {
    if (!inputValue.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date(),
    };
    
    setTodos([newTodo, ...todos]);
    setInputValue("");
    toast({
      title: "Task added!",
      description: "Your new task has been added successfully.",
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast({
      title: "Task deleted",
      description: "Task has been removed from your list.",
      variant: "destructive",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Todo App</h1>
          <p className="text-white/80 text-lg">Stay organized and productive</p>
          {totalCount > 0 && (
            <div className="mt-4 text-white/90">
              {completedCount} of {totalCount} tasks completed
            </div>
          )}
        </div>

        {/* Add Todo Input */}
        <Card className="p-4 mb-6 backdrop-blur-md bg-white/10 border-white/20 shadow-glass">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:ring-white/50"
            />
            <Button
              onClick={addTodo}
              size="icon"
              className="bg-gradient-primary hover:shadow-hover transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <Card className="p-8 text-center backdrop-blur-md bg-white/10 border-white/20 shadow-glass">
              <div className="text-white/80">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-lg">No tasks yet!</p>
                <p className="text-sm text-white/60 mt-2">Add your first task above to get started</p>
              </div>
            </Card>
          ) : (
            todos.map((todo) => (
              <Card
                key={todo.id}
                className={`p-4 backdrop-blur-md bg-white/10 border-white/20 shadow-glass hover:shadow-hover transition-all duration-300 hover:scale-[1.02] animate-slide-up ${
                  todo.completed ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleTodo(todo.id)}
                    className={`rounded-full w-6 h-6 p-0 border-2 transition-all duration-300 ${
                      todo.completed
                        ? "bg-gradient-primary border-transparent"
                        : "border-white/40 hover:border-white/60"
                    }`}
                  >
                    {todo.completed && (
                      <Check className="h-3 w-3 text-white animate-check" />
                    )}
                  </Button>
                  
                  <span
                    className={`flex-1 text-white transition-all duration-300 ${
                      todo.completed
                        ? "line-through text-white/60"
                        : "text-white"
                    }`}
                  >
                    {todo.text}
                  </span>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-white/60 hover:text-red-400 hover:bg-red-500/20 transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm">
                Keep going! You're doing great! 🎉
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};