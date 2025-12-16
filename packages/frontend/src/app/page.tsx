"use client";
import _ from "lodash";

export default function Home() {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 1, name: "Item 1 Duplicate" },
  ];

  const unique = _.uniq(items);

  const uniqueItems = _.uniqBy(items, "id");
  return (
    <main>
      <h1>Itens únicos : {unique.join(", ")}</h1>
    </main>
  );
}
