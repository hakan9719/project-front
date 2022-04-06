import { useRouter } from "next/router";
import React from "react";

export default function Handler({ tables }) {
  const router = useRouter();
  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const res = await fetch(
      `http://localhost:8000/v0/test/tables/${e.target.value}`,
      {
        method: "DELETE",
      }
    );
    if (res.status === 200) {
      router.push("/admin/tables");
    }
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(e.target.taille.value);
    const res = await fetch(`http://localhost:8000/v0/test/tables`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: `taille=${e.target.taille.value}`,
    });
    if (res.status === 200) {
      router.push("/admin/tables");
    }
  };
  return (
    <div>
      <div className="flex justify-center my-3 bg-base-300 shadow-xl">
        <form
          className="flex flex-col justify-center text-center"
          onSubmit={handleAdd}
        >
          <label htmlFor="taille">Taille</label>
          <input type="number" name="taille" defaultValue="2" />
          <button type="submit">Add</button>
        </form>
      </div>
      {tables.map((table) => (
        <div
          key={table.id}
          className="card w-full justify-center my-3 bg-base-300 shadow-xl"
        >
          <div className="card-body text-center">
            <h2 className="card-title justify-center">{table.taille}</h2>
            <p>Status :{table.status ? "True" : "False"}</p>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                name="delete"
                value={table.id}
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="btn btn-primary"
                onClick={() => router.push(`/admin/tables/${table.id}`)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await fetch(`http://localhost:8000/v0/test/tables`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const tables = await data.json();
  return {
    props: {
      tables,
    },
  };
}
