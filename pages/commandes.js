import React from "react";
import FormClient from "../components/FormClient";
import Header from "../components/Header";

export default function handler({ plats }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataForm = Array.from(e.target.quantity);
    const data = [];
    dataForm.map((item) => {
      data = [
        ...data,
        {
          id: item.id,
          quantity: item.value,
        },
      ];
    });
  };
  return (
    <>
      <Header />
      <div className="text-center">
        <h1 className="font-bold text-3xl p-2 my-8">Nos plats</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-around sm:flex-row gap-4">
            {plats.map((plat) => (
              <div key={plat.id} className="card w-96 bg-base-300 shadow-xl">
                <figure className="px-10 pt-10">
                  <img
                    src="https://api.lorem.space/image/shoes?w=400&h=225"
                    alt="Shoes"
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{plat.name}</h2>
                  <p>{plat.prix}€</p>
                  <div className="card-actions">
                    <input
                      type="number"
                      min={0}
                      name="quantity"
                      id={plat.id}
                      defaultValue={0}
                      className="input w-full max-w-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <FormClient />
          <div className="mt-20">
            <button className="btn btn-secondary" type="submit">
              Valider
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const data = await fetch("http://localhost:8000/v0/test/plat", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const plats = await data.json();
  return {
    props: {
      plats,
    },
  };
}
