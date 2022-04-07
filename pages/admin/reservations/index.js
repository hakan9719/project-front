import { useRouter } from "next/router";
import React from "react";

export default function Handler({ reservations }) {
  const router = useRouter();

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:8000/v0/test/reservation/${e.target.value}`,
      {
        method: "DELETE",
      }
    );
    if (res.status === 200) {
      router.push("/admin/reservations");
    }
  };
  return (
    <div>
      <div className="flex justify-center my-3 bg-base-300 shadow-xl">
        <button
          className="btn btn-primary"
          onClick={() => router.push(`/reservations`)}
        >
          Add
        </button>
      </div>
      <div className="flex flex-col sm:flex-row w-full gap-2">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="card w-full justify-center my-3 bg-base-300 shadow-xl"
          >
            <div className="card-body text-center">
              <h2 className="card-title justify-center">{reservation.id}</h2>
              <p>nom :{reservation.nom}</p>
              <p>prenom :{reservation.prenom}</p>
              <p>telephone :{reservation.telephone}</p>
              <p>mail :{reservation.mail}</p>
              <p>Carte :{reservation.carte}</p>
              <p>Status :{reservation.statut ? "Occupé" : "Dispo"}</p>
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary"
                  name="delete"
                  value={reservation.id}
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    router.push(`/admin/reservations/${reservation.id}`)
                  }
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
  const data = await fetch(`http://localhost:8000/v0/test/reservation`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const reservations = await data.json();

  return {
    props: {
      reservations,
    },
  };
}
