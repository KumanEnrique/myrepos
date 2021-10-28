const containerHTML = document.getElementById("container");
(async()=>{
    let contenedorArray = []
    const resp = await fetch('https://api.github.com/users/KumanEnrique')
    const data = await resp.json()
    const amountRepos = data.public_repos
    console.log(amountRepos)
    const pagesNumber = Math.ceil(amountRepos  / 100 )
    console.log(pagesNumber)
    const URL_REPOS = data.repos_url
    for(let i = 1;i < pagesNumber + 1;i++){
        const resp2 = await fetch(URL_REPOS+`?per_page=${amountRepos}&page=${i}`)
        const data2 = await resp2.json()
        const arreglo = data2.map((elemento,index,array)=> {
            elemento.created_at = new Date(elemento.created_at)
            return elemento
        })
        contenedorArray = [...contenedorArray,...arreglo]
    }
    const sortArray = contenedorArray.sort((a, b) => b.created_at - a.created_at  )
    for (let i = 0;i<sortArray.length;i++){
        const {description,name,html_url,topics} = sortArray[i]
        containerHTML.innerHTML += `
            <div class="row mb-3">
                <div class="col-sm-6 mx-auto mb-3">
                    <div class="card text-center">
                        <div class="card-header">
                            <h3><a href="${html_url}">${name} </a></h3>
                        </div>
                        <div class="card-body">${description}</div>
                        <div class="card-footer">${topics}</div>
                    </div>
                </div>
            </div>
        `
    }
    

console.log(contenedorArray)
    console.log(contenedorArray.sort((a, b) => b.created_at - a.created_at  ) );
})();
