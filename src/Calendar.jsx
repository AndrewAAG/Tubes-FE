import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import './Calendar.css'

function Calendar(){
    const dateList = [];

    // Cari hari pertama di bulan saat ini hari apa (bulan Mei adalah bulan 4 di js)
    // 0 = Minggu, 6 = Sabtu
    const tanggalPertama = new Date(2026, 4, 1);
    const hariPertama = tanggalPertama.getDay();

    // Kalau hari pertama nya bukan hari senin, maka isi dari hari pertama sampai hari senin sebelumnya dengan tanggal bulan sebelumnya
    for(let i = hariPertama; i >= 1; i--){
        dateList.push({
            tanggal: tanggalPertama.setDate(tanggalPertama.getDate() - i),
            bulanSekarang: false,
        });
    }

    console.log(dateList);
    
    return <>
        <Navbar />
        <div class="calendar-container">
            <SearchBar />
            <div class="calendar-content">
                <div class="calendar-header">
                    <span class="nav-arrow">←</span>
                    <h2>Mei 2026</h2>
                    <span class="nav-arrow">→</span>
                </div>

                <div class="calendar-grid">
                    <div class="weekday-label">Mon</div>
                    <div class="weekday-label">Tue</div>
                    <div class="weekday-label">Wed</div>
                    <div class="weekday-label">Thu</div>
                    <div class="weekday-label">Fri</div>
                    <div class="weekday-label">Sat</div>
                    <div class="weekday-label">Sun</div>
                </div>
            </div>
        </div>
    </>
}

export default Calendar