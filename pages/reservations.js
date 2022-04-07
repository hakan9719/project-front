import { useRouter } from "next/router";
import React from "react";
import FormClient from "../components/FormClient";

export default function Handler({ tables }) {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm = Array.from(e.target.taille);
    const dataClient = {
      nom: e.target.nom.value,
      prenom: e.target.prenom.value,
      mail: e.target.mail.value,
      telephone: e.target.telephone.value,
      carte: e.target.carte.value,
    };
    const data = [];
    dataForm.map((item) => {
      if (item.checked) {
        data = [
          ...data,
          {
            id: item.id,
          },
        ];
      }
    });
    const stringData = "";
    data.forEach((val) => {
      stringData += '{"id":' + val.id + "},";
    });
    stringData = stringData.slice(0, -1);
    const tablesFormat = "tables=[" + stringData + "]";

    var bodyFormat = [];
    Object.keys(dataClient).forEach((element) => {
      bodyFormat += `&${element}=${dataClient[element]}`;
    });
    
    const result = await fetch("http://localhost:8000/v0/test/reservation", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: bodyFormat + "&" + tablesFormat,
    });
    const resultData = await result.json();
    router.push("/");
  };

  const handleCheckbox = (e) => {
    e.target.value = !e.target.checked;
  };
  return (
    <div className="text-center">
      <h1 className="font-bold text-3xl p-2 my-8">Nos tables</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-around sm:flex-row gap-4">
          {tables.map((table) => {
            if (table.statut) {
              return (
                <div key={table.id} className="card w-96 bg-base-300 shadow-xl">
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">
                      Table de taille {table.taille}
                    </h2>
                    <div className="card-actions">
                      <label className="label cursor-pointer">
                        <input
                          type="checkbox"
                          id={table.id}
                          name="taille"
                          value={table.taille}
                          onChange={handleCheckbox}
                          className="checkbox checkbox-primary"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              );
            }
          })}
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

export async function getServerSideProps(context) {
  const data = await fetch("http://localhost:8000/v0/test/tables", {
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
