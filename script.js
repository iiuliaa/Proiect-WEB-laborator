// Setăm username-ul tău real de GitHub
const GITHUB_USERNAME = 'iiuliaa';
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Luăm elementele din HTML cu care vom interacționa
const repoContainer = document.getElementById('repo-container');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
const searchInput = document.getElementById('search-input');

let allProjects = []; // Aici vom păstra toate proiectele pentru a le putea căuta/filtra

// Funcția care aduce datele de pe GitHub
async function fetchProjects() {
    try {
        // Arătăm spinner-ul de încărcare (Cerință Medie: UX)
        loadingSpinner.style.display = 'block';
        repoContainer.innerHTML = '';
        errorMessage.style.display = 'none';

        // Facem cererea asincronă către GitHub (Cerință Obligatorie)
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error('Nu am putut accesa API-ul GitHub.');
        }

        let repos = await response.json();

        // Excludem proiectele care sunt Fork-uri (Cerință Medie)
        repos = repos.filter(repo => repo.fork === false);

        // Dacă ai mai puțin de 5 proiecte, folosim datele de rezervă (Nota din cerință)
        if (repos.length < 5) {
            displayError("Notă: Sunt mai puțin de 5 proiecte pe GitHub. Încărcăm lista de rezervă...");
            await loadFallbackData();
            return;
        }

        // Ordonăm proiectele descrescător după data ultimei actualizări (Cerință Medie)
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        allProjects = repos;
        renderProjects(allProjects);

    } catch (error) {
        // Tratarea erorilor prietenoasă (Cerință Medie)
        displayError("Ups! Nu am putut încărca proiectele momentan. Folosim datele de rezervă.");
        await loadFallbackData();
    } finally {
        // Ascundem spinner-ul la final
        loadingSpinner.style.display = 'none';
    }
}

// Funcția care creează "cardurile" pe ecran (Cerință Obligatorie)
function renderProjects(projects) {
    repoContainer.innerHTML = '';

    if (projects.length === 0) {
        repoContainer.innerHTML = '<p>Nu a fost găsit niciun proiect conform căutării tale.</p>';
        return;
    }

    projects.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'card';

        // Dacă nu ai descriere la proiect pe GitHub, punem un text default
        const description = repo.description ? repo.description : "Fără descriere disponibilă.";
        // Dacă limbajul nu e detectat, scriem Nespecificat
        const language = repo.language ? repo.language : "Nespecificat";

        card.innerHTML = `
            <h3>📦 ${repo.name}</h3>
            <p>${description}</p>
            <div class="stats">
                <span>💻 ${language}</span>
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🍴 ${repo.forks_count}</span>
            </div>
            <a href="${repo.html_url}" target="_blank" class="btn">Vezi pe GitHub</a>
        `;

        repoContainer.appendChild(card);
    });
}

// Funcție pentru afișarea erorilor
function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Încărcarea datelor din fișierul local JSON (Cerința specială de la baza paginii 1)
async function loadFallbackData() {
    try {
        const response = await fetch('fallback.json');
        const fallbackData = await response.json();
        allProjects = fallbackData;
        renderProjects(allProjects);
    } catch (err) {
        displayError("Eroare: Nici datele de rezervă nu au putut fi încărcate.");
    }
}

// Căutare și filtrare în timp real (Cerință Medie)
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredProjects = allProjects.filter(repo => {
        const repoName = repo.name.toLowerCase();
        const repoLang = repo.language ? repo.language.toLowerCase() : "";
        return repoName.includes(searchTerm) || repoLang.includes(searchTerm);
    });

    renderProjects(filteredProjects);
});

// Pornim tot procesul
fetchProjects();