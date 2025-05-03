import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function AdminAddProductForm() {
    const [form, setForm] = useState({
        name: "",
        brand_id: "",
        iso: "",
        format: "",
        exposures: "",
        ean: "",
        description: "",
        image_url: ""
    });
    const [message, setMessage] = useState("");
    const [brands, setBrands] = useState([
        { value: "", label: "Selecteer een merk" }
    ]);

    const formatOptions = [
        { value: "", label: "Selecteer een formaat" },
        { value: "35mm", label: "35mm" },
        { value: "120", label: "120" },
        { value: "sheet", label: "Sheet film" }
    ];

    const isoOptions = [
        { value: "", label: "Selecteer een ISO" },
        { value: "50", label: "50" },
        { value: "100", label: "100" },
        { value: "200", label: "200" },
        { value: "400", label: "400" },
        { value: "800", label: "800" },
        { value: "1600", label: "1600" },
        { value: "3200", label: "3200" }
    ];

    useEffect(() => {
        console.log("🎯 useEffect wordt uitgevoerd!");

        const fetchBrands = async () => {
            try {
                console.log("🔄 Start met ophalen merken...");

                const { data, error } = await supabase
                    .from("brands")
                    .select("id, name")
                    .order("name");

                console.log("📦 Supabase response:", { data, error });

                if (error) {
                    console.error("❌ Supabase error:", error);
                    throw error;
                }

                if (data) {
                    console.log("✅ Merken gevonden:", data);
                    const formattedBrands = [
                        { value: "", label: "Selecteer een merk" },
                        ...data.map(brand => ({
                            value: brand.id,
                            label: brand.name.charAt(0).toUpperCase() + brand.name.slice(1)
                        }))
                    ];
                    console.log("✨ Geformatteerde merken:", formattedBrands);
                    setBrands(formattedBrands);
                } else {
                    console.log("⚠️ Geen merken gevonden in de database");
                }
            } catch (error) {
                console.error("💥 Error in fetchBrands:", error);
                setMessage("Fout bij ophalen merken: " + error.message);
            }
        };

        console.log("🚀 Component mounted, start fetchBrands");
        fetchBrands();
    }, []);

    // Log wanneer de brands state verandert
    useEffect(() => {
        console.log("🔄 Brands state updated:", brands);
    }, [brands]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check of EAN al bestaat
            const { data: existing, error: checkError } = await supabase
                .from("products")
                .select("id")
                .eq("ean", form.ean)
                .maybeSingle();

            if (checkError) throw checkError;

            if (existing) {
                setMessage("Er bestaat al een product met deze EAN code.");
                return;
            }

            // Voeg product toe als EAN uniek is
            const { error } = await supabase
                .from("products")
                .insert([{
                    name: form.name,
                    brand_id: form.brand_id,
                    iso: parseInt(form.iso),
                    format: form.format,
                    exposures: parseInt(form.exposures),
                    ean: form.ean,
                    description: form.description,
                    image_url: form.image_url
                }]);

            if (error) throw error;

            setMessage("Product succesvol toegevoegd!");
            setForm({
                name: "",
                brand_id: "",
                iso: "",
                format: "",
                exposures: "",
                ean: "",
                description: "",
                image_url: ""
            });
        } catch (error) {
            setMessage("Fout bij toevoegen product: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Nieuw product toevoegen</h2>

            <div className="mb-4">
                <label htmlFor="brand_id" className="block text-sm font-medium mb-1">Merk</label>
                <select
                    id="brand_id"
                    name="brand_id"
                    value={form.brand_id}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    {brands.map((brand, index) => (
                        <option key={index} value={brand.value}>
                            {brand.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">Naam</label>
                <input
                    id="name"
                    name="name"
                    placeholder="Productnaam"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="format" className="block text-sm font-medium mb-1">Formaat</label>
                <select
                    id="format"
                    name="format"
                    value={form.format}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    {formatOptions.map((format, index) => (
                        <option key={index} value={format.value}>
                            {format.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="iso" className="block text-sm font-medium mb-1">ISO</label>
                <select
                    id="iso"
                    name="iso"
                    value={form.iso}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    {isoOptions.map((iso, index) => (
                        <option key={index} value={iso.value}>
                            {iso.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="exposures" className="block text-sm font-medium mb-1">Aantal opnames</label>
                <input
                    id="exposures"
                    name="exposures"
                    type="number"
                    placeholder="Aantal opnames"
                    value={form.exposures}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="ean" className="block text-sm font-medium mb-1">EAN</label>
                <input
                    id="ean"
                    name="ean"
                    placeholder="EAN code"
                    value={form.ean}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium mb-1">Beschrijving</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Productbeschrijving"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="image_url" className="block text-sm font-medium mb-1">Afbeelding URL</label>
                <input
                    id="image_url"
                    name="image_url"
                    placeholder="URL naar productafbeelding"
                    value={form.image_url}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
                Product toevoegen
            </button>

            {message && (
                <p
                    className={`mt-2 p-2 rounded ${message.toLowerCase().includes("fout") ||
                        message.toLowerCase().includes("bestaat al") ||
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