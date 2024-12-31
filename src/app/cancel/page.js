const cancellationPolicy = () => {
  return (
    <div className="min-h-screen  my-10">
      <div className="border-2 border-gray-300 mx-10 flex gap-7 flex-col rounded-3xl p-9 ">
        <h1 className=" text-center font-bold text-3xl ">
          Cancellation, Return & Refund Policy
        </h1>
        <p>
          We value your trust and are committed to ensuring a smooth experience
          for all our customers. You can request a cancellation within 18 hours
          of order confirmation without any charges. However, cancellations are
          not permitted after this 18-hour window. Currently, we do not provide
          return services, but exchanges are available under specific
          circumstances, such as if the product is damaged, wrongly delivered,
          or of the wrong size. Exchanges must be initiated within 7 days of
          delivery, and the items should be in their original condition as
          delivered. Please note that items purchased during sales or customized
          orders, including personalized sizes, designs, or other modifications,
          are not eligible for exchange or return. We appreciate your
          understanding and look forward to serving you better.
        </p>
      </div>
    </div>
  );
};
export default cancellationPolicy;
