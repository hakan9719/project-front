import Link from "next/link";
import React from "react";

export default function handler() {
  return (
    <div className="w-full mx-auto text-center">
      <h1>Admin</h1>
      <ul className="mt-5 w-full mx-auto">
        <li className="font-bold text-2xl mt-8">
          <Link href="/admin/commandes">Commandes</Link>
        </li>
        <li className="font-bold text-2xl mt-8">
          <Link href="/admin/reservations">Reservations</Link>
        </li>
        <li className="font-bold text-2xl mt-8">
          <Link href="/admin/tables">Tables</Link>
        </li>
      </ul>
    </div>
  );
}
