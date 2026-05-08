let dataTabungan =
JSON.parse(localStorage.getItem("tabungan")) || [];

const nominalInput =
document.getElementById("nominal");

const tambahBtn =
document.getElementById("tambahBtn");

const listTabungan =
document.getElementById("listTabungan");

const totalTabungan =
document.getElementById("totalTabungan");

function formatRupiah(angka){
  return "Rp" + angka.toLocaleString("id-ID");
}

function render(){

  let total = 0;

  listTabungan.innerHTML = "";

  dataTabungan.forEach((item, index) => {

    total += item.nominal;

    listTabungan.innerHTML += `
      <div class="item">
        <h3>${formatRupiah(item.nominal)}</h3>
        <p>${item.bulan}</p>
      </div>
    `;
  });

  totalTabungan.innerHTML =
  formatRupiah(total);

  localStorage.setItem(
  "tabungan",
  JSON.stringify(dataTabungan)
);

}

tambahBtn.addEventListener("click", () => {

  let nominal =
  parseInt(nominalInput.value);

  if(isNaN(nominal)){
    alert("Masukkan nominal");
    return;
  }

  const tanggal = new Date();

  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  let bulan =
  namaBulan[tanggal.getMonth()] +
  " " +
  tanggal.getFullYear();

  dataTabungan.push({
  nominal: nominal,
  bulan: bulan
});

localStorage.setItem(
  "tabungan",
  JSON.stringify(dataTabungan)
);

nominalInput.value = "";

render();

});

render();

console.log(localStorage.getItem("tabungan"));
