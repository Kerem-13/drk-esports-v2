let tumUrunler = [];

async function urunleriGetir() {

    const cevap = await fetch("products.json");
    let jsonUrunler = await cevap.json();

    let adminUrunler = JSON.parse(localStorage.getItem("adminUrunler")) || [];

    tumUrunler = [...jsonUrunler, ...adminUrunler];

    urunleriGoster(tumUrunler);

}

function urunleriGoster(urunler) {

    const alan = document.getElementById("productList");

    if (!alan) return;

    alan.innerHTML = "";

    urunler.forEach((urun) => {

        const kart = document.createElement("div");

        kart.className = "productCard";

        kart.innerHTML = `

        <div class="fav" onclick="favoriEkle(${urun.id})">❤️</div>

<div class="indirim">🔥 İndirim</div>

        <img src="${urun.resim}" alt="${urun.isim}">

        <span class="brand">${urun.marka}</span>

        <h2>${urun.isim}</h2>

        <p>${urun.kategori}</p>

        <strong>${urun.fiyat}</strong>

        <p>⭐ ${urun.puan || "5.0"}</p>

        <div style="margin-top:20px; display:flex; gap:10px;">

            <a href="${urun.link}" target="_blank">

                <button>Satın Al</button>

            </a>

            <button onclick="sepeteEkle(${urun.id})" class="cartBtn">
Sepete Ekle
</button>

        </div>

        `;

        alan.appendChild(kart);

    });

}

function filtrele() {

    const aramaKutusu = document.getElementById("arama");
    const kategoriKutusu = document.getElementById("kategori");

    if (!aramaKutusu || !kategoriKutusu) return;

    const arama = aramaKutusu.value.toLowerCase();
    const kategori = kategoriKutusu.value;

    const siralama = document.getElementById("siralama").value;

    const sonuc = tumUrunler.filter(urun => {

        const metin = (
            urun.marka +
            " " +
            urun.isim +
            " " +
            urun.kategori
        ).toLowerCase();

        const aramaUygun = metin.includes(arama);

        const kategoriUygun =
            kategori === "Hepsi" ||
            urun.kategori === kategori;

        return aramaUygun && kategoriUygun;

    });


if (siralama === "az") {
    sonuc.sort((a, b) => a.isim.localeCompare(b.isim));
} else if (siralama === "za") {
    sonuc.sort((a, b) => b.isim.localeCompare(a.isim));
}

    urunleriGoster(sonuc);

}

document.addEventListener("DOMContentLoaded", () => {

    urunleriGetir();

    const aramaKutusu = document.getElementById("arama");
    const kategoriKutusu = document.getElementById("kategori");

    if (aramaKutusu)
        aramaKutusu.addEventListener("input", filtrele);

    if (kategoriKutusu)
        kategoriKutusu.addEventListener("change", filtrele);

    const siralamaKutusu = document.getElementById("siralama");

if (siralamaKutusu)
    siralamaKutusu.addEventListener("change", filtrele);

});

function sepeteEkle(id){

    let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

    let urun = tumUrunler.find(u => u.id == id);

if (urun) {
    sepet.push(urun);
}

    localStorage.setItem("sepet", JSON.stringify(sepet));

    let toast = document.getElementById("toast");

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}

async function sepetiGoster() {

    let alan = document.getElementById("cartItems");
    if (!alan) return;

    let bos = document.getElementById("bosYazi");
    let toplamYazi = document.getElementById("toplamFiyat");

    let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

    if (sepet.length === 0) {
        bos.style.display = "block";
        alan.innerHTML = "";
        toplamYazi.innerHTML = "Toplam : 0 TL";
        return;
    }

    bos.style.display = "none";
    alan.innerHTML = "";

    let toplam = 0;

    sepet.forEach((urun) => {

        

        toplam += parseFloat(String(urun.fiyat).replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
    });

    toplamYazi.innerHTML = "Toplam : " + toplam + " TL";
}

sepetiGoster();
 
alan.innerHTML += `
<div class="productCard">
<img src="${urun.resim}" width="100">
<h3>${urun.isim}</h3>
<p>${urun.fiyat}</p>

<button onclick="sil(${i})">❌ Sil</button>

</div>
`;


sepetiGoster();

let kullanici = localStorage.getItem("kullanici");


let girisLink = document.querySelector('a[href="login.html"]');

if (kullanici && girisLink) {
    girisLink.innerHTML = "Profil";
    girisLink.href = "profile.html";
}

function sil(index){

let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

sepet.splice(index,1);

localStorage.setItem("sepet",JSON.stringify(sepet));

location.reload();

}

let odeme = document.getElementById("odemeBtn");

if (odeme) {

    odeme.onclick = function () {

        let sepet = JSON.parse(localStorage.getItem("sepet")) || [];
        let siparisler = JSON.parse(localStorage.getItem("siparisler")) || [];

        siparisler.push({
            tarih: new Date().toLocaleString(),
            urunler: sepet
        });

        localStorage.setItem("siparisler", JSON.stringify(siparisler));

        localStorage.removeItem("sepet");

        alert("Siparişiniz oluşturuldu 🎉");

        location.reload();
    };

}


async function favorileriGoster() {

    let alan = document.getElementById("favoriler");

    if (!alan) return;

    let favoriler = JSON.parse(localStorage.getItem("favoriler")) || [];

    await urunleriGetir();

    alan.innerHTML = "";

    favoriler.forEach(id => {

        let urun = tumUrunler.find(u => u.id == id);

        if (!urun) return;

        alan.innerHTML += `
        <div class="productCard">
            <img src="${urun.resim}" width="120">
            <h3>${urun.isim}</h3>
            <p>${urun.fiyat}</p>
        </div>`;
    });

}

favorileriGoster();

function urunEkle(){

    let urunler = JSON.parse(localStorage.getItem("adminUrunler")) || [];

    urunler.push({

        id: Date.now(),

        isim: document.getElementById("isim").value,

        marka: document.getElementById("marka").value,

        kategori: document.getElementById("kategori").value,

        fiyat: document.getElementById("fiyat").value,

        resim: document.getElementById("resim").value,

        link: document.getElementById("link").value

    });

    localStorage.setItem("adminUrunler", JSON.stringify(urunler));

    alert("Ürün eklendi ✅");

document.getElementById("isim").value = "";
document.getElementById("marka").value = "";
document.getElementById("kategori").value = "";
document.getElementById("fiyat").value = "";
document.getElementById("resim").value = "";
document.getElementById("link").value = "";

}