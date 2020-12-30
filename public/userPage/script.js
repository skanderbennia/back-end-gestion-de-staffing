// const button = document.getElementById('button');



// const getData = () =>{
//     axios.get('localhost:3000/api/v1/users').then(res =>{
//         console.log(res)
//     })
// }
// button.addEventListener('click', getData);
let tableUser 
let button = document.getElementById('button')
const getData= () =>{
    axios.get('http://localhost:3000/api/v1/users').then(res =>{
        console.log(res.data.data.users)
        tableUser = res.data.data.users
      })
    
}

button.addEventListener('click',getData)