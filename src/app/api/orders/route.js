import connectToDb from "@/app/middleware/connectToDb";
import OrderModel from "@/app/models/OrderModel";
import UserModel from "@/app/models/UserModel";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  await connectToDb();
  try {
    const orders = await OrderModel.find();
    return NextResponse.json(
      {
        success: true,
        orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
};

export const POST = async (req, res) => {
  await connectToDb();
  try {
    const body = await req.json();
    const isUser = await UserModel.findOne({ email: body.user });
    if (!isUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const orders = await OrderModel.create({
      ...body,
      user: isUser._id,
    });

    return NextResponse.json({ success: true, orders }, { status: 201 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
};
