import Image from "next/image";

export interface Drink {
  name: string;
  description?: string;
  image: string;
  quantity: number;
}

const DrinkList = ({
  drinks,
  // onClick,
}: {
  drinks: Drink[];
  // onClick: (drink: Drink, type: "increase" | "decrease") => void;
}) => {
  return (
    <div className="max-w-md mx-auto p-4">
      {drinks.map((drink, index) => (
        <div key={index} className="flex items-center space-x-4 py-4 mb-4">
          <Image
            src={drink.image}
            alt={drink.name}
            width={80}
            height={80}
            className="rounded-lg"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">
              {drink.name.toUpperCase()}
            </h3>
            <p className="text-gray-500 text-sm">{drink.description}</p>
          </div>
          {/* {drink.quantity > 0 ? (
            <div className="bg-[var(--ocean-green)] rounded-full justify-center items-center flex flex-col">
              <button
                className="w-10 h-10 bg-[var(--ocean-green)] text-black rounded-full text-3xl flex items-center justify-center"
                onClick={() => onClick(drink, "increase")}
              >
                +
              </button>
              <h1 className="text-black font-medium text-md">
                {drink.quantity}
              </h1>
              <button
                className="w-10 h-10 text-black rounded-full text-3xl flex items-center justify-center"
                onClick={() => onClick(drink, "decrease")}
              >
                -
              </button>
            </div>
          ) : (
            <button
              className="w-10 h-10 bg-[var(--ocean-green)] text-black rounded-full text-3xl flex items-center justify-center"
              onClick={() => onClick(drink, "increase")}
            >
              +
            </button>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default DrinkList;
