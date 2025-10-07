import { useEffect, useState } from "react";

type Product = { id:number; name:string; price_cents:number; created_at:string };

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);

  async function load() {
    const r = await fetch("/api/products");
    setProducts(await r.json());
  }
  useEffect(() => { load(); }, []);

  async function create() {
    await fetch("/api/products", {
      method:"POST",
      headers:{ "content-type":"application/json" },
      body: JSON.stringify({ name, price_cents: Number(price) })
    });
    setName(""); setPrice(0); load();
  }

  async function update(p: Product) {
    const newName = prompt("Nouveau nom", p.name) ?? p.name;
    const newPrice = Number(prompt("Nouveau prix (cents)", String(p.price_cents)) ?? p.price_cents);
    await fetch(`/api/products/${p.id}`, {
      method:"PUT",
      headers:{ "content-type":"application/json" },
      body: JSON.stringify({ name: newName, price_cents: newPrice })
    });
    load();
  }

  async function remove(id:number) {
    await fetch(`/api/products/${id}`, { method:"DELETE" });
    load();
  }

  return (
    <div style={{maxWidth:720, margin:"40px auto", fontFamily:"system-ui"}}>
      <h1>LolirinePoolStore</h1>

      <h2>Créer</h2>
      <div style={{display:"flex", gap:8}}>
        <input placeholder="Nom" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Prix en cents" type="number" value={price} onChange={e=>setPrice(Number(e.target.value))} />
        <button onClick={create}>Ajouter</button>
      </div>

      <h2 style={{marginTop:24}}>Produits</h2>
      <ul>
        {products.map(p => (
          <li key={p.id} style={{display:"flex", gap:8, alignItems:"center"}}>
            <span>#{p.id} — {p.name} — {p.price_cents} cts</span>
            <button onClick={()=>update(p)}>Modifier</button>
            <button onClick={()=>remove(p.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

