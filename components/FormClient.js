import React from "react";

export default function FormClient() {
  return (
    <div className="form-control text-center">
      <h1>Infos Client</h1>
      <label className="input-group justify-center">
        <input
          type="text"
          name="nom"
          className="input input-bordered"
          placeholder="Nom"
          defaultValue="Dupont"
          required
        />
      </label>
      <label className="input-group justify-center">
        <input
          type="text"
          name="prenom"
          className="input input-bordered"
          required
          defaultValue="Jean"
          placeholder="Prenom"
        />
      </label>
      <label className="input-group justify-center">
        <input
          type="email"
          required
          name="mail"
          className="input input-bordered"
          placeholder="Mail"
          defaultValue="jeanDupont@Mail.fr"
        />
      </label>
      <label className="input-group justify-center">
        <input
          className="input input-bordered"
          type="number"
          required
          minLength={10}
          maxLength={10}
          name="telephone"
          defaultValue="0612345678"
          placeholder="Telephone"
        />
      </label>
      <label className="input-group justify-center">
        <input
          className="input input-bordered"
          type="number"
          required
          minLength={10}
          maxLength={10}
          name="carte"
          defaultValue="1234567890123456"
          placeholder="Carte"
        />
      </label>
    </div>
  );
}
