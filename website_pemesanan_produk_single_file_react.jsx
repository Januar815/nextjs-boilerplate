import React, { useState } from "react";

// Single-file React component (Tailwind CSS required in the host project)
// Export default component so it can be previewed directly in the canvas.
// Fitur:
// - Daftar produk statis (gambar placeholder)
// - Detail produk singkat
// - Form pemesanan (nama, telepon, alamat, jumlah)
// - Ringkasan order + total
// - Simulasi submit (tidak mengirim data ke server)

export default function PemesananProdukWebsite() {
  const initialProducts = [
    {
      id: 1,
      name: "Robot Mochi - Robot Pintar dan Lucu",
      price: 250000,
      desc: "Robot Mochi — robot pintar, interaktif, cocok untuk edukasi dan hadiah maupun hiasan. Fitur: sensor sentuh, mode otomatis dan bisa di cas ulang.",
      img: "https://picsum.photos/seed/mochi1/600/400",
    },
    {
      id: 2,
      name: "Dasai Mochi Robot",
      price: 180000,
      desc: "Dasai Mochi Robot — versi sederhana dari Mochi dengan fitur dasar: sensor sentuh, mode otomatis dan bisa di cas ulang.",
      img: "https://picsum.photos/seed/mochi2/600/400",
    },
    {
      id: 3,
      name: "Robot Mochi - Non Battery",
      price: 90000,
      desc: "Versi non-battery: fitur sama.",
      img: "https://picsum.photos/seed/mochi3/600/400",
    },
    {
      id: 4,
      name: "Dasai Mochi Robot - Non Battery",
      price: 60000,
      desc: "Dasai Mochi non-battery: fitur sama.",
      img: "https://picsum.photos/seed/mochi4/600/400",
    },
  ];

  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderInfo, setOrderInfo] = useState({ name: "", phone: "", address: "" });
  const [message, setMessage] = useState("");

  function addToCart(product, qty = 1) {
    setCart((c) => {
      const exists = c.find((x) => x.id === product.id);
      if (exists) {
        return c.map((x) => (x.id === product.id ? { ...x, qty: x.qty + qty } : x));
      }
      return [...c, { ...product, qty }];
    });
    setMessage("Produk ditambahkan ke keranjang.");
    setTimeout(() => setMessage(""), 2500);
  }

  function removeFromCart(id) {
    setCart((c) => c.filter((x) => x.id !== id));
  }

  function changeQty(id, qty) {
    if (qty < 1) return;
    setCart((c) => c.map((x) => (x.id === id ? { ...x, qty } : x)));
  }

  function calcTotal() {
    return cart.reduce((s, p) => s + p.price * p.qty, 0);
  }

  function formatIDR(num) {
    return num.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }

  function handleOrderSubmit(e) {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Keranjang kosong — pilih produk dulu.");
      return;
    }
    if (!orderInfo.name || !orderInfo.phone || !orderInfo.address) {
      alert("Isi data pemesan lengkap (nama, telepon, alamat).");
      return;
    }

    // Simulasi submit: kita hanya tampilkan ringkasan
    const orderSummary = {
      customer: orderInfo,
      items: cart,
      total: calcTotal(),
      date: new Date().toLocaleString(),
    };

    // Di aplikasi nyata: kirim ke server (fetch/axios)
    console.log("SUBMIT ORDER", orderSummary);
    alert("Pesanan berhasil dibuat (simulasi). Cek console untuk detail.");
    // reset
    setCart([]);
    setOrderInfo({ name: "", phone: "", address: "" });
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Toko Elektronik DIY — Pemesanan</h1>
          <nav className="space-x-4 text-sm">
            <a className="hover:underline" href="#products">Produk</a>
            <a className="hover:underline" href="#order">Pemesanan</a>
            <a className="hover:underline" href="#contact">Kontak</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="mb-10">
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold">Cara Pemesanan</h2>
            <ol className="list-decimal list-inside mt-3 text-sm text-gray-700">
              <li>Pilih produk di bagian <strong>Produk</strong>.</li>
              <li>Tambahkan ke keranjang.</li>
              <li>Isi data pemesan di formulir pemesanan.</li>
              <li>Tekan tombol <em>Pesan Sekarang</em> — ini simulasi, nantinya akan dikirim ke WhatsApp / server.</li>
            </ol>
            <p className="mt-3 text-xs text-gray-500">Harga belum termasuk ongkos kirim. Pembayaran lewat transfer bank atau COD (negosiasi).</p>
          </div>
        </section>

        <section id="products" className="mb-10">
          <h3 className="text-lg font-semibold mb-4">Produk Kami</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <article key={p.id} className="bg-white rounded-xl shadow overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-44 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold">{p.name}</h4>
                  <p className="mt-1 text-sm text-gray-600">{p.desc}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="font-bold">{formatIDR(p.price)}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setSelectedProduct(p); addToCart(p, 1); }}
                        className="px-3 py-1 rounded-lg bg-orange-500 text-white text-sm hover:opacity-90"
                      >
                        Tambah
                      </button>
                      <button
                        onClick={() => setSelectedProduct(p)}
                        className="px-3 py-1 rounded-lg border text-sm"
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 bg-white p-6 rounded-xl shadow" id="order">
          <h3 className="text-lg font-semibold mb-4">Keranjang & Pemesanan</h3>

          <div className="md:flex gap-6">
            <div className="md:w-2/3">
              <h4 className="font-medium">Keranjang ({cart.length})</h4>
              <div className="mt-3 space-y-3">
                {cart.length === 0 && <div className="text-sm text-gray-500">Keranjang kosong.</div>}
                {cart.map((c) => (
                  <div key={c.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <div>
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-sm text-gray-600">{formatIDR(c.price)} per unit</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={c.qty}
                        min={1}
                        onChange={(e) => changeQty(c.id, Number(e.target.value))}
                        className="w-20 p-1 border rounded text-center"
                      />
                      <div className="font-semibold">{formatIDR(c.price * c.qty)}</div>
                      <button onClick={() => removeFromCart(c.id)} className="text-sm text-red-600">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-700">
                  <div>Subtotal</div>
                  <div className="font-bold">{formatIDR(calcTotal())}</div>
                </div>
                <p className="text-xs text-gray-500 mt-2">* Ongkir belum dihitung. Setelah submit, admin akan konfirmasi ongkos kirim.</p>
              </div>
            </div>

            <aside className="md:w-1/3 mt-6 md:mt-0">
              <form onSubmit={handleOrderSubmit} className="space-y-3 bg-white">
                <div>
                  <label className="text-sm">Nama Lengkap</label>
                  <input
                    value={orderInfo.name}
                    onChange={(e) => setOrderInfo({ ...orderInfo, name: e.target.value })}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="Nama"
                  />
                </div>
                <div>
                  <label className="text-sm">No. Telepon / WA</label>
                  <input
                    value={orderInfo.phone}
                    onChange={(e) => setOrderInfo({ ...orderInfo, phone: e.target.value })}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="0812xxxx"
                  />
                </div>
                <div>
                  <label className="text-sm">Alamat Pengiriman</label>
                  <textarea
                    value={orderInfo.address}
                    onChange={(e) => setOrderInfo({ ...orderInfo, address: e.target.value })}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="Alamat lengkap"
                    rows={3}
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full px-4 py-2 rounded bg-green-600 text-white font-semibold">Pesan Sekarang (Simulasi)</button>
                </div>

                <div className="text-xs text-gray-500">
                  Setelah submit (simulasi) admin akan menghubungi via WhatsApp untuk konfirmasi dan pembayaran.
                </div>
              </form>
            </aside>
          </div>
        </section>

        <section id="contact" className="mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Kontak & Informasi</h3>
            <p className="mt-2 text-sm text-gray-600">Untuk pemesanan cepat: <strong>WhatsApp</strong> — <a className="text-blue-600" href="tel:+628123456789">+62 812-3456-789</a></p>
            <p className="mt-1 text-sm text-gray-600">Email: <a className="text-blue-600" href="mailto:info@tokodiy.local">info@tokodiy.local</a></p>
            <div className="mt-4">
              <h4 className="font-medium">Catatan</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Stok dapat berubah sewaktu-waktu.</li>
                <li>Harga belum termasuk ongkos kirim.</li>
                <li>Jika butuh layanan rakit, pilih produk dan catat di alamat / pesan untuk request rakit.</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="text-center text-sm text-gray-500 py-8">
          © {new Date().getFullYear()} Toko Elektronik DIY — dibuat dengan ChatGPT.
        </footer>
      </main>

      {/* Floating cart summary */}
      <div className="fixed right-6 bottom-6 w-80 md:w-96">
        <div className="bg-white shadow-lg rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Ringkasan</div>
            <div className="text-sm text-gray-600">{cart.length} item</div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm">Total</div>
            <div className="font-bold">{formatIDR(calcTotal())}</div>
          </div>
          <div className="mt-3">
            <a href="#order" className="block text-center px-3 py-2 bg-orange-500 text-white rounded">Ke Pemesanan</a>
          </div>
        </div>
      </div>

      {/* Modal simplified: product details */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="font-semibold">{selectedProduct.name}</div>
              <button onClick={() => setSelectedProduct(null)} className="text-gray-500">Tutup</button>
            </div>
            <div className="p-4 grid md:grid-cols-2 gap-4">
              <img src={selectedProduct.img} alt="detail" className="w-full h-56 object-cover rounded" />
              <div>
                <div className="font-bold text-lg">{formatIDR(selectedProduct.price)}</div>
                <p className="mt-2 text-sm text-gray-700">{selectedProduct.desc}</p>
                <div className="mt-4">
                  <button onClick={() => { addToCart(selectedProduct, 1); setSelectedProduct(null); }} className="px-4 py-2 bg-orange-500 text-white rounded">Tambah ke Keranjang</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* small toast */}
      {message && (
        <div className="fixed left-6 bottom-6 bg-black text-white px-4 py-2 rounded shadow">{message}</div>
      )}
    </div>
  );
}
