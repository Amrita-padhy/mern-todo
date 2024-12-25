import connectToDatabase from "../../../lib/mongodb";
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export async function GET() {
  await connectToDatabase();
  try {
    const todos = await Todo.find();
    return new Response(JSON.stringify(todos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching todos", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const todo = await Todo.create(body);
    return new Response(JSON.stringify(todo), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error creating todo", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request) {
  await connectToDatabase();
  try {
    const { id } = await request.json();
    const todo = await Todo.findByIdAndDelete(id);
    return new Response(JSON.stringify(todo), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error deleting todo", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(request) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const todo = await Todo.findByIdAndUpdate(body.id, body, { new: true });
    return new Response(JSON.stringify(todo), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error updating todo", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
