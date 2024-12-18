import connectToDb from "@/app/middleware/connectToDb";
import UserModel from "@/app/models/UserModel";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectToDb();
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "Please fill all the fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // Save the user to the database
    await newUser.save();
    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
