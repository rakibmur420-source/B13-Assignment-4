

let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');
let rightTotal = document.getElementById('righttotal');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');
const emptyState = document.getElementById('emptyState');

function calculateCount() {
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    updateRightTotal();
}

function updateRightTotal() {
    if (currentStatus === 'all-filter-btn') {
        rightTotal.innerText = allCardSection.children.length;
    } else if (currentStatus === 'interview-filter-btn') {
        rightTotal.innerText = interviewList.length;
    } else if (currentStatus === 'rejected-filter-btn') {
        rightTotal.innerText = rejectedList.length;
    }
}

function toggleEmptyState(list) {
    if (list.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}

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
    } else if (id === 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderFiltered(interviewList);
    } else if (id === 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderFiltered(rejectedList);
    }

    updateRightTotal();
}

mainContainer.addEventListener('click', function (event) {
    const card = event.target.closest('.card');
    if (!card) return;

    const company = card.querySelector('.company').innerText 
    const title = card.querySelector('.title').innerText
    const type = card.querySelector('.type').innerText 
    const salary = card.querySelector('.salary').innerText 
    const notes = card.querySelector('.notes').innerText 

    if (event.target.classList.contains('interview-btn')) {
        card.querySelector('.status').innerText = 'Interview';

        if (!interviewList.find(item => item.company === company)) {
            interviewList.push({
                company,
                title,
                type,
                salary,
                notes,
                status: 'Interview'
            });
        }

        rejectedList = rejectedList.filter(item => item.company !== company);

        if (currentStatus === 'rejected-filter-btn') renderFiltered(rejectedList);
        if (currentStatus === 'interview-filter-btn') renderFiltered(interviewList);

        calculateCount();
    }


    else if (event.target.classList.contains('rejected-btn')) {
        card.querySelector('.status').innerText = 'Rejected';

        if (!rejectedList.find(item => item.company === company)) {
            rejectedList.push({
                company,
                title,
                type,
                salary,
                notes,
                status: 'Rejected'
            });
        }

        interviewList = interviewList.filter(item => item.company !== company);

        if (currentStatus === 'interview-filter-btn') renderFiltered(interviewList);
        if (currentStatus === 'rejected-filter-btn') renderFiltered(rejectedList);

        calculateCount();
    }

    else if (event.target.classList.contains('btn-delete')) {
        interviewList = interviewList.filter(item => item.company !== company);
        rejectedList = rejectedList.filter(item => item.company !== company);

        card.remove();

        if (currentStatus === 'interview-filter-btn') renderFiltered(interviewList);
        if (currentStatus === 'rejected-filter-btn') renderFiltered(rejectedList);

        calculateCount();
    }
});

function renderFiltered(list) {
    filterSection.innerHTML = '';

    if (list.length === 0) {
        toggleEmptyState(list);
        return;
    } else {
        toggleEmptyState(list);
    }

    for (let item of list) {
        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8';
        div.innerHTML = `
            <div class="space-y-6">
                <div>
                    <p class="company text-4xl">${item.company}</p>
                    <p class="title">${item.title}</p>
                </div>

                <div class="flex gap-2">
                    <p class="type bg-gray-200 px-5">${item.type}</p>
                    <p class="salary bg-gray-200 px-5">${item.salary}</p>
                </div>

                <p class="status">${item.status}</p>
                <p class="notes">${item.notes}</p>

                <div class="flex gap-5">
                    <button class="interview-btn bg-green-200 px-4 py-2">Interview</button>
                    <button class="rejected-btn bg-red-200 px-4 py-2">Rejected</button>
                </div>
            </div>

            <div>
                <button class="btn-delete bg-red-200 text-red-600 px-4 py-2">Delete</button>
            </div>
        `;
        filterSection.appendChild(div);
    }

    updateRightTotal();
}

calculateCount();
