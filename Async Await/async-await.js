// get btn and container div from html DOM
const btn = document.querySelector(".click-me");
const container = document.querySelector(".container");

// Task 2: fetch data with timeout functionality
async function fetchData(url, timeout = 5000) {

    const fetchPromise = fetch(url);
    const timeoutPromise = new Promise((resolve, reject) =>
        setTimeout(() => {
            reject(new Error('Operation ran out of time...'));
        }, timeout)
    );

    try {
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        if (!response.ok) {
            throw new Error('Something wrong with network response...');
        }
        return response;
    } catch (error) {
        throw error;
    }
}

// event listener on btn click, Async/Await functionality to fetch data with above defined func
btn.addEventListener('click', async function() {
    container.innerHTML = 'Loading...';

    try {
        let data = await fetchData('https://dummyjson.com/posts');
        data = await data.json();

        let posts = data.posts;
        let result = '<h2>All Fetched Posts</h2>';
        posts.forEach(post => {
            result += `<div class="post"><span class="title">${post.title} &nbsp</span><span><i class="fa-solid fa-thumbs-up"></i>${post.reactions.likes}</span></div>`;
        });
        container.innerHTML = result;
    } catch (error) {
        container.innerHTML = `Something went wrong while fetching with Async/Await: ${error.message}`;
    }
});