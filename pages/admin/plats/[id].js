import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";

export default function Handler() {
  const router = useRouter();
  const [plat, setPlat] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = router.query;

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/v0/test/plat/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        res
          .json()
          .then((data) => setPlat(data))
          .catch(() => {
            router.push("/404");
          })
      )
      .catch(() => {});
    setLoading(false);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/v0/test/plat/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: `nom=${e.target.nom.value}&prix=${e.target.prix.value}`,
    });
    if (res.status === 200) {
      router.push("/admin/plats");
    }
  };
  return (
    <div>
      {!loading && (
        <div key={plat.id} className="card w-full justify-center">
          <div className="card-body text-center">
            <form onSubmit={handleSubmit}>
              <h2 className="card-title justify-center">{plat.id}</h2>
              <label htmlFor="nom">Nom</label>
              <input type="text" name="nom" defaultValue={plat.nom} />
              <label htmlFor="prix">Prix</label>
              <input type="number" name="prix" defaultValue={plat.prix} />
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
