import AddToCart from "@/app/components/AddToCart";
import connectToDb from "@/app/middleware/connectToDb";
import Product from "@/app/models/Product";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  await connectToDb();
  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

async function ProductDetails({ params }) {
  const { slug } = await params;

  await connectToDb();
  const product = await Product.findOne({ slug }).lean();
  if (!product) {
    return <h1>Product not found</h1>;
  }
  return (
    <div className="flex flex-row gap-12 lg:gap-20 min-h-screen justify-center">
      <div className="w-fit flex mt-4 h-fit  ">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-3xl w-fit h-[550px] object-cover lg:w-[500px]"
        />
      </div>

      <div className="w-[50%] flex flex-col my-3 text-xl lg:gap-8 gap-2  h-fit  lg:h-[550px] lg:justify-center">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p>{product.description}</p>

        <div className="bg-zinc-600 h-fit w-full text-white rounded-3xl flex flex-col justify-center gap-6 p-6 my-3">
          <span className="flex justify-between">
            <p>Price :</p>
            <p>${product.price}</p>
          </span>
          <span className="flex justify-between">
            <p>Stock :</p>
            <p>
              {product && product.stock === 0 ? "Out of Stock" : "In stock"}
            </p>
          </span>

          <AddToCart
            item={{
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
              stock: product.stock,
              description: product.description,
              product: String(product._id),
              quantity: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
