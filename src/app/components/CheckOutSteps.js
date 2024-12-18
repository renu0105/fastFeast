const CheckoutSteps = ({ current = 0 }) => {
  const steps = [
    "User Login",
    "Shipping Address",
    "Payment Method",
    "Place Order",
  ];

  return (
    <ul className=" steps steps-horizontal w-full">
      {steps.map((step, index) => (
        <li
          className={`step${index >= current ? "step-primary" : ""}`}
          key={step}
        >
          {step}
        </li>
      ))}
    </ul>
  );
};
export default CheckoutSteps;
