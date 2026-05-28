# 🚀 Portofoliu Web Dinamic - Preda Iulia

Acesta este un proiect de semestru la materia Programare Web care demonstrează construirea unui portofoliu personalizat. Aplicația se conectează la API-ul public GitHub pentru a prelua și afișa automat repository-urile personale.

## 🛠️ Tehnologii Folosite
* **HTML5:** Structura semantică a paginii.
* **CSS3:** Design responsiv folosind CSS Grid și Flexbox.
* **JavaScript (Vanilla):** Cereri asincrone (Fetch API), filtrare în timp real și manipularea DOM-ului.

## ✨ Funcționalități Implementate
* **Integrare GitHub API:** Proiectele sunt încărcate dinamic.
* **Filtrare Avansată:** Excluderea repository-urilor de tip "fork".
* **Sortare:** Ordonare automată descrescător după data ultimei actualizări.
* **Căutare în timp real:** Utilizatorii pot filtra proiectele pe loc după nume sau limbaj de programare.
* **UX/UI & Error Handling:** Afișarea unui spinner de încărcare și tratarea prietenoasă a erorilor de rețea sau a limitelor de API.
* **Fallback System (Notă Cerință):** În cazul în care API-ul pică sau sunt mai puțin de 5 proiecte publice, se încarcă o listă de rezervă dintr-un fișier local `fallback.json`.

## 🚀 Instalare și Rulare Locală
1. Clonează acest repository:
   ```bash
   git clone [https://github.com/iiuliaa/Proiect-WEB-laborator.git](https://github.com/iiuliaa/Proiect-WEB-laborator.git)