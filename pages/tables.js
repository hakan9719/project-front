import React from 'react'


export default function handler({tables}) {
  return (
    <>
    <h1>Tables</h1>
    <ul>
      {tables.map(table => (
        <li key={table.id}>
          <p>{table.name}</p>
          <p>{table.price}</p>
          <input type="checkbox" />
        </li>
      ))}
    </ul>
    <button>Valider la réservation</button>
    </>
  );
}

export async function getServerSideProps() {
  const data = await fetch("http://localhost:8000/api/v0/tables", {
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

