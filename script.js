let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

// Dashboard counters
let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');
let rightTotal = document.getElementById('righttotal'); // right-side total

// Filter buttons
const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

// Sections
const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');
const emptyState = document.getElementById('emptyState');


// ================= COUNT =================
function calculateCount() {
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    updateRightTotal();
}

// ================= RIGHT SIDE TOTAL =================
function updateRightTotal() {
    if (currentStatus === 'all-filter-btn') {
        rightTotal.innerText = allCardSection.children.length;
    } else if (currentStatus === 'interview-filter-btn') {
        rightTotal.innerText = interviewList.length;
    } else if (currentStatus === 'rejected-filter-btn') {
        rightTotal.innerText = rejectedList.length;
    }
}

// ================= EMPTY STATE =================
function toggleEmptyState(list) {
    if (list.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}

// ================= TAB STYLE + FILTER =================
function toggleStyle(id) {
    // Reset all buttons
    allFilterBtn.classList.add('bg-gray-300', 'text-black');
    interviewFilterBtn.classList.add('bg-gray-300', 'text-black');
    rejectedFilterBtn.classList.add('bg-gray-300', 'text-black');

    allFilterBtn.classList.remove('bg-black', 'text-white');
    interviewFilterBtn.classList.remove('bg-black', 'text-white');
    rejectedFilterBtn.classList.remove('bg-black', 'text-white');

    // Activate clicked button
    const selected = document.getElementById(id);
    currentStatus = id;
    selected.classList.remove('bg-gray-300', 'text-black');
    selected.classList.add('bg-black', 'text-white');

    // Show/hide sections
    if (id === 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
        emptyState.classList.add('hidden');
    } else if (id === 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    } else if (id === 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }

    updateRightTotal();
}

// ================= EVENT DELEGATION =================
mainContainer.addEventListener('click', function (event) {

    const card = event.target.closest('.card');
    if (!card) return;

    const plantName = card.querySelector('.plantName').innerText;

    // INTERVIEW BUTTON
    if (event.target.classList.contains('interview-btn')) {
        card.querySelector('.status').innerText = 'interview';

        if (!interviewList.find(item => item.plantName === plantName)) {
            interviewList.push({ plantName, status: 'interview' });
        }

        rejectedList = rejectedList.filter(item => item.plantName !== plantName);

        if (currentStatus === 'rejected-filter-btn') renderRejected();

        calculateCount();
    }

    // REJECTED BUTTON
    else if (event.target.classList.contains('rejected-btn')) {
        card.querySelector('.status').innerText = 'rejected';

        if (!rejectedList.find(item => item.plantName === plantName)) {
            rejectedList.push({ plantName, status: 'rejected' });
        }

        interviewList = interviewList.filter(item => item.plantName !== plantName);

        if (currentStatus === 'interview-filter-btn') renderInterview();

        calculateCount();
    }

    // DELETE BUTTON
    else if (event.target.classList.contains('btn-delete')) {
        interviewList = interviewList.filter(item => item.plantName !== plantName);
        rejectedList = rejectedList.filter(item => item.plantName !== plantName);

        card.remove();

        if (currentStatus === 'interview-filter-btn') renderInterview();
        if (currentStatus === 'rejected-filter-btn') renderRejected();

        calculateCount();
    }
});

// ================= RENDER INTERVIEW =================
function renderInterview() {
    filterSection.innerHTML = '';

    if (interviewList.length === 0) {
        toggleEmptyState(interviewList);
        return;
    } else {
        toggleEmptyState(interviewList);
    }

    for (let item of interviewList) {
        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8';
        div.innerHTML = `
            <div class="space-y-6">
                <div>
                    <p class="plantName text-4xl">${item.plantName}</p>
                    <p class="latinName">Latin Name</p>
                </div>

                <div class="flex gap-2">
                    <p class="light bg-gray-200 px-5">Bright Indicate</p>
                    <p class="water bg-gray-200 px-5">weekly</p>
                </div>

                <p class="status">${item.status}</p>
                <p class="notes">New leaf unfurling by the east window.</p>

                <div class="flex gap-5">
                    <button class="interview-btn bg-green-200 px-4 py-2">interview</button>
                    <button class="rejected-btn bg-red-200 px-4 py-2">rejected</button>
                </div>
            </div>

            <div>
                <button class="btn-delete bg-red-200 text-red-600 px-4 py-2">Delete</button>
            </div>
        `;
        filterSection.appendChild(div);
    }
}

// ================= RENDER REJECTED =================
function renderRejected() {
    filterSection.innerHTML = '';

    if (rejectedList.length === 0) {
        toggleEmptyState(rejectedList);
        return;
    } else {
        toggleEmptyState(rejectedList);
    }

    for (let item of rejectedList) {
        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8';
        div.innerHTML = `
            <div class="space-y-6">
                <div>
                    <p class="plantName text-4xl">${item.plantName}</p>
                    <p class="latinName">Latin Name</p>
                </div>

                <div class="flex gap-2">
                    <p class="light bg-gray-200 px-5">Bright Indicate</p>
                    <p class="water bg-gray-200 px-5">weekly</p>
                </div>

                <p class="status">${item.status}</p>
                <p class="notes">New leaf unfurling by the east window.</p>

                <div class="flex gap-5">
                    <button class="interview-btn bg-green-200 px-4 py-2">interview</button>
                    <button class="rejected-btn bg-red-200 px-4 py-2">rejected</button>
                </div>
            </div>

            <div>
                <button class="btn-delete bg-red-200 text-red-600 px-4 py-2">Delete</button>
            </div>
        `;
        filterSection.appendChild(div);
    }
}

// INITIAL CALCULATION
calculateCount();
