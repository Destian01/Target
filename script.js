const target = 10000000;

let dataTabungan = [];

function formatRupiah(angka){
  return "Rp" + angka.toLocaleString("id-ID");
}
function render(){

  let total = 0;

  for(let i = 0; i < dataTabungan.length; i++){
    total += dataTabungan[i].nominal;
  }

  let persen = Math.floor((total / target) * 100);

  document.getElementById("totalTabungan").innerHTML =
  formatRupiah(total);

  document.getElementById("persen").innerHTML =
  persen + "%";
  
  const circle =
document.querySelector(".percent-circle");

let degree = persen * 3.6;

circle.style.background =
`conic-gradient(
#1976d2 ${degree}deg,
#e0e0e0 ${degree}deg
)`;

  document.getElementById("progressBar").style.width =
  persen + "%";

  document.getElementById("sisaTarget").innerHTML =
  formatRupiah(target - total);

  let list = document.getElementById("listTabungan");

  list.innerHTML = "";

  for(let i = dataTabungan.length - 1; i >= 0; i--){

    list.innerHTML += `
      <div class="item">

        <div>
          <h4>${dataTabungan[i].bulan}</h4>
          <p>${formatRupiah(dataTabungan[i].nominal)}</p>
        </div>

        <div class="action-btn">

          <button class="edit-btn"
          onclick="editTabungan(${i})">
            ✏
          </button>

          <button class="delete-btn"
          onclick="hapusTabungan(${i})">
            🗑
          </button>

        </div>

      </div>
    `;
  }
}

function tambahTabungan(){

  let nominal =
  document.getElementById("nominal").value;

  if(nominal == ""){
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
    nominal: parseInt(nominal),
    bulan: bulan
  });

  document.getElementById("nominal").value = "";

  render();
}


render();
function hapusTabungan(index){

  dataTabungan.splice(index,1);

  render();
}

function editTabungan(index){

  let nominalBaru = prompt(
    "Edit nominal",
    dataTabungan[index].nominal
  );

  if(nominalBaru == null){
    return;
  }

  nominalBaru = parseInt(nominalBaru);

  if(isNaN(nominalBaru)){
    alert("Nominal tidak valid");
    return;
  }

  dataTabungan[index].nominal =
  nominalBaru;

  render();
}

async function downloadPDF(){

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Laporan Target Tahunan", 20, 20);

  let y = 40;

  for(let i = 0; i < dataTabungan.length; i++){

    doc.text(
      `${dataTabungan[i].bulan} - ${formatRupiah(dataTabungan[i].nominal)}`,
      20,
      y
    );

    y += 10;
  }

  doc.save("laporan-tabungan.pdf");
}