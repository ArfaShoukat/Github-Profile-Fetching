


var input = document.querySelector('input')
var btn = document.querySelector('button')
var card = document.querySelector('.card')

var repos_container = document.querySelector('.repositories')

async function user (username) {
    var resp = await fetch(`https://api.github.com/users/${username}`)
    var respData = await resp.json()
    return respData
   
}


async function add_repo () {
    var reposData = await repos(input.value)
    console.log(reposData);
   

    repos_container.innerHTML = reposData.map(repo => {
        return `
            // <div class="card">
            //     <h2>${repo.name}</h2>
            //     <a href="${repo.clone_url}" target="_blank">Take a look at this repo ></a>
            // </div>
        `
    }).join('')
}

btn.addEventListener('click', async () => {
    var input_val = input.value
    var search_result = await user(input_val)

    add_repo()

    if (!search_result.login) {
        alert('No user found!')
    } else {
        card.innerHTML = `
            <div class="avatar">
                <img src="${search_result.avatar_url}" alt="">
            </div>
            <div class="info">
                <h2>${search_result.name}</h2>
                <p>${search_result.login}</p>
                <div class="follow-info">
                    <div class="single">
                        <span>${search_result.followers}</span>
                        <span>Followers</span>
                    </div>
                    <div class="single">
                        <span>${search_result.following}</span>
                        <span>Following</span>
                    </div>
                </div>
                <div class="single">
                    <span>${search_result.public_repos}</span>
                    <span>Repos</span>
                </div>
            </div>
            // <a href="${search_result.html_url}" target="_blank">Visit Github Profile ></a>
        `
    }
})
