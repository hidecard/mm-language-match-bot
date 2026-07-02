let currentSection = 'users';

document.addEventListener('DOMContentLoaded', () => {
    showSection('users');
});

async function showSection(section) {
    currentSection = section;
    updateNavigation(section);
    const title = section.charAt(0).toUpperCase() + section.slice(1);
    document.getElementById('section-title').innerText = title;
    
    const actionButtons = document.getElementById('action-buttons');
    actionButtons.innerHTML = '';
    
    if (section === 'vocabularies' || section === 'phrases') {
        actionButtons.innerHTML = `<button onclick="openAddModal()" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            <i class="fas fa-plus mr-2"></i> Add New ${title.slice(0, -1)}
        </button>`;
    }

    await loadData(section);
}

function updateNavigation(section) {
    const navs = ['users', 'vocabularies', 'phrases', 'sessions', 'queue'];
    navs.forEach(nav => {
        const el = document.getElementById(`nav-${nav}`);
        if (nav === section) {
            el.classList.add('bg-indigo-800');
        } else {
            el.classList.remove('bg-indigo-800');
        }
    });
}

async function loadData(section) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = '<div class="p-10 text-center text-gray-500"><i class="fas fa-spinner fa-spin fa-3x mb-4"></i><p>Loading data...</p></div>';

    try {
        const response = await fetch(`/api/admin/${section}`);
        const data = await response.json();
        
        if (data.length === 0) {
            contentArea.innerHTML = `<div class="p-10 text-center text-gray-500">No data found in ${section}.</div>`;
            return;
        }

        renderTable(section, data);
    } catch (error) {
        contentArea.innerHTML = `<div class="p-10 text-center text-red-500">Error loading data: ${error.message}</div>`;
    }
}

function renderTable(section, data) {
    const contentArea = document.getElementById('content-area');
    let html = `<table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>`;
    
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        html += `<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${header.replace('_', ' ')}</th>`;
    });
    html += `<th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead>
        <tbody class="bg-white divide-y divide-gray-200">`;

    data.forEach(item => {
        html += `<tr>`;
        headers.forEach(header => {
            let val = item[header];
            if (typeof val === 'boolean') val = val ? '✅' : '❌';
            html += `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${val !== null ? val : '-'}</td>`;
        });
        
        const id = item.id || item.telegram_id;
        html += `<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button onclick="editItem('${section}', ${id})" class="text-indigo-600 hover:text-indigo-900 mr-3"><i class="fas fa-edit"></i></button>
            <button onclick="deleteItem('${section}', ${id})" class="text-red-600 hover:text-red-900"><i class="fas fa-trash"></i></button>
        </td></tr>`;
    });

    html += `</tbody></table>`;
    contentArea.innerHTML = html;
}

function openModal(title, body, onSave) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-body').innerHTML = body;
    document.getElementById('modal-submit').onclick = onSave;
    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

async function deleteItem(section, id) {
    if (confirm(`Are you sure you want to delete this ${section.slice(0, -1)}?`)) {
        try {
            const response = await fetch(`/api/admin/${section}/${id}`, { method: 'DELETE' });
            const result = await response.json();
            alert(result.message);
            loadData(section);
        } catch (error) {
            alert('Error deleting item: ' + error.message);
        }
    }
}

// Add/Edit logic would go here, simplified for this demonstration
function openAddModal() {
    if (currentSection === 'vocabularies') {
        const body = `
            <div class="grid grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-gray-700">Language</label><input id="lang" class="mt-1 block w-full border rounded-md p-2"></div>
                <div><label class="block text-sm font-medium text-gray-700">Level</label><input id="level" class="mt-1 block w-full border rounded-md p-2"></div>
                <div><label class="block text-sm font-medium text-gray-700">Word</label><input id="word" class="mt-1 block w-full border rounded-md p-2"></div>
                <div><label class="block text-sm font-medium text-gray-700">Reading</label><input id="reading" class="mt-1 block w-full border rounded-md p-2"></div>
                <div class="col-span-2"><label class="block text-sm font-medium text-gray-700">Meaning</label><input id="meaning" class="mt-1 block w-full border rounded-md p-2"></div>
                <div><label class="flex items-center"><input type="checkbox" id="premium" class="mr-2"> Is Premium</label></div>
            </div>
        `;
        openModal('Add Vocabulary', body, async () => {
            const data = {
                language: document.getElementById('lang').value,
                level: document.getElementById('level').value,
                word: document.getElementById('word').value,
                reading: document.getElementById('reading').value,
                meaning: document.getElementById('meaning').value,
                is_premium: document.getElementById('premium').checked
            };
            await saveData('vocabularies', data);
        });
    } else if (currentSection === 'phrases') {
        const body = `
            <div class="grid grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-gray-700">Language</label><input id="lang" class="mt-1 block w-full border rounded-md p-2"></div>
                <div><label class="block text-sm font-medium text-gray-700">Level</label><input id="level" class="mt-1 block w-full border rounded-md p-2"></div>
                <div class="col-span-2"><label class="block text-sm font-medium text-gray-700">Phrase</label><input id="phrase" class="mt-1 block w-full border rounded-md p-2"></div>
                <div class="col-span-2"><label class="block text-sm font-medium text-gray-700">Meaning</label><input id="meaning" class="mt-1 block w-full border rounded-md p-2"></div>
                <div class="col-span-2"><label class="block text-sm font-medium text-gray-700">Context</label><input id="context" class="mt-1 block w-full border rounded-md p-2"></div>
                <div><label class="flex items-center"><input type="checkbox" id="premium" class="mr-2"> Is Premium</label></div>
            </div>
        `;
        openModal('Add Phrase', body, async () => {
            const data = {
                language: document.getElementById('lang').value,
                level: document.getElementById('level').value,
                phrase: document.getElementById('phrase').value,
                meaning: document.getElementById('meaning').value,
                context: document.getElementById('context').value,
                is_premium: document.getElementById('premium').checked
            };
            await saveData('phrases', data);
        });
    }
}

async function saveData(section, data) {
    try {
        const response = await fetch(`/api/admin/${section}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result.message);
        closeModal();
        loadData(section);
    } catch (error) {
        alert('Error saving data: ' + error.message);
    }
}
