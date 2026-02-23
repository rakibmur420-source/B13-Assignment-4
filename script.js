let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');
const emptyState = document.getElementById('emptyState');


// ================= COUNT =================
function calculateCount() {
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}

calculateCount();


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

    allFilterBtn.classList.add('bg-gray-300', 'text-black');
    interviewFilterBtn.classList.add('bg-gray-300', 'text-black');
    rejectedFilterBtn.classList.add('bg-gray-300', 'text-black');

    allFilterBtn.classList.remove('bg-black', 'text-white');
    interviewFilterBtn.classList.remove('bg-black', 'text-white');
    rejectedFilterBtn.classList.remove('bg-black', 'text-white');

    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove('bg-gray-300', 'text-black');
    selected.classList.add('bg-black', 'text-white');

    if (id === 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
        emptyState.classList.add('hidden');
    }

    if (id === 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }

    if (id === 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
}


// ================= EVENT DELEGATION =================
mainContainer.addEventListener('click', function (event) {

    // INTERVIEW
    if (event.target.classList.contains('interview-btn')) {

        const card = event.target.closest('.card');
        const plantName = card.querySelector('.plantName').innerText;

        card.querySelector('.status').innerText = 'interview';

        if (!interviewList.find(item => item.plantName === plantName)) {
            interviewList.push({ plantName, status: 'interview' });
        }

        rejectedList = rejectedList.filter(item => item.plantName !== plantName);

        if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }

        calculateCount();
    }

    // REJECTED
    else if (event.target.classList.contains('rejected-btn')) {

        const card = event.target.closest('.card');
        const plantName = card.querySelector('.plantName').innerText;

        card.querySelector('.status').innerText = 'rejected';

        if (!rejectedList.find(item => item.plantName === plantName)) {
            rejectedList.push({ plantName, status: 'rejected' });
        }

        interviewList = interviewList.filter(item => item.plantName !== plantName);

        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        }

        calculateCount();
    }

    // DELETE
    else if (event.target.classList.contains('btn-delete')) {

        const card = event.target.closest('.card');
        const plantName = card.querySelector('.plantName').innerText;

        interviewList = interviewList.filter(item => item.plantName !== plantName);
        rejectedList = rejectedList.filter(item => item.plantName !== plantName);

        card.remove();

        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        }
        if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }

        calculateCount();
    }
});


// ================= RENDER INTERVIEW =================
function renderInterview() {
    filterSection.innerHTML = '';

    for (let item of interviewList) {
        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8';
        div.innerHTML = `
            <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="plantName text-4xl">${item.plantName}</p>
                        <p class="latinName">Latin Name</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-2">
                        <p class="light bg-gray-200 px-5">Bright Indicate</p>
                        <p class="water bg-gray-200 px-5">weekly</p>
                    </div>
                    <!-- part 3 -->
                     <p class="status">${item.status}</p>
                     <p class="notes">New leaf unfurling by the east window.</p>

                     <div class="flex gap-5">
                        <button class="interview-btn bg-green-200 px-4 py-2">interview</button>
                        <button class="rejected-btn bg-red-200 px-4 py-2">rejected</button>
                     </div>
                </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete bg-red-200 text-red-600 px-4 py-2">Delete</button>
                </div>
        `;
        filterSection.appendChild(div);
    }

    toggleEmptyState(interviewList);
}


// ================= RENDER REJECTED =================
function renderRejected() {
    filterSection.innerHTML = '';

    for (let item of rejectedList) {
        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8';
        div.innerHTML = `
            <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="plantName text-4xl">${item.plantName}</p>
                        <p class="latinName">Latin Name</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-2">
                        <p class="light bg-gray-200 px-5">Bright Indicate</p>
                        <p class="water bg-gray-200 px-5">weekly</p>
                    </div>
                    <!-- part 3 -->
                     <p class="status">${item.status}</p>
                     <p class="notes">New leaf unfurling by the east window.</p>

                     <div class="flex gap-5">
                        <button class="interview-btn bg-green-200 px-4 py-2">interview</button>
                        <button class="rejected-btn bg-red-200 px-4 py-2">rejected</button>
                     </div>
                </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete bg-red-200 text-red-600 px-4 py-2">Delete</button>
                </div>
        `;
        filterSection.appendChild(div);
    }

    toggleEmptyState(rejectedList);
}
