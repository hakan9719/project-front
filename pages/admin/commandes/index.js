import { useRouter } from "next/router";
import React from "react";

export default function Handler({ commandes }) {
  const router = useRouter();
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:8000/v0/test/commande/${e.target.value}`,
      {
        method: "DELETE",
      }
    );
    if (res.status === 200) {
      router.push("/admin/commandes");
    }
  };
  return (
    <div>
      <div className="flex justify-center my-3 bg-base-300 shadow-xl">
        <button
          className="btn btn-primary"
          onClick={() => router.push(`/commandes`)}
        >
          Add
        </button>
      </div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center w-full gap-2">
        {commandes.map((commande) => (
          <div
            key={commande.id}
            className="card w-72 justify-center my-3 bg-base-300 shadow-xl"
          >
            <div className="card-body text-center">
              <h2 className="card-title justify-center">{commande.id}</h2>
              <p>nom :{commande.nom}</p>
              <p>prenom :{commande.prenom}</p>
              <p>telephone :{commande.telephone}</p>
              <p>mail :{commande.mail}</p>
              <p>Carte :{commande.carte}</p>
              <p>
                Status :
                {commande.statut == "0"
                  ? "En préparation"
                  : commande.statut == "1"
                  ? "Prêt"
                  : "Délivré"}
              </p>
              <p>Plats :</p>
              {commande.plats.map((plat) => (
                <div key={plat.id}>
                  <p>nomPlat :{plat.nomPlat}</p>
                  <p>quantite :{plat.quantite}</p>
                </div>
              ))}
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary"
                  name="delete"
                  value={commande.id}
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => router.push(`/admin/commandes/${commande.id}`)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await fetch(`http://localhost:8000/v0/test/commande`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const commandes = await data.json();


  return {
    props: {
      commandes,
    },
  };
}
