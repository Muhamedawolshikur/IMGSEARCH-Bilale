async function searchImages() {
    const query = document.getElementById('searchInput').value;
    const grid = document.getElementById('resultsGrid');
    const loader = document.getElementById('loader');

    if (!query) return;

    grid.innerHTML = '';
    loader.classList.remove('hidden');

    try {
        // Direct fetch with a simple proxy to bypass CORS
        const target = `https://microsoftdeepsearch.anshppt19.workers.dev/?search=${encodeURIComponent(query)}&state=image`;
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(target)}`);
        const json = await response.json();
        const data = JSON.parse(json.contents);

        loader.classList.add('hidden');

        if (data.status === "success" && data.images.results.length > 0) {
            data.images.results.forEach((imgUrl, index) => {
                const cleanUrl = imgUrl.replace(/&amp;/g, '&');
                const card = `
                    <div class="img-card p-2 animate-in">
                        <div class="h-48 overflow-hidden rounded-lg">
                            <img src="${cleanUrl}" class="w-full h-full object-cover">
                        </div>
                        <div class="mt-2 flex justify-between items-center px-1 text-[10px]">
                            <span class="text-[#00ffcc]">ID: B-0${index+1}</span>
                            <a href="${cleanUrl}" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                        </div>
                    </div>
                `;
                grid.innerHTML += card;
            });
        }
    } catch (err) {
        loader.classList.add('hidden');
        console.error("Fetch Error:", err);
    }
}

// Enter key trigger
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchImages();
});
