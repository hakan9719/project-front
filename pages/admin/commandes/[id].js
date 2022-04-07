import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";

export default function Handler() {
  const router = useRouter();
  const [commande, setCommande] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = router.query;

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/v0/test/commande/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        res
          .json()
          .then((data) => setCommande(data))
          .catch(() => {
            router.push("/404");
          })
      )
      .catch(() => {});
    setLoading(false);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/v0/test/commande/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: `statut=${e.target.statut.value}`,
    });
    if (res.status === 200) {
      router.push("/admin/commandes");
    }
  };

  return (
    <div>
      {!loading && (
        <div key={commande.id} className="card w-full justify-center">
          <div className="card-body text-center">
            <form onSubmit={handleSubmit}>
              <h2 className="card-title justify-center">{commande.id}</h2>
              <p>nom :{commande.nom}</p>
              <p>prenom :{commande.prenom}</p>
              <p>telephone :{commande.telephone}</p>
              <p>mail :{commande.mail}</p>
              <p>Carte :{commande.carte}</p>
              <label className="label cursor-pointer w-32 text-center mx-auto">
                <p>Status :</p>
                <select name="statut" id={commande.id} defaultValue={commande.statut}>
                  <option value="0">En préparation</option>
                  <option value="1">Prêt</option>
                  <option value="2">Délivré</option>
                </select>
              </label>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
