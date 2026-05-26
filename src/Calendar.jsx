import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import './Calendar.css'

function Calendar(){
    const dateList = [];

    // Cari hari pertama di bulan saat ini hari apa (bulan Mei adalah bulan 4 di js)
    // 0 = Minggu, 6 = Sabtu
    const tanggalPertama = new Date(2026, 4, 1);
    const hariPertama = tanggalPertama.getDay();

    // Kalau hari pertama nya bukan hari minggu, maka isi dari hari pertama sampai hari minggu sebelumnya dengan tanggal bulan sebelumnya
    for(let i = hariPertama; i >= 1; i--){
        const tanggalSebelumnya = new Date(tanggalPertama);
    
        tanggalSebelumnya.setDate(tanggalPertama.getDate() - i);
    
        dateList.push({
            tanggal: tanggalSebelumnya.getDate(), 
            bulanSekarang: false,
            taskList: [
                {id: 1, title: "Dummy Task"},
                {id: 2, title: "Dummy Task 2"},
                {id: 2, title: "Dummy Task 3"},
            ]
        });
    }

    // Isi tanggal bulan ini
    let tanggalTerakhir = new Date(2026, 5, 0);
    
    for(let i = 0; i < tanggalTerakhir.getDate(); i++){
        const tanggalSelanjutnya = new Date(tanggalPertama);
    
        tanggalSelanjutnya.setDate(tanggalPertama.getDate() + i);

        dateList.push({
            tanggal: tanggalSelanjutnya.getDate(), 
            bulanSekarang: true,
        });
    }

    // Kalau hari terakhir nya bukan hari sabtu, maka isi dari hari terakhir sampai hari sabtu setelahnya dengan tanggal bulan setelahnya
    for(let i = 1; i <= 6 - tanggalTerakhir.getDay(); i++){
        const tanggalSelanjutnya = new Date(tanggalTerakhir);
    
        tanggalSelanjutnya.setDate(tanggalTerakhir.getDate() + i);

        dateList.push({
            tanggal: tanggalSelanjutnya.getDate(), 
            bulanSekarang: false,
        });
    }

    
    
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
                    <div class="weekday-label">Sun</div>
                    <div class="weekday-label">Mon</div>
                    <div class="weekday-label">Tue</div>
                    <div class="weekday-label">Wed</div>
                    <div class="weekday-label">Thu</div>
                    <div class="weekday-label">Fri</div>
                    <div class="weekday-label">Sat</div>

                    <For each={dateList}>
                        {(date) => {
                            return <div class="calendar-cells">
                                <Show when={date.bulanSekarang}>
                                    <p>{date.tanggal}</p>
                                </Show>
                                <Show when={!date.bulanSekarang}>
                                    <p style="color: #999898">{date.tanggal}</p>
                                </Show>
                                <For each={date.taskList}>
                                    {(task) => {
                                        return <div class="calendar-task">{task.title}</div>
                                    }}
                                </For>
                            </div>
                        }}
                    </For>
                </div>


        
            </div>
        </div>
    </>
}

export default Calendar