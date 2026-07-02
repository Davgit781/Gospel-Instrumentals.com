
let beatsData = [];

fetch('beats.json')
  .then(response => response.json())
  .then(data => {
    beatsData = data;
  })
  .catch(error => console.log('Error loading beats:', error));

function searchBeats() {
  const input = document.getElementById('searchInput');
  const resultsDiv = document.getElementById('searchResults');
  
  if (!input || !resultsDiv) return;
  
  const query = input.value.toLowerCase().trim();
  
  if (query === '') {
    resultsDiv.innerHTML = '';
    return;
  }
  
  const filtered = beatsData.filter(beat => 
    beat.title.toLowerCase().includes(query) ||
    (beat.tags && beat.tags.toLowerCase().includes(query))
  );
  
  if (filtered.length === 0) {
    resultsDiv.innerHTML = '<p>No instrumentals found 🙏</p>';
    return;
  }
  
  resultsDiv.innerHTML = filtered.map(beat => `
    <div class="search-result">
      <h3>${beat.title}</h3>
      <a href="${beat.link}" target="_blank">Listen on ${beat.platform}</a>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keyup', searchBeats);
  }
});