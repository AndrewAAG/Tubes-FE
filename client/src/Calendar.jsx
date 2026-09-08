import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import './css/Calendar.css'
import { resetFilters, tasks, searchQuery, statusFilter, tagFilter, priorityFilter , filteredTasks } from "./tasksStore";
import { createSignal , onMount , createMemo } from "solid-js";


function Calendar(){
    const [currentDate, setCurrentDate] = createSignal(new Date());
    const [selectedTask, setSelectedTask] = createSignal(null);

    const namaBulan = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // Setiap pindah ke halaman calendar filternya di reset. Supaya kalo pas di halaman tasklist pasang filter, terus pindah ke halaman calendar filternya ga kebawa
    onMount(() => {
        resetFilters(); 
    });

    const handlePrevMonth = () => {
        const newDate = new Date(currentDate());
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate); 
    };

    const handleNextMonth = () => {
        const newDate = new Date(currentDate());
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate); 
    };

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }


    const dateList = createMemo(() => {
        const list = [];
        const tahunAktif = currentDate().getFullYear();
        const bulanAktif = currentDate().getMonth(); // 0 = Jan, 11 = Des

        // Cari hari pertama di bulan aktif itu di hari apa
        const tanggalPertama = new Date(tahunAktif, bulanAktif, 1);
        const hariPertama = tanggalPertama.getDay();

        // Kalau hari pertama nya bukan hari minggu, maka isi dari hari pertama sampai hari minggu sebelumnya dengan tanggal bulan sebelumnya
        for(let i = hariPertama; i >= 1; i--){
            const tanggalSebelumnya = new Date(tanggalPertama);
            tanggalSebelumnya.setDate(tanggalPertama.getDate() - i);
            const fullDate = formatDate(tanggalSebelumnya);

            list.push({
                tanggal: tanggalSebelumnya.getDate(), 
                bulanSekarang: false,
                taskList: filteredTasks().filter((task) => task.date === fullDate)
            });
        }

        // Isi tanggal bulan ini 
        let tanggalTerakhir = new Date(tahunAktif, bulanAktif + 1, 0); // Mendapatkan tanggal terakhir bulan ini di tanggal brp
        
        for(let i = 0; i < tanggalTerakhir.getDate(); i++){
            const tanggalSelanjutnya = new Date(tanggalPertama);
            tanggalSelanjutnya.setDate(tanggalPertama.getDate() + i);
            const fullDate = formatDate(tanggalSelanjutnya);

            list.push({
                tanggal: tanggalSelanjutnya.getDate(), 
                bulanSekarang: true,
                taskList: filteredTasks().filter((task) => task.date === fullDate)
            });
        }

        // Kalau hari terakhir nya bukan hari sabtu, maka isi dari hari terakhir sampai hari sabtu setelahnya dengan tanggal bulan setelahnya
        for(let i = 1; i <= 6 - tanggalTerakhir.getDay(); i++){
            const tanggalSelanjutnya = new Date(tanggalTerakhir);
            tanggalSelanjutnya.setDate(tanggalTerakhir.getDate() + i);
            const fullDate = formatDate(tanggalSelanjutnya);

            list.push({
                tanggal: tanggalSelanjutnya.getDate(), 
                bulanSekarang: false,
                taskList: filteredTasks().filter((task) => task.date === fullDate),
            });
        }

        return list;
    });
    
    
    return <>
        <Navbar />
        <div class="calendar-container">
            <SearchBar />
            <div class="calendar-layout-wrapper">
                <div class="calendar-content">
                    <div class="calendar-header">
                        <span class="nav-arrow" onClick={handlePrevMonth}>←</span>
                        <h2>{namaBulan[currentDate().getMonth()]} {currentDate().getFullYear()}</h2>
                        <span class="nav-arrow" onClick={handleNextMonth}>→</span>
                    </div>

                    <div class="calendar-grid">
                        <div class="weekday-label">Sun</div>
                        <div class="weekday-label">Mon</div>
                        <div class="weekday-label">Tue</div>
                        <div class="weekday-label">Wed</div>
                        <div class="weekday-label">Thu</div>
                        <div class="weekday-label">Fri</div>
                        <div class="weekday-label">Sat</div>

                        <For each={dateList()}>
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
                                            return <div class="calendar-task" onClick={() => setSelectedTask(task)} >{task.title}</div>
                                        }}
                                    </For>
                                </div>
                            }}
                        </For>
                    </div>
                </div>

                <Show when={selectedTask()}>
                    <div class="task-detail-card">

                        <button class="close-detail-btn" onClick={() => setSelectedTask(null)}> x </button>

                        <div class="detail-badges">
                            <div class={`badge-status ${selectedTask().status.toLowerCase().replaceAll(" ", "-")}`}>{selectedTask().status}</div>
                            <div class={`badge-priority ${selectedTask().priority.toLowerCase()}`}>{selectedTask().priority}</div>
                        </div>
                        
                        <h2>{selectedTask().title}</h2>
                        <p class="detail-desc">{selectedTask().description}</p>
                        
                        <div class="detail-tags">
                            <div class="badge-tag">#{selectedTask().tag}</div>
                        </div>
                        
                        <div class="detail-due">
                            Due: {selectedTask().date}
                        </div>
                    </div>
                </Show>
            </div>
        </div>
    </>
}

export default Calendar