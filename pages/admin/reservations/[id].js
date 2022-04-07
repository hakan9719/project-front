import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";

export default function Handler() {
  const router = useRouter();
  const [reservation, setReservation] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = router.query;

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/v0/test/reservation/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        res
          .json()
          .then((data) => setReservation(data))
          .catch(() => {
            router.push("/404");
          })
      )
      .catch(() => {});
    setLoading(false);
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/v0/test/reservation/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: `statut=${e.target.statut.checked?1:0}`,
    });
    if (res.status === 200) {
      router.push("/admin/reservations");
    }
  };

  return (
    <div>
      {!loading && (
        <div key={reservation.id} className="card w-full justify-center">
          <div className="card-body text-center">
            <form onSubmit={handleSubmit}>
              <h2 className="card-title justify-center">{reservation.id}</h2>
              <label className="label cursor-pointer w-32 text-center mx-auto">
                <p>Status :</p>
                <input
                  type="checkbox"
                  id={reservation.id}
                  name="statut"
                  value={reservation.statut}
                  defaultChecked={reservation.statut}
                  className="checkbox checkbox-primary"
                />
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
