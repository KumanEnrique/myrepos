(async()=>{
    const resp = await fetch('https://api.github.com/users/KumanEnrique')
    const data = await resp.json()
    const amountRepos = data.public_repos
    const URL_REPOS = data.repos_url
    //const resp2 = await fetch(URL_REPOS+"?per_page=123&page=2")
    const resp2 = await fetch(URL_REPOS+"?per_page=123&page=2")
    const data2 = await resp2.json()
    //console.log(data2)
    //const a = data2.map((elemento)=> elemento.created_at = new Date(elemento.created_at).toLocaleDateString() )
    const arreglo = data2.map((elemento,index,array)=> {
        elemento.created_at = new Date(elemento.created_at)
        return elemento
    })
    console.log(arreglo.sort((a, b) => b.created_at - a.created_at  ) );
})();
