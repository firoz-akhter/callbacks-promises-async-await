// get btn and container div from html DOM
const btn = document.querySelector(".click-me");
const container = document.querySelector(".container");



// Task 2: Callback 
// Task 2 & bullet point second
function delay(callback) {
    setTimeout(callback, 5000);
}

// Task 2 & bullet point third
btn.addEventListener('click', function() {
    delay(function() {
        container.innerText = 'Callback executed after 5 seconds';
    });
});

// Task 3: Fetch Data from API
btn.addEventListener('click', function() {
    delay(function() {
        fetch('https://dummyjson.com/posts')
            .then(response => response.json())
            .then(data => {
                let posts = data.posts;
                let result = "<h2>All Posts Fetched</h2>";
                posts.forEach(post => {
                    result += `<div class="post"><span class="title">${post.title} &nbsp</span><span><i class="fa-solid fa-thumbs-up"></i>${post.reactions.likes}</span></div>`;
                });
                container.innerHTML = result;
            })
            .catch(error => console.error('Something went wrong while fetching data:', error));
    });
});