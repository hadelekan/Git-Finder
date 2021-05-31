import { url, login, password, request } from './constant.js'
import UserMiniCard from '../components/UserMiniCard.js'
import UserCard from '../components/UserCard.js'
import RepoList from '../components/RepoList.js'
import {Query} from './utils.js'


const getUser = () => {

    const user = Query().find(i => i.username)
    fetch(url, {
        method: 'POST',
        headers: { 'Authorization': 'Basic ' + btoa(`${login}:${password}`) },
        body: JSON.stringify(request(user.username.replaceAll('"', '')))
    })
        .then(response => response.json())
        .then(data => { showProfile(data) });
}

const findUser = (e) => {

    e.preventDefault();

    document.querySelector('.loader').classList.remove('hidden')

    const username = document.querySelector('#username').value.trim()

    const q = `{
       repositoryOwner(login: "${username}") {
            avatarUrl
        }
    }`

    fetch(url, {
        method: 'POST',
        headers: { 'Authorization': 'Basic ' + btoa(`${login}:${password}`) },
        body: JSON.stringify({ query: q })
    })
    .then(response => response.json())
    .then(json => {
        if (json.data.repositoryOwner?.avatarUrl) {

            location.href = `/profile.html?username=${username}`

        } else {
            document.querySelector('.loader').classList.add('hidden')
            document.querySelector('.alert-error').classList.add('error-transition')

            setTimeout(() => {
                document.querySelector('.alert-error').classList.remove('error-transition')
            },7000)
        }
    });
}

const showProfile = (json) => {

    if (!json.data.repositoryOwner) {
        document.querySelector('#notFound').classList.remove('hidden')
         document.querySelector('#component').classList.add('hidden')
        return
    }
    
    document.querySelector('#notFound').classList.add('hidden')
    document.querySelector('#component').classList.remove('hidden')
    document.querySelector('#avatar-nav').innerHTML = `<img src="${json.data.repositoryOwner.avatarUrl}">`
    
    document.querySelector('#repo-badge').innerHTML = `<span class="badge">${json.data.repositoryOwner.repositories.totalCount}</span>`
    document.querySelector('[data-component=user-mini-card]').appendChild(UserMiniCard(json.data.repositoryOwner))
    document.querySelector('[data-component=user-card]').appendChild(UserCard(json.data.repositoryOwner))
    document.querySelector('[data-component=repo-list]').appendChild(RepoList(json.data.repositoryOwner.repositories.nodes))
    console.log(json.data.repositoryOwner) 
}
window.onscroll = () => {
    if(window.pageYOffset > 380){
        document.querySelector('[data-component=user-mini-card]').classList.remove('opacity-0')
    }else{
        document.querySelector('[data-component=user-mini-card]').classList.add('opacity-0')
    }
}
window.getUser = getUser
window.findUser = findUser