import { useRouter } from "next/router";
import React from "react";
import FormClient from "../components/FormClient";

export default function Handler({ plats }) {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm = Array.from(e.target.quantite);
    const dataClient = {
      nom: e.target.nom.value,
      prenom: e.target.prenom.value,
      mail: e.target.mail.value,
      telephone: e.target.telephone.value,
      carte: e.target.carte.value,
    };
    const data = [];
    dataForm.map((item) => {
      if (item.value > 0) {
        data = [
          ...data,
          {
            id: item.id,
            quantite: item.value,
          },
        ];
      }
    });
    const stringData = "";
    data.forEach((val) => {
      stringData += '{"plat":' + val.id + ',"quantite":' + val.quantite + "},";
    });
    stringData = stringData.slice(0, -1);
    const platsFormat = "plats=[" + stringData + "]";

    var bodyFormat = [];
    Object.keys(dataClient).forEach((element) => {
      bodyFormat += `&${element}=${dataClient[element]}`;
    });

    const result = await fetch("http://localhost:8000/v0/test/commande/order", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: bodyFormat + "&" + platsFormat,
    });
    const resultData = await result.json();
    router.push("/");
  };
  return (
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
                <h2 className="card-title">{plat.nom}</h2>
                <p>{plat.prix}€</p>
                <div className="card-actions">
                  <input
                    type="number"
                    min={0}
                    name="quantite"
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
