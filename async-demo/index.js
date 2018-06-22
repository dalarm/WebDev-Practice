
console.log('Before');
//getUser(1, getRepositories);
/*
getUser(1, (user) => {
    // Get the Repos
    getRepositories(user.gitHubUsername, displayRepositories=> {
        getCommits(repo, displayCommits);
    });
});

*/

/*

getUser(1)
    .then (user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message));

*/
    // Async and Await approach
async function displayCommits() {
    try {
        const user = await getUser(1); 
        const repos = await getRepositories(user.gitHubUsername); 
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err){
        console.log('Error', err.message);
    }
}
displayCommits();

console.log('After');

/*

console.log('After');

function getRepositories(user){
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos){
    getCommits(repo, displayCommits);
}

function displayCommits(commits){
    console.log(commits);
}

*/

// Promise holds the eventual result of an asynchronous operation
// Pending --> Fulfilled.
//Error ---> Rejected.



//Synchronous Method ->

/*
console.log('Before');
const user = getUser(1);
const repos = getRepositories(user.gitHubUsername);
const commits = getCommits(repos[0]);
*/
// Callbacks
// Promises
// Async/await

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh'});
        }, 2000);
    })
}

function getRepositories(username) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
        }
        ,2000);
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit']);
        }
        ,2000);
    })
}
