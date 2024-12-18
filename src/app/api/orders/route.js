import connectToDb from "@/app/middleware/connectToDb";
import OrderModel from "@/app/models/OrderModel";
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
    console.log("post order body", body);
    // Basic validation for required fields
    // if (!body.name || !body.price) {
    //   return NextResponse.json(
    //     { success: false, error: "Name and price are required" },
    //     { status: 400 }
    //   );
    // }

    // const orders = await OrderModel.create(body);
    return NextResponse.json({ success: true, orders: body }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
};
