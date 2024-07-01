// get btn and container div from html DOM
const btn = document.querySelector(".click-me");
const container = document.querySelector(".container");


// Task 2: Promise Implementation
function fetchData(url, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Operation timed out'));
        }, timeout);

        fetch(url)
            .then(response => {
                clearTimeout(timer);
                if (!response.ok) {
                    reject(new Error('Network response was not ok'));
                }
                return response;
            })
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
}

btn.addEventListener('click', function() {
    // const container = document.getElementById('message');
    container.innerHTML = 'Loading...';

    fetchData('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => {
            let posts = data.posts;
                let result = "<h2>All Posts Fetched</h2>";
                posts.forEach(post => {
                    result += `<div class="post"><span class="title">${post.title} &nbsp</span><span><i class="fa-solid fa-thumbs-up"></i>${post.reactions.likes}</span></div>`;
                });
                container.innerHTML = result;
        })
        .catch(error => {
            container.innerHTML = `Something went wrong while fetching data or resolving promises: ${error.message}`;
        });
});