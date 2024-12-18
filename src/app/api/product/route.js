import connectToDb from "@/app/middleware/connectToDb";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await connectToDb();
  try {
    const products = await Product.find();
    return NextResponse.json(
      {
        success: true,
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}

export async function POST(req, res) {
  await connectToDb();
  try {
    const body = await req.json();

    // Basic validation for required fields
    if (!body.name || !body.price) {
      return NextResponse.json(
        { success: false, error: "Name and price are required" },
        { status: 400 }
      );
    }

    const product = await Product.create(body);
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  await connectToDb();
  try {
    const { productId, rating } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    product.ratings.push(rating);
    product.updateAverageRating();
    await product.save();

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
