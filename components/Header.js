import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="navbar bg-base-100 px-10">
      <div className="flex-1">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl"> RestaurantFront</a>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/commandes">Commander</Link>
          </li>
          <li>
            <Link href="/reservations">Réserver tables</Link>
          </li>
          <li>
            <Link href="/admin">Admin</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
