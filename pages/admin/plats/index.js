import { useRouter } from "next/router";
import React from "react";

export default function Handler({ plats }) {
  const router = useRouter();
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:8000/v0/test/plat/${e.target.value}`,
      {
        method: "DELETE",
      }
    );
    if (res.status === 200) {
      router.push("/admin/plats");
    }
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/v0/test/plat`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: `nom=${e.target.nom.value}&prix=${e.target.prix.value}`,
    });
    if (res.status === 200) {
      router.push("/admin/plats");
    }
  };
  return (
    <div>
      <div className="flex justify-center my-3 bg-base-300 shadow-xl">
        <form
          className="flex flex-col justify-center text-center"
          onSubmit={handleAdd}
        >
          <label htmlFor="nom">Nom</label>
          <input type="text" name="nom" />
          <label htmlFor="prix">Prix</label>
          <input type="number" name="prix" />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="flex flex-col sm:flex-row w-full gap-2">
        {plats?.map((plat) => (
          <div
            key={plat.id}
            className="card w-full justify-center my-3 bg-base-300 shadow-xl"
          >
            <div className="card-body text-center">
              <h2 className="card-title justify-center">{plat.nom}</h2>
              <p>Prix :{plat.prix}</p>
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary"
                  name="delete"
                  value={plat.id}
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => router.push(`/admin/plats/${plat.id}`)}
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
  const data = await fetch(`http://localhost:8000/v0/test/plat`, {
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
