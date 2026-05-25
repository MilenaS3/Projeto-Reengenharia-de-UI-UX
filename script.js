const cardsContainer = document.getElementById('cards-container');
let cards = Array.from(document.querySelectorAll('.card'));

let currentOS = 'all';
let currentVersion = 'all';

function applyFilters() {
  cards.forEach(card => {
    const cardOS = card.getAttribute('data-os');
    const cardVersion = card.getAttribute('data-version');
    
    const matchOS = (currentOS === 'all' || cardOS === currentOS);
    const matchVersion = (currentVersion === 'all' || cardVersion === currentVersion);
    
    if (matchOS && matchVersion) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function applySort() {
  const sortOrder = document.getElementById('sort-select').value;
  
  cards.sort((a, b) => {
    const revA = parseInt(a.getAttribute('data-revision'));
    const revB = parseInt(b.getAttribute('data-revision'));
    
    if (sortOrder === 'desc') {
      return revB - revA; 
    } else {
      return revA - revB; 
    }
  });

  cards.forEach(card => cardsContainer.appendChild(card));
}

document.querySelectorAll('#os-filters .filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('#os-filters .filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentOS = e.target.getAttribute('data-os');
    applyFilters();
  });
});

document.querySelectorAll('#version-filters .filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('#version-filters .filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentVersion = e.target.getAttribute('data-version');
    applyFilters();
  });
});

document.getElementById('sort-select').addEventListener('change', applySort);

applySort();

const copyBtns = document.querySelectorAll('.btn-copy');

copyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.getAttribute('data-url');
    navigator.clipboard.writeText(url).then(() => {
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<span style="font-size: 0.75rem; font-weight:bold;">Copiado!</span>';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
      }, 2000);
    });
  });
});