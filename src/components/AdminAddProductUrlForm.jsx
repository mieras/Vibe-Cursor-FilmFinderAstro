import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Select from "react-select";

const currencyOptions = [
    { value: "EUR", label: "EUR" },
    { value: "USD", label: "USD" },
    { value: "GBP", label: "GBP" },
    { value: "JPY", label: "JPY" }
];

export default function AdminAddProductUrlForm() {
    const [form, setForm] = useState({
        product_id: "",
        store_id: "",
        new_store_name: "",
        price: "",
        url: "",
        currency: "EUR"
    });
    const [message, setMessage] = useState("");
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([{ value: "", label: "Selecteer een shop" }]);
    const [addingStore, setAddingStore] = useState(false);

    useEffect(() => {
        // Haal producten op
        const fetchProducts = async () => {
            const { data, error } = await supabase.from("products").select("id, name, format").order("name");
            if (data) {
                setProducts(data.map(p => ({
                    value: p.id,
                    label: `${p.name} (${p.format})`
                })));
            }
        };
        // Haal shops op
        const fetchStores = async () => {
            const { data, error } = await supabase.from("stores").select("id, name").order("name");
            if (data) {
                setStores([
                    { value: "", label: "Selecteer een shop" },
                    ...data.map(s => ({ value: s.id, label: s.name })),
                    { value: "nieuw", label: "Nieuwe shop toevoegen..." }
                ]);
            }
        };
        fetchProducts();
        fetchStores();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (name === "store_id" && value === "nieuw") {
            setAddingStore(true);
        } else if (name === "store_id") {
            setAddingStore(false);
        }
    };

    // Handler voor react-select
    const handleProductSelect = (selected) => {
        setForm(prev => ({ ...prev, product_id: selected ? selected.value : "" }));
    };

    const handleCurrencySelect = (selected) => {
        setForm(prev => ({ ...prev, currency: selected ? selected.value : "EUR" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            let storeId = form.store_id;
            // Voeg nieuwe shop toe indien nodig
            if (form.store_id === "nieuw") {
                if (!form.new_store_name) {
                    setMessage("Vul een naam in voor de nieuwe shop.");
                    return;
                }
                const { data: newStore, error: storeError } = await supabase
                    .from("stores")
                    .insert([{ name: form.new_store_name }])
                    .select()
                    .single();
                if (storeError) throw storeError;
                storeId = newStore.id;
            }
            // 1. Check of product_url al bestaat
            const { data: existingUrl, error: checkError } = await supabase
                .from("product_urls")
                .select("id")
                .eq("product_id", form.product_id)
                .eq("store_id", storeId)
                .maybeSingle();
            if (checkError) throw checkError;
            let productUrlId;
            if (existingUrl) {
                productUrlId = existingUrl.id;
            } else {
                // 2. Voeg product_url toe
                const { data: newProductUrl, error: urlError } = await supabase
                    .from("product_urls")
                    .insert([{
                        product_id: form.product_id,
                        store_id: storeId,
                        url: form.url
                    }])
                    .select()
                    .single();
                if (urlError) throw urlError;
                productUrlId = newProductUrl.id;
            }
            // 3. Voeg prijs toe
            const { error: priceError } = await supabase
                .from("prices")
                .insert([{
                    product_url_id: productUrlId,
                    price: parseFloat(form.price),
                    currency: form.currency,
                    in_stock: true,
                    created_at: new Date().toISOString()
                }]);
            if (priceError) throw priceError;
            setMessage("Product URL en prijs succesvol toegevoegd!");
            setForm({ product_id: "", store_id: "", new_store_name: "", price: "", url: "", currency: "EUR" });
            setAddingStore(false);
        } catch (error) {
            setMessage("Fout bij toevoegen: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Product URL toevoegen</h2>
            <div className="mb-4">
                <label htmlFor="product_id" className="block text-sm font-medium mb-1">Product</label>
                <Select
                    id="product_id"
                    name="product_id"
                    options={products}
                    value={products.find(p => p.value === form.product_id) || null}
                    onChange={handleProductSelect}
                    placeholder="Selecteer een product..."
                    isClearable
                />
            </div>
            <div className="mb-4">
                <label htmlFor="store_id" className="block text-sm font-medium mb-1">Shop</label>
                <select
                    id="store_id"
                    name="store_id"
                    value={form.store_id}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    {stores.map((store, index) => (
                        <option key={index} value={store.value}>{store.label}</option>
                    ))}
                </select>
            </div>
            {addingStore && (
                <div className="mb-4">
                    <label htmlFor="new_store_name" className="block text-sm font-medium mb-1">Naam nieuwe shop</label>
                    <input
                        id="new_store_name"
                        name="new_store_name"
                        value={form.new_store_name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
            )}
            <div className="mb-4">
                <label htmlFor="url" className="block text-sm font-medium mb-1">Product URL</label>
                <input
                    id="url"
                    name="url"
                    value={form.url}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium mb-1">Prijs</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="currency" className="block text-sm font-medium mb-1">Valuta</label>
                <Select
                    id="currency"
                    name="currency"
                    options={currencyOptions}
                    value={currencyOptions.find(c => c.value === form.currency)}
                    onChange={handleCurrencySelect}
                    classNamePrefix="react-select"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
                Product URL toevoegen
            </button>
            {message && (
                <p
                    className={`mt-2 p-2 rounded ${message.toLowerCase().includes("fout") ||
                        message.toLowerCase().includes("error")
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                        }`}
                >
                    {message}
                </p>
            )}
        </form>
    );
} 