/**
 * ============================================================================
 * TugasKu — Pengelola Tugas Kuliah Semester 3 D4 Sistem Informasi Bisnis (Polinema)
 * Engine: Dual-Engine Architecture (LocalStorage Default + Supabase Cloud Sync)
 * ============================================================================
 */

// 1. Konfigurasi 9 Mata Kuliah Resmi Semester 3 SIB Polinema Sesuai Kurikulum Bos
const SUBJECT_CONFIG = [
    { key: "Pemrograman Web (PemWeb)", badgeId: "count-web", colorClass: "web" },
    { key: "Rekayasa Perangkat Lunak (RPL)", badgeId: "count-rpl", colorClass: "rpl" },
    { key: "Statistika", badgeId: "count-statistika", colorClass: "statistika" },
    { key: "UI/UX", badgeId: "count-uiux", colorClass: "uiux" },
    { key: "Pemrograman Berorientasi Objek (PBO)", badgeId: "count-pbo", colorClass: "pbo" },
    { key: "Praktikum Pemrograman Berorientasi Objek (Prak PBO)", badgeId: "count-prak-pbo", colorClass: "prak-pbo" },
    { key: "Jaringan Komputer (JarKom)", badgeId: "count-jarkom", colorClass: "jarkom" },
    { key: "Praktikum Jaringan Komputer (Prak JarKom)", badgeId: "count-prak-jarkom", colorClass: "prak-jarkom" },
    { key: "Basis Data Lanjut (BDL)", badgeId: "count-bdl", colorClass: "bdl" },
];

function normalizeSubject(subjectName) {
    if (!subjectName) return "Pemrograman Web (PemWeb)";
    const str = String(subjectName).trim();
    if (str === "Pemrograman Web (PemWeb)" || str === "Pemrograman Web" || str.includes("PemWeb")) {
        return "Pemrograman Web (PemWeb)";
    }
    if (str === "Rekayasa Perangkat Lunak (RPL)" || str === "Rekayasa Perangkat Lunak" || str.includes("RPL")) {
        return "Rekayasa Perangkat Lunak (RPL)";
    }
    if (str.includes("Statistika")) {
        return "Statistika";
    }
    if (str.includes("UI/UX") || str.includes("UIUX") || str.includes("Desain UI")) {
        return "UI/UX";
    }
    if (str.includes("Praktikum") && (str.includes("PBO") || str.includes("Objek"))) {
        return "Praktikum Pemrograman Berorientasi Objek (Prak PBO)";
    }
    if (str.includes("PBO") || str.includes("Objek")) {
        return "Pemrograman Berorientasi Objek (PBO)";
    }
    if (str.includes("Praktikum") && (str.includes("JarKom") || str.includes("Jarkom") || str.includes("Jaringan"))) {
        return "Praktikum Jaringan Komputer (Prak JarKom)";
    }
    if (str.includes("JarKom") || str.includes("Jarkom") || str.includes("Jaringan")) {
        return "Jaringan Komputer (JarKom)";
    }
    if (str.includes("Basis Data") || str.includes("BDL")) {
        return "Basis Data Lanjut (BDL)";
    }
    if (str.includes("PBL") || str.includes("Project")) {
        return "Rekayasa Perangkat Lunak (RPL)";
    }
    if (str.includes("Manajemen")) {
        return "Rekayasa Perangkat Lunak (RPL)";
    }
    return str;
}

function getSubjectColorClass(subjectName) {
    if (!subjectName) return "default";
    const normalized = normalizeSubject(subjectName);
    const s = SUBJECT_CONFIG.find((item) => item.key === normalized || item.key === subjectName);
    if (s) return s.colorClass;
    if (subjectName.includes("Praktikum") && (subjectName.includes("PBO") || subjectName.includes("Objek"))) return "prak-pbo";
    if (subjectName.includes("Objek") || subjectName.includes("PBO")) return "pbo";
    if (subjectName.includes("Praktikum") && (subjectName.includes("Jarkom") || subjectName.includes("Jaringan"))) return "prak-jarkom";
    if (subjectName.includes("Jaringan") || subjectName.includes("Jarkom")) return "jarkom";
    if (subjectName.includes("Web") || subjectName.includes("PemWeb")) return "web";
    if (subjectName.includes("Basis Data") || subjectName.includes("BDL")) return "bdl";
    if (subjectName.includes("Perangkat Lunak") || subjectName.includes("RPL")) return "rpl";
    if (subjectName.includes("Statistika")) return "statistika";
    if (subjectName.includes("UI/UX") || subjectName.includes("UIUX")) return "uiux";
    return "default";
}

// 2. State Aplikasi
const state = {
    tasks: [],
    currentSubject: "all", // 'all' atau nama matkul
    currentFilter: "all", // 'all' | 'active' | 'completed'
    supabaseClient: null,
    isCloudConnected: false,
    realtimeChannel: null,
    isLoggedIn: false,
};

// 3. LocalStorage Keys
const STORAGE_KEYS = {
    TASKS: "tugasku_tasks_v2",
    SUPABASE_URL: "tugasku_supabase_url",
    SUPABASE_KEY: "tugasku_supabase_key",
    AUTH_SESSION: "tugasku_auth_session_v1",
};

// 4. Data Awal Riil Kuliah Semester 3 (Jika LocalStorage Kosong)
function generateStarterTasks() {
    const now = new Date();

    // Hari ini jam 23:59
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 0);

    // Besok jam 23:59
    const tomorrowEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 0);

    // Lusa jam 17:00
    const twoDaysEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 17, 0, 0);

    // Kemarin (Overdue contoh visual)
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 22, 0, 0);

    // 4 hari ke depan
    const fourDaysEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, 15, 0, 0);

    return [
        {
            id: 1,
            subject: "Basis Data Lanjut (BDL)",
            name: "Normalisasi 3NF & DDL Toko Nafaistore",
            deadline: todayEnd.toISOString(),
            submission: "LMS Polinema",
            is_done: false,
            created_at: new Date(Date.now() - 7200000).toISOString(),
        },
        {
            id: 2,
            subject: "Pemrograman Web (PemWeb)",
            name: "Jobsheet 09 PHP CRUD & PostgreSQL Session",
            deadline: tomorrowEnd.toISOString(),
            submission: "LMS Polinema & GitHub",
            is_done: false,
            created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
            id: 3,
            subject: "Praktikum Jaringan Komputer (Prak JarKom)",
            name: "Laporan Praktikum 02 VLAB GNS3 & Wireshark",
            deadline: yesterday.toISOString(),
            submission: "LMS Polinema",
            is_done: false,
            created_at: new Date(Date.now() - 172800000).toISOString(),
        },
        {
            id: 4,
            subject: "Statistika",
            name: "Laporan Praktikum Jobsheet 02 Pandas EDA",
            deadline: twoDaysEnd.toISOString(),
            submission: "LMS Polinema",
            is_done: false,
            created_at: new Date().toISOString(),
        },
        {
            id: 5,
            subject: "Rekayasa Perangkat Lunak (RPL)",
            name: "Diagram Alur & Use Case Spesifikasi Kebutuhan",
            deadline: fourDaysEnd.toISOString(),
            submission: "LMS Polinema & Dosen",
            is_done: false,
            created_at: new Date().toISOString(),
        },
        {
            id: 6,
            subject: "Praktikum Pemrograman Berorientasi Objek (Prak PBO)",
            name: "Laporan Praktikum Jobsheet 02 Class dan Object Java",
            deadline: yesterday.toISOString(),
            submission: "LMS Polinema",
            is_done: true,
            created_at: new Date(Date.now() - 259200000).toISOString(),
        },
    ];
}

// 5. DOM Elements Cache
const dom = {
    // Subject Buttons
    subjectButtons: document.querySelectorAll(".subject-btn"),

    // Reminder Section
    reminderWidget: document.getElementById("reminder-widget"),
    reminderBannerCard: document.getElementById("reminder-banner-card"),
    reminderBannerTitle: document.getElementById("reminder-banner-title"),
    reminderSubtitle: document.getElementById("reminder-subtitle"),
    reminderCountBadge: document.getElementById("reminder-count-badge"),
    reminderItemsContainer: document.getElementById("reminder-items-container"),

    // Form
    taskForm: document.getElementById("task-form"),
    formHeading: document.getElementById("form-heading"),
    formSubjectBadge: document.getElementById("form-subject-badge"),
    subjectSelectRow: document.getElementById("subject-select-row"),
    taskSubjectSelect: document.getElementById("task-subject-select"),
    taskNameInput: document.getElementById("task-name-input"),
    taskDeadlineInput: document.getElementById("task-deadline-input"),
    taskSubmissionInput: document.getElementById("task-submission-input"),
    btnAddTask: document.getElementById("btn-add-task"),

    // List & Toolbar
    currentViewTitle: document.getElementById("current-view-title"),
    statTotalTasks: document.getElementById("stat-total-tasks"),
    statCompletedTasks: document.getElementById("stat-completed-tasks"),
    filterPills: document.querySelectorAll(".filter-pill"),
    btnClearCompleted: document.getElementById("btn-clear-completed"),
    loadingSpinner: document.getElementById("loading-spinner"),
    tasksContainer: document.getElementById("tasks-container"),
    emptyState: document.getElementById("empty-state"),
    emptyTitle: document.getElementById("empty-title"),
    emptyDesc: document.getElementById("empty-desc"),

    // Auth & Login Modal
    btnAuth: document.getElementById("btn-auth"),
    authStatusText: document.getElementById("auth-status-text"),
    authIcon: document.getElementById("auth-icon"),
    formLockBadge: document.getElementById("form-lock-badge"),
    formCardContainer: document.getElementById("form-card-container"),
    loginModal: document.getElementById("login-modal"),
    loginForm: document.getElementById("login-form"),
    loginUsername: document.getElementById("login-username"),
    loginPassword: document.getElementById("login-password"),
    loginErrorMsg: document.getElementById("login-error-msg"),
    btnCloseLoginModal: document.getElementById("btn-close-login-modal"),
    btnCancelLogin: document.getElementById("btn-cancel-login"),
    btnTogglePassword: document.getElementById("btn-toggle-password"),
    pwEyeIcon: document.getElementById("pw-eye-icon"),

    // Connection & Settings Modal
    connectionBadge: document.getElementById("connection-badge"),
    connectionStatusText: document.getElementById("connection-status-text"),
    btnOpenSettings: document.getElementById("btn-open-settings"),
    settingsModal: document.getElementById("settings-modal"),
    btnCloseModal: document.getElementById("btn-close-modal"),
    supabaseUrlInput: document.getElementById("supabase-url"),
    supabaseKeyInput: document.getElementById("supabase-key"),
    btnSaveCloud: document.getElementById("btn-save-cloud"),
    btnDisconnectCloud: document.getElementById("btn-disconnect-cloud"),
    btnCopySql: document.getElementById("btn-copy-sql"),
    sqlCode: document.getElementById("sql-code"),

    // Toast
    toast: document.getElementById("toast"),
};

// ============================================================================
// Engine & Data Management
// ============================================================================

function initApp() {
    setupEventListeners();
    setDefaultDeadlineInput();
    checkAuthSession();
    checkSavedCloudCredentials();
    loadTasks();
    startLiveCountdownTimer();
}

function setDefaultDeadlineInput() {
    if (!dom.taskDeadlineInput) return;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 0, 0);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");
    const hours = String(tomorrow.getHours()).padStart(2, "0");
    const minutes = String(tomorrow.getMinutes()).padStart(2, "0");

    dom.taskDeadlineInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
}

async function loadTasks() {
    if (state.isCloudConnected && state.supabaseClient) {
        showLoading(true);
        try {
            const { data, error } = await state.supabaseClient.from("tugas_kuliah").select("*").order("is_done", { ascending: true }).order("deadline", { ascending: true });

            if (error) throw error;

            const rawData = data || [];
            state.tasks = rawData.map((t) => ({
                ...t,
                subject: normalizeSubject(t.subject),
            }));
            localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(state.tasks));
            renderAll();
        } catch (err) {
            console.error("Gagal mengambil data dari Supabase:", err);
            showToast("Gagal memuat Supabase. Menggunakan data lokal.", "danger");
            loadFromLocalStorage();
        } finally {
            showLoading(false);
        }
    } else {
        loadFromLocalStorage();
    }
}

function loadFromLocalStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
        if (raw) {
            const parsed = JSON.parse(raw);
            state.tasks = Array.isArray(parsed)
                ? parsed.map((t) => ({
                      ...t,
                      subject: normalizeSubject(t.subject),
                  }))
                : generateStarterTasks();
            saveToLocalStorage();
        } else {
            state.tasks = generateStarterTasks();
            saveToLocalStorage();
        }
    } catch (e) {
        console.error("Gagal membaca LocalStorage:", e);
        state.tasks = generateStarterTasks();
    }
    renderAll();
}

function saveToLocalStorage() {
    try {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(state.tasks));
    } catch (e) {
        console.error("Gagal menyimpan ke LocalStorage:", e);
    }
}

// ============================================================================
// Algoritma Analisis & Pengingat Deadline Mendekati Hari Ini
// ============================================================================

let liveCountdownInterval = null;

function formatLiveCountdown(deadlineIsoStr, isDone) {
    if (isDone) return "Selesai";
    const now = Date.now();
    const target = new Date(deadlineIsoStr).getTime();
    const diff = target - now;

    const isPast = diff < 0;
    const absDiff = Math.abs(diff);

    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, "0");

    let timeStr = "";
    if (days > 0) {
        timeStr = `${days} : ${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
    } else {
        timeStr = `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
    }

    return isPast ? `Terlewat ${timeStr}` : `${timeStr}`;
}

function startLiveCountdownTimer() {
    if (liveCountdownInterval) clearInterval(liveCountdownInterval);
    liveCountdownInterval = setInterval(() => {
        const countdownEls = document.querySelectorAll(".countdown-live");
        if (!countdownEls || countdownEls.length === 0) return;

        countdownEls.forEach((el) => {
            const deadline = el.dataset.deadline;
            const isDone = el.dataset.isdone === "true";
            if (deadline) {
                el.textContent = formatLiveCountdown(deadline, isDone);
            }
        });
    }, 1000);
}

function analyzeDeadline(deadlineStr, isDone) {
    if (isDone) {
        return {
            status: "done",
            badgeText: "Selesai",
            badgeClass: "done",
            isUrgent: false,
            isOverdue: false,
            diffHours: 0,
            diffMs: 0,
        };
    }

    const now = new Date();
    const deadline = new Date(deadlineStr);
    const diffMs = deadline.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    const hours = String(deadline.getHours()).padStart(2, "0");
    const minutes = String(deadline.getMinutes()).padStart(2, "0");
    const timeFormatted = `${hours}.${minutes}`;

    // 1. TERLEWAT (OVERDUE)
    if (diffMs < 0) {
        const pastHours = Math.abs(Math.floor(diffHours));
        const pastDays = Math.abs(Math.floor(diffHours / 24));
        const overdueCountdown = pastHours < 24 ? `(terlewat ${pastHours} jam)` : `(terlewat ${pastDays} hari)`;

        return {
            status: "overdue",
            badgeText: `terlewat - ${timeFormatted}`,
            countdownText: overdueCountdown,
            isUrgent: true,
            isOverdue: true,
            diffHours: diffHours,
            diffMs: diffMs,
            timeFormatted: timeFormatted,
        };
    }

    // 2. DEADLINE HARI INI (DUE TODAY / < 24 JAM)
    const isToday = now.toDateString() === deadline.toDateString() || (diffHours >= 0 && diffHours <= 24);
    if (isToday) {
        const remainingHours = Math.max(1, Math.round(diffHours));
        return {
            status: "today",
            badgeText: `hari ini - ${timeFormatted}`,
            countdownText: `(sisa ${remainingHours} jam)`,
            isUrgent: true,
            isOverdue: false,
            diffHours: diffHours,
            diffMs: diffMs,
            timeFormatted: timeFormatted,
        };
    }

    // 3. DEADLINE BESOK (DUE TOMORROW / < 48 JAM)
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isTomorrow = tomorrow.toDateString() === deadline.toDateString() || (diffHours > 24 && diffHours <= 48);

    if (isTomorrow) {
        return {
            status: "tomorrow",
            badgeText: `besok - ${timeFormatted}`,
            countdownText: `(sisa ${Math.round(diffHours)} jam)`,
            isUrgent: true,
            isOverdue: false,
            diffHours: diffHours,
            diffMs: diffMs,
            timeFormatted: timeFormatted,
        };
    }

    // 4. DEADLINE AMAN (MASIH JAUH)
    const daysRemaining = Math.ceil(diffHours / 24);
    const day = deadline.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const monthShort = monthNames[deadline.getMonth()];

    return {
        status: "safe",
        badgeText: `${day} ${monthShort} - ${timeFormatted}`,
        countdownText: `(sisa ${daysRemaining} hari)`,
        isUrgent: false,
        isOverdue: false,
        diffHours: diffHours,
        diffMs: diffMs,
        timeFormatted: timeFormatted,
    };
}

// Render Widget Pengingat Deadline Terdekat
function renderDeadlineReminder() {
    if (!dom.reminderWidget || !dom.reminderItemsContainer) return;

    const activeTasks = state.tasks.filter((t) => !t.is_done);
    const urgentTasks = [];

    activeTasks.forEach((task) => {
        const info = analyzeDeadline(task.deadline, task.is_done);
        if (info.isUrgent) {
            urgentTasks.push({ task, info });
        }
    });

    // Urutkan paling mendesak di atas
    urgentTasks.sort((a, b) => a.info.diffMs - b.info.diffMs);

    if (urgentTasks.length > 0) {
        const hasOverdue = urgentTasks.some((item) => item.info.isOverdue);

        if (hasOverdue) {
            dom.reminderBannerCard.classList.add("has-overdue");
            dom.reminderCountBadge.textContent = `${urgentTasks.length} Tugas Urgent!`;
        } else {
            dom.reminderBannerCard.classList.remove("has-overdue");
            dom.reminderCountBadge.textContent = `${urgentTasks.length} Tugas Mendesak`;
        }

        dom.reminderItemsContainer.innerHTML = urgentTasks
            .map(({ task, info }) => {
                const subjectColor = getSubjectColorClass(task.subject);
                return `
                <div class="reminder-task-card" data-id="${task.id}">
                    <div class="reminder-task-left">
                        <div class="reminder-task-info">
                            <div class="reminder-task-name" style="margin:0px 0px 20px 0px;">${escapeHtml(task.name)}</div>
                            <div class="reminder-task-meta">
                                <span class="subject-pill ${subjectColor}">${escapeHtml(task.subject)}</span>
                                <span class="deadline-pill">${info.badgeText}</span>
                                <span class="reminder-submission">
                                    <i class="fa-solid fa-arrow-up-from-bracket"></i> ${escapeHtml(task.submission)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="reminder-task-right">
                        <span class="countdown-live" data-deadline="${task.deadline}" data-isdone="${task.is_done}">
                            ${formatLiveCountdown(task.deadline, task.is_done)}
                        </span>
                    </div>
                </div>
            `;
            })
            .join("");

        startLiveCountdownTimer();
    } else {
        dom.reminderBannerCard.classList.remove("has-overdue");
        dom.reminderCountBadge.textContent = "Semua Aman 🎉";

        dom.reminderItemsContainer.innerHTML = `
            <div class="all-clear-box">
                <i class="fa-solid fa-circle-check" style="font-size: 1.35rem; color: #15803D;"></i>
                <span>Semua tugas beres! Tidak ada deadline mendesak dalam 48 jam ke depan. Santai dulu, Bos! ✨</span>
            </div>
        `;
    }
}

// ============================================================================
// Render Daftar Tugas Utama & Filter
// ============================================================================

function renderTasks() {
    if (!dom.tasksContainer) return;

    // 1. Filter Mata Kuliah
    let filtered = state.tasks;
    if (state.currentSubject !== "all") {
        const normCurrent = normalizeSubject(state.currentSubject);
        filtered = filtered.filter((t) => t.subject === state.currentSubject || normalizeSubject(t.subject) === normCurrent);
    }

    // 2. Filter Status (Semua | Belum | Selesai)
    if (state.currentFilter === "active") {
        filtered = filtered.filter((t) => !t.is_done);
    } else if (state.currentFilter === "completed") {
        filtered = filtered.filter((t) => t.is_done);
    }

    // Urutkan: Belum selesai di atas, lalu berdasarkan deadline
    filtered.sort((a, b) => {
        if (a.is_done !== b.is_done) return a.is_done ? 1 : -1;
        return new Date(a.deadline) - new Date(b.deadline);
    });

    // Update Summary Stats
    const normSubject = normalizeSubject(state.currentSubject);
    const totalCount =
        state.currentSubject === "all"
            ? state.tasks.length
            : state.tasks.filter((t) => t.subject === state.currentSubject || normalizeSubject(t.subject) === normSubject).length;

    const completedCount =
        state.currentSubject === "all"
            ? state.tasks.filter((t) => t.is_done).length
            : state.tasks.filter((t) => (t.subject === state.currentSubject || normalizeSubject(t.subject) === normSubject) && t.is_done).length;

    if (dom.statTotalTasks) dom.statTotalTasks.textContent = `${totalCount} Tugas`;
    if (dom.statCompletedTasks) dom.statCompletedTasks.textContent = `${completedCount} Selesai`;

    // Render HTML Cards
    if (filtered.length === 0) {
        dom.tasksContainer.innerHTML = "";
        dom.emptyState.classList.remove("hidden");

        if (state.currentSubject !== "all") {
            dom.emptyTitle.textContent = `Belum ada tugas untuk ${state.currentSubject}`;
            dom.emptyDesc.textContent = "Gunakan form di atas untuk menambahkan tugas baru untuk matkul ini.";
        } else {
            dom.emptyTitle.textContent = "Belum ada tugas kuliah tercatat";
            dom.emptyDesc.textContent = "Semua tugas kuliah beres atau belum ada yang dicatat. Semangat belajarnya, Bos!";
        }
    } else {
        dom.emptyState.classList.add("hidden");
        dom.tasksContainer.innerHTML = filtered
            .map((task) => {
                const deadlineInfo = analyzeDeadline(task.deadline, task.is_done);
                const subjectColor = getSubjectColorClass(task.subject);

                const deadlineDisplay = task.is_done
                    ? `<span class="deadline-pill done"><i class="fa-solid fa-circle-check"></i> selesai</span>`
                    : `<span class="deadline-pill">${deadlineInfo.badgeText}</span> <span class="countdown-text ${deadlineInfo.status}">${deadlineInfo.countdownText}</span>`;

                return `
                <div class="task-card ${task.is_done ? "completed" : ""}" data-id="${task.id}">
                    <div class="task-checkbox-wrap">
                        <button class="task-checkbox" onclick="toggleTask(${task.id})" title="${task.is_done ? "Tandai belum selesai" : "Tandai selesai"}">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    </div>

                    <div class="task-content">
                        <div class="task-header-tags">
                            <span class="subject-pill ${subjectColor}">${escapeHtml(task.subject)}</span>
                            ${deadlineDisplay}
                        </div>

                        <div class="task-title">${escapeHtml(task.name)}</div>

                        <div class="task-meta">
                            <span class="submission-tag">
                                <i class="fa-solid fa-arrow-up-from-bracket"></i> ${escapeHtml(task.submission)}
                            </span>
                        </div>
                    </div>

                    <div class="task-actions">
                        <button class="btn-task-action" onclick="deleteTask(${task.id})" title="Hapus Tugas">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            `;
            })
            .join("");
    }
}

// Update Badge Counter pada 9 Button Menu + Tombol Semua (Disembunyikan jika 0)
function updateSubjectBadges() {
    const activeAll = state.tasks.filter((t) => !t.is_done).length;
    const countAllEl = document.getElementById("count-all");
    if (countAllEl) {
        countAllEl.textContent = activeAll;
        countAllEl.style.display = activeAll > 0 ? "inline-flex" : "none";
    }

    SUBJECT_CONFIG.forEach((item) => {
        const badgeEl = document.getElementById(item.badgeId);
        if (badgeEl) {
            const count = state.tasks.filter((t) => (t.subject === item.key || normalizeSubject(t.subject) === item.key) && !t.is_done).length;
            badgeEl.textContent = count;
            badgeEl.style.display = count > 0 ? "inline-flex" : "none";
        }
    });
}

function renderAll() {
    renderDeadlineReminder();
    renderTasks();
    updateSubjectBadges();
}

// ============================================================================
// Navigasi 9 Button Menu Kecil (Mata Kuliah)
// ============================================================================

function switchSubject(subjectKey) {
    state.currentSubject = subjectKey;

    // Update active class pada button menu
    dom.subjectButtons.forEach((btn) => {
        if (btn.dataset.subject === subjectKey) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Sesuaikan Header List & Form Khusus Matkul
    if (subjectKey === "all") {
        dom.currentViewTitle.textContent = "Daftar Semua Tugas";
        dom.formHeading.textContent = "Tambah Tugas Baru";
        dom.formSubjectBadge.textContent = "Semua Matkul";
        dom.subjectSelectRow.style.display = "block";
    } else {
        dom.currentViewTitle.textContent = `Daftar Tugas: ${subjectKey}`;
        dom.formHeading.textContent = `Tambah Tugas: ${subjectKey}`;
        dom.formSubjectBadge.textContent = subjectKey;
        dom.subjectSelectRow.style.display = "none";
    }

    renderTasks();
}

// ============================================================================
// CRUD Operasi Tugas
// ============================================================================

async function handleAddTask(e) {
    e.preventDefault();

    if (!state.isLoggedIn) {
        openLoginModal();
        showToast("Mode Tamu: Silakan masuk sebagai Arhte terlebih dahulu.", "info");
        return;
    }

    const name = dom.taskNameInput.value.trim();
    const deadlineVal = dom.taskDeadlineInput.value;
    const submission = dom.taskSubmissionInput.value.trim();

    if (!name || !deadlineVal || !submission) {
        showToast("Mohon lengkapi seluruh data tugas!", "danger");
        return;
    }

    let subject = state.currentSubject;
    if (subject === "all") {
        subject = dom.taskSubjectSelect.value;
    }

    const newTask = {
        subject: subject,
        name: name,
        deadline: new Date(deadlineVal).toISOString(),
        submission: submission,
        is_done: false,
        created_at: new Date().toISOString(),
    };

    if (state.isCloudConnected && state.supabaseClient) {
        try {
            const { data, error } = await state.supabaseClient.from("tugas_kuliah").insert([newTask]).select();

            if (error) throw error;
            if (data && data[0]) {
                state.tasks.unshift(data[0]);
            }
            showToast(`Tugas ${subject} tersimpan di Cloud!`, "success");
        } catch (err) {
            console.error("Error insert Supabase:", err);
            showToast("Gagal simpan ke Cloud, menyimpan lokal.", "danger");
            newTask.id = Date.now();
            state.tasks.unshift(newTask);
            saveToLocalStorage();
        }
    } else {
        newTask.id = Date.now();
        state.tasks.unshift(newTask);
        saveToLocalStorage();
        showToast(`Tugas ${subject} berhasil ditambahkan!`, "success");
    }

    dom.taskNameInput.value = "";
    dom.taskSubmissionInput.value = "";
    setDefaultDeadlineInput();

    renderAll();
}

async function toggleTask(id) {
    if (!state.isLoggedIn) {
        openLoginModal();
        showToast("Mode Tamu: Silakan masuk sebagai Arhte untuk mengubah status tugas.", "info");
        return;
    }

    const task = state.tasks.find((t) => t.id === id);
    if (!task) return;

    const newStatus = !task.is_done;
    task.is_done = newStatus;

    if (state.isCloudConnected && state.supabaseClient) {
        try {
            const { error } = await state.supabaseClient.from("tugas_kuliah").update({ is_done: newStatus }).eq("id", id);

            if (error) throw error;
        } catch (err) {
            console.error("Gagal update status di Supabase:", err);
        }
    }

    saveToLocalStorage();
    renderAll();
    showToast(newStatus ? "Tugas ditandai selesai! Mantap, Bos." : "Tugas diaktifkan kembali.", "success");
}

async function deleteTask(id) {
    if (!state.isLoggedIn) {
        openLoginModal();
        showToast("Mode Tamu: Silakan masuk sebagai Arhte untuk menghapus tugas.", "info");
        return;
    }

    const task = state.tasks.find((t) => t.id === id);
    if (!task) return;

    if (!confirm(`Hapus tugas "${task.name}"?`)) return;

    state.tasks = state.tasks.filter((t) => t.id !== id);

    if (state.isCloudConnected && state.supabaseClient) {
        try {
            const { error } = await state.supabaseClient.from("tugas_kuliah").delete().eq("id", id);

            if (error) throw error;
        } catch (err) {
            console.error("Gagal menghapus di Supabase:", err);
        }
    }

    saveToLocalStorage();
    renderAll();
    showToast("Tugas berhasil dihapus.", "info");
}

async function clearCompletedTasks() {
    if (!state.isLoggedIn) {
        openLoginModal();
        showToast("Mode Tamu: Silakan masuk sebagai Arhte untuk membersihkan tugas.", "info");
        return;
    }

    const completedCount = state.tasks.filter((t) => t.is_done).length;
    if (completedCount === 0) {
        showToast("Tidak ada tugas yang sudah selesai untuk dibersihkan.", "info");
        return;
    }

    if (!confirm(`Bersihkan ${completedCount} tugas yang sudah selesai?`)) return;

    if (state.isCloudConnected && state.supabaseClient) {
        try {
            const { error } = await state.supabaseClient.from("tugas_kuliah").delete().eq("is_done", true);

            if (error) throw error;
        } catch (err) {
            console.error("Gagal membersihkan tugas di Supabase:", err);
        }
    }

    state.tasks = state.tasks.filter((t) => !t.is_done);
    saveToLocalStorage();
    renderAll();
    showToast(`${completedCount} tugas selesai dibersihkan.`, "success");
}

window.toggleTask = toggleTask;
window.deleteTask = deleteTask;

// ============================================================================
// Integrasi Supabase Cloud
// ============================================================================

function checkSavedCloudCredentials() {
    const savedUrl = localStorage.getItem(STORAGE_KEYS.SUPABASE_URL);
    const savedKey = localStorage.getItem(STORAGE_KEYS.SUPABASE_KEY);

    if (savedUrl && savedKey && window.supabase) {
        initSupabase(savedUrl, savedKey, false);
    } else {
        updateConnectionStatus(false);
    }
}

async function initSupabase(url, key, showNotification = true) {
    try {
        if (!window.supabase) {
            throw new Error("Supabase client library belum termuat dari CDN.");
        }

        const client = window.supabase.createClient(url, key);
        const { error } = await client.from("tugas_kuliah").select("id").limit(1);
        if (error) throw error;

        state.supabaseClient = client;
        state.isCloudConnected = true;

        localStorage.setItem(STORAGE_KEYS.SUPABASE_URL, url);
        localStorage.setItem(STORAGE_KEYS.SUPABASE_KEY, key);

        updateConnectionStatus(true);
        setupRealtimeSubscription();

        if (showNotification) {
            showToast("Berhasil terhubung ke Supabase Cloud PostgreSQL!", "success");
            closeModal();
        }

        loadTasks();
    } catch (err) {
        console.error("Koneksi Supabase gagal:", err);
        updateConnectionStatus(false);
        if (showNotification) {
            showToast(`Koneksi Gagal: ${err.message || "Periksa URL & API Key."}`, "danger");
        }
    }
}

function setupRealtimeSubscription() {
    if (!state.supabaseClient) return;

    if (state.realtimeChannel) {
        state.supabaseClient.removeChannel(state.realtimeChannel);
    }

    state.realtimeChannel = state.supabaseClient
        .channel("public:tugas_kuliah")
        .on("postgres_changes", { event: "*", schema: "public", table: "tugas_kuliah" }, (payload) => {
            console.log("Realtime update received:", payload);
            loadTasks();
        })
        .subscribe();
}

function disconnectCloud() {
    if (state.realtimeChannel && state.supabaseClient) {
        state.supabaseClient.removeChannel(state.realtimeChannel);
    }

    localStorage.removeItem(STORAGE_KEYS.SUPABASE_URL);
    localStorage.removeItem(STORAGE_KEYS.SUPABASE_KEY);

    state.supabaseClient = null;
    state.isCloudConnected = false;

    updateConnectionStatus(false);
    closeModal();
    showToast("Kembali ke mode LocalStorage offline.", "info");
    loadFromLocalStorage();
}

function updateConnectionStatus(isConnected) {
    if (!dom.connectionBadge || !dom.connectionStatusText) return;

    const dot = dom.connectionBadge.querySelector(".status-dot");

    if (isConnected) {
        dot.style.background = "#3B82F6";
        dom.connectionStatusText.textContent = "Supabase Cloud";
        dom.connectionBadge.title = "Terhubung ke PostgreSQL Supabase (Live Sync Aktif)";
    } else {
        dot.style.background = "#10B981";
        dom.connectionStatusText.textContent = "Local Mode";
        dom.connectionBadge.title = "Data disimpan di browser lokal (Klik untuk setup Supabase Cloud)";
    }
}

// ============================================================================
// Modal Settings & Toast UI
// ============================================================================

function openModal() {
    if (!dom.settingsModal) return;
    dom.supabaseUrlInput.value = localStorage.getItem(STORAGE_KEYS.SUPABASE_URL) || "";
    dom.supabaseKeyInput.value = localStorage.getItem(STORAGE_KEYS.SUPABASE_KEY) || "";
    dom.settingsModal.classList.remove("hidden");
}

function closeModal() {
    if (!dom.settingsModal) return;
    dom.settingsModal.classList.add("hidden");
}

function showLoading(isLoading) {
    if (!dom.loadingSpinner) return;
    if (isLoading) {
        dom.loadingSpinner.classList.remove("hidden");
    } else {
        dom.loadingSpinner.classList.add("hidden");
    }
}

function showToast(message, type = "info") {
    if (!dom.toast) return;
    dom.toast.textContent = message;
    dom.toast.className = `toast ${type}`;
    dom.toast.classList.remove("hidden");

    setTimeout(() => {
        dom.toast.classList.add("hidden");
    }, 3200);
}

function formatFullDateTime(isoStr) {
    const d = new Date(isoStr);
    return d.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// ============================================================================
// Autentikasi & Sesi Login (Admin: arhte / asdfghjkl;')
// Sesi aktif selama 1 minggu (7 hari)
// ============================================================================

const AUTH_CONFIG = {
    USERNAME: "arhte",
    PASSWORD: "asdfghjkl;'",
    SESSION_DURATION_MS: 7 * 24 * 60 * 60 * 1000, // 1 Minggu
};

function checkAuthSession() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
        if (!raw) {
            state.isLoggedIn = false;
            updateAuthUI();
            return;
        }

        const session = JSON.parse(raw);
        if (
            session &&
            session.username === AUTH_CONFIG.USERNAME &&
            session.expiresAt &&
            Date.now() < session.expiresAt
        ) {
            state.isLoggedIn = true;
        } else {
            // Sesi habis / kedaluwarsa
            localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
            state.isLoggedIn = false;
        }
    } catch (e) {
        state.isLoggedIn = false;
    }
    updateAuthUI();
}

function updateAuthUI() {
    if (!dom.btnAuth) return;

    if (state.isLoggedIn) {
        dom.btnAuth.classList.add("logged-in");
        dom.btnAuth.title = "Masuk sebagai Arhte (Klik untuk Keluar)";
        if (dom.authIcon) dom.authIcon.className = "fa-solid fa-user-check";
        if (dom.authStatusText) dom.authStatusText.textContent = "Arhte";
        if (dom.formLockBadge) dom.formLockBadge.classList.add("hidden");
        if (dom.btnAddTask) {
            dom.btnAddTask.innerHTML = `<i class="fa-solid fa-plus"></i> Simpan Tugas`;
        }
        if (dom.formCardContainer) {
            dom.formCardContainer.classList.remove("guest-mode-locked");
        }
    } else {
        dom.btnAuth.classList.remove("logged-in");
        dom.btnAuth.title = "Mode Tamu (Klik untuk Masuk)";
        if (dom.authIcon) dom.authIcon.className = "fa-solid fa-lock";
        if (dom.authStatusText) dom.authStatusText.textContent = "Masuk";
        if (dom.formLockBadge) dom.formLockBadge.classList.remove("hidden");
        if (dom.btnAddTask) {
            dom.btnAddTask.innerHTML = `<i class="fa-solid fa-lock"></i> Masuk untuk Menambah Tugas`;
        }
        if (dom.formCardContainer) {
            dom.formCardContainer.classList.add("guest-mode-locked");
        }
    }
}

function openLoginModal() {
    if (!dom.loginModal) return;
    if (dom.loginErrorMsg) dom.loginErrorMsg.classList.add("hidden");
    if (dom.loginUsername) dom.loginUsername.value = "";
    if (dom.loginPassword) dom.loginPassword.value = "";
    dom.loginModal.classList.remove("hidden");
    setTimeout(() => {
        if (dom.loginUsername) dom.loginUsername.focus();
    }, 60);
}

function closeLoginModal() {
    if (!dom.loginModal) return;
    dom.loginModal.classList.add("hidden");
}

function handleLoginSubmit(e) {
    e.preventDefault();
    const user = dom.loginUsername ? dom.loginUsername.value.trim().toLowerCase() : "";
    const pass = dom.loginPassword ? dom.loginPassword.value : "";

    if (user === AUTH_CONFIG.USERNAME && pass === AUTH_CONFIG.PASSWORD) {
        const session = {
            username: AUTH_CONFIG.USERNAME,
            loginTime: Date.now(),
            expiresAt: Date.now() + AUTH_CONFIG.SESSION_DURATION_MS,
        };
        localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(session));
        state.isLoggedIn = true;
        updateAuthUI();
        closeLoginModal();
        showToast("Berhasil masuk sebagai Arhte! Sesi aktif selama 1 minggu. ✨", "success");
        if (dom.taskNameInput) {
            setTimeout(() => dom.taskNameInput.focus(), 150);
        }
    } else {
        if (dom.loginErrorMsg) {
            dom.loginErrorMsg.classList.remove("hidden");
        }
        if (dom.loginPassword) {
            dom.loginPassword.value = "";
            dom.loginPassword.focus();
        }
    }
}

function handleAuthButtonClick() {
    if (state.isLoggedIn) {
        if (confirm("Apakah Anda ingin keluar dari akun Arhte dan kembali ke Mode Tamu (Hanya Lihat)?")) {
            localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
            state.isLoggedIn = false;
            updateAuthUI();
            showToast("Anda telah keluar ke Mode Tamu (Hanya Lihat).", "info");
        }
    } else {
        openLoginModal();
    }
}

// ============================================================================
// Event Listeners Setup
// ============================================================================

function setupEventListeners() {
    // 1. 9 Button Menu Kecil (Mata Kuliah)
    dom.subjectButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const subject = btn.dataset.subject;
            switchSubject(subject);
        });
    });

    // 2. Intercept Form Tambah Tugas untuk Tamu
    if (dom.formCardContainer) {
        dom.formCardContainer.addEventListener("click", (e) => {
            if (!state.isLoggedIn) {
                if (e.target.closest("input, select, button, label, .form-card-header")) {
                    e.preventDefault();
                    if (document.activeElement && document.activeElement.blur) {
                        document.activeElement.blur();
                    }
                    openLoginModal();
                    showToast("Mode Tamu: Silakan masuk sebagai Arhte terlebih dahulu.", "info");
                }
            }
        });
    }

    if (dom.taskForm) {
        dom.taskForm.addEventListener("submit", handleAddTask);
    }

    // 3. Auth & Login Modal Events
    if (dom.btnAuth) {
        dom.btnAuth.addEventListener("click", handleAuthButtonClick);
    }
    if (dom.formLockBadge) {
        dom.formLockBadge.addEventListener("click", () => {
            if (!state.isLoggedIn) openLoginModal();
        });
    }
    if (dom.loginForm) {
        dom.loginForm.addEventListener("submit", handleLoginSubmit);
    }
    if (dom.btnCloseLoginModal) {
        dom.btnCloseLoginModal.addEventListener("click", closeLoginModal);
    }
    if (dom.btnCancelLogin) {
        dom.btnCancelLogin.addEventListener("click", closeLoginModal);
    }
    if (dom.loginModal) {
        dom.loginModal.addEventListener("click", (e) => {
            if (e.target === dom.loginModal) closeLoginModal();
        });
    }
    if (dom.btnTogglePassword && dom.loginPassword && dom.pwEyeIcon) {
        dom.btnTogglePassword.addEventListener("click", () => {
            if (dom.loginPassword.type === "password") {
                dom.loginPassword.type = "text";
                dom.pwEyeIcon.className = "fa-regular fa-eye-slash";
            } else {
                dom.loginPassword.type = "password";
                dom.pwEyeIcon.className = "fa-regular fa-eye";
            }
        });
    }

    // 4. Filter Status Pills
    dom.filterPills.forEach((pill) => {
        pill.addEventListener("click", () => {
            dom.filterPills.forEach((p) => p.classList.remove("active"));
            pill.classList.add("active");
            state.currentFilter = pill.dataset.filter;
            renderTasks();
        });
    });

    // 5. Tombol Bersihkan Selesai
    if (dom.btnClearCompleted) {
        dom.btnClearCompleted.addEventListener("click", clearCompletedTasks);
    }

    // 6. Settings Modal Supabase
    if (dom.btnOpenSettings) dom.btnOpenSettings.addEventListener("click", openModal);
    if (dom.connectionBadge) dom.connectionBadge.addEventListener("click", openModal);
    if (dom.btnCloseModal) dom.btnCloseModal.addEventListener("click", closeModal);
    if (dom.settingsModal) {
        dom.settingsModal.addEventListener("click", (e) => {
            if (e.target === dom.settingsModal) closeModal();
        });
    }

    // 7. Simpan Cloud
    if (dom.btnSaveCloud) {
        dom.btnSaveCloud.addEventListener("click", () => {
            const url = dom.supabaseUrlInput.value.trim();
            const key = dom.supabaseKeyInput.value.trim();
            if (!url || !key) {
                showToast("Isi Project URL dan Anon Key terlebih dahulu!", "danger");
                return;
            }
            initSupabase(url, key, true);
        });
    }

    // 8. Putuskan Cloud
    if (dom.btnDisconnectCloud) {
        dom.btnDisconnectCloud.addEventListener("click", disconnectCloud);
    }

    // 9. Copy SQL Skrip
    if (dom.btnCopySql && dom.sqlCode) {
        dom.btnCopySql.addEventListener("click", () => {
            navigator.clipboard
                .writeText(dom.sqlCode.textContent)
                .then(() => showToast("Skrip SQL berhasil disalin ke clipboard!", "success"))
                .catch(() => showToast("Gagal menyalin skrip.", "danger"));
        });
    }

    // 10. Shortcut Keyboard Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
            closeLoginModal();
        }
    });
}

document.addEventListener("DOMContentLoaded", initApp);
