import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";

export default function Tables() {
  const router = useRouter();
  const [table, setTable] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = router.query;

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/v0/test/tables/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        res
          .json()
          .then((data) => setTable(data))
          .catch(() => {
            router.push("/404");
          })
      )
      .catch(() => {});
    setLoading(false);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("e.target.taille.value", e.target.taille.value);
    const res = await fetch(`http://localhost:8000/v0/test/tables/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: `taille=${e.target.taille.value}`,
    });
    if (res.status === 200) {
      router.push("/admin/tables");
    }
  };
  return (
    <div>
      {!loading && (
        <div key={table.id} className="card w-full justify-center">
          <div className="card-body text-center">
            <form onSubmit={handleSubmit}>
              <h2 className="card-title justify-center">{table.taille}</h2>
              <input type="number" name="taille" defaultValue={table.taille} />
              <p>Status :{table.status ? "True" : "False"}</p>
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
