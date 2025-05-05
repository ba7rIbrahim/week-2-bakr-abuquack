import { Banknote, CarIcon, MessageSquareLock, Phone } from "lucide-react";

const featuresItems = [
  {
    title: "Fash Shipping",
    subtitle: "Order above $200",
    icon: <CarIcon size={60} strokeWidth={0.5} />,
  },
  {
    title: "Money-back",
    subtitle: "30 days guarantee",
    icon: <Banknote size={60} strokeWidth={0.5} />,
  },
  {
    title: "Secure Payment",
    subtitle: "Secured by Stripe",
    icon: <MessageSquareLock size={60} strokeWidth={0.5} />,
  },
  {
    title: "24/7 Support",
    subtitle: "Phone and Email support",
    icon: <Phone size={60} strokeWidth={0.5} />,
  },
];

export const FeaturesSection = () => {
  return (
    <div className="my-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
      {featuresItems.map((feature) => (
        <div
          key={feature.title}
          className="flex flex-col gap-2 items-start bg-gray-100 p-4 md:p-6"
        >
          {feature.icon}
          <h3 className="text-h3">{feature.title}</h3>
          <p className="text-p text-sm">{feature.subtitle}</p>
        </div>
      ))}
    </div>
  );
};
