const searchForm = document.forms[0]
let currPage = 1
searchForm.addEventListener("submit", e => {
    e.preventDefault()
    currPage = 1
    picRequest(currPage)
})

const picRequest = function (page) {
    console.log("Current page:",currPage)
    const order = document.querySelector('input[name="popular_latest"]:checked').value;
    let query = `https://pixabay.com/api/?key=23641840-4160a4a239d12c5dd6197d014&orientation=horizontal&order=${order}&page=${page}&per_page=12&q=`
    searchForm[0].value.trim().split(" ").forEach(e => {
        query += e + "+"
    })
    query = query.slice(0, -1)

    console.log(query)
    fetch(query)
        .then(response => response.json())
        .then(response2 => {
            const queryResult = response2.hits
            const totalPages = Math.ceil(response2.totalHits / 12)
            // Pagination
            // Блин, наконец-то. Это, наверное, был первый случай где я зашел в тупик
            const paginationWrapper = document.getElementById("pagination")
            paginationWrapper.innerHTML = ""
            const pagesArr = []
            // Previous button
            if (!(totalPages <= 1)) {
                const previous = document.createElement("div")
                previous.className = "pagButton"
                previous.setAttribute("id", "previous")
                previous.innerHTML = "&laquo;"
                paginationWrapper.appendChild(previous)
                previous.addEventListener("click", e => {
                    if (currPage == 1) return
                    currPage--
                    picRequest(currPage)
                })
            }
            // Pages
            if (totalPages <= 9) {
                for (let i = 1; i <= 9, i <= totalPages;) {
                    const page = document.createElement("div")
                    page.className = "pagButton"
                    page.innerText = i
                    pagesArr.push(page)
                    i++
                }
            }
            else if (currPage <= 5) {
                for (let i = 1; i <= 9;) {
                    const page = document.createElement("div")
                    page.className = "pagButton"
                    page.innerText = i
                    pagesArr.push(page)
                    i++
                }
                const lastTriple = document.createElement("div")
                lastTriple.innerText = "..."
                pagesArr.splice(7, 1, lastTriple)

                const lastPage = document.createElement("div")
                lastPage.className = "pagButton"
                lastPage.innerText = `${totalPages}`
                pagesArr[8] = lastPage
            }
            else if (currPage + 4 >= totalPages) {
                for (let i = 0; i < 9;) {
                    const page = document.createElement("div")
                    page.className = "pagButton"
                    page.innerText = totalPages - 8 + i
                    pagesArr.push(page)
                    i++
                }

                const firstPage = document.createElement("div")
                firstPage.className = "pagButton"
                firstPage.innerText = `1`
                pagesArr.splice(0, 1, firstPage)

                const firstTriple = document.createElement("div")
                firstTriple.innerText = "..."
                pagesArr.splice(1, 1, firstTriple)
            }
            else {
                for (let i = 0; i < 9;) {
                    const page = document.createElement("div")
                    page.className = "pagButton"
                    page.innerText = currPage - 4 + i
                    pagesArr.push(page)
                    i++
                }

                const firstPage = document.createElement("div")
                firstPage.className = "pagButton"
                firstPage.innerText = `1`
                pagesArr.splice(0, 1, firstPage)



                const firstTriple = document.createElement("div")
                firstTriple.innerText = "..."
                pagesArr.splice(1, 1, firstTriple)
                const lastTriple = document.createElement("div")
                lastTriple.innerText = "..."
                pagesArr.splice(7, 1, lastTriple)

                const lastPage = document.createElement("div")
                lastPage.className = "pagButton"
                lastPage.innerText = `${totalPages}`
                pagesArr[8] = lastPage
            }




            pagesArr.forEach(e => {
                paginationWrapper.appendChild(e)
                if (e.innerText == currPage) e.classList.add("active")
                if (!isNaN(parseInt(e.innerText))) {
                    e.addEventListener("click", () => {
                        currPage = parseInt(e.innerText)
                        picRequest(currPage)
                    })
                }
            })
            // if (currPage >= 4) {
            //     const page = document.createElement("div")
            //     page.className = "pagButton"
            //     page.innerText = `1`
            //     paginationWrapper.appendChild(page)
            //     page.addEventListener("click", () => {
            //         currPage = page.innerText
            //         picRequest(currPage)
            //     })
            // }
            // if (currPage >= 5) {
            //     const triple = document.createElement("div")
            //     triple.innerText = "..."
            //     paginationWrapper.appendChild(triple)
            // }
            // for (let i = 1; i <= 5;) {
            //     console.log(i)
            //     if(currPage>=totalPages-4){
            //         console.log("test")
            //         i = totalPages-currPage
            //     }
            //     if (currPage - 3 + i < 1) { i++; continue }

            //     else {
            //         const page = document.createElement("div")
            //         page.className = "pagButton"
            //         page.innerText = `${currPage - 3 + i}`

            //         if (page.innerText == currPage) page.classList.add("active")

            //         paginationWrapper.appendChild(page)
            //         page.addEventListener("click", () => {
            //             currPage = page.innerText
            //             picRequest(currPage)
            //         })

            //     }

            // if (!(currPage - 3 + i >= totalPages)) {
            //     if (i == 5) {
            //         const triple = document.createElement("div")
            //         triple.innerText = "..."
            //         paginationWrapper.appendChild(triple)
            //         const page = document.createElement("div")
            //         page.className = "pagButton"
            //         page.innerText = `${totalPages}`
            //         paginationWrapper.appendChild(page)
            //         page.addEventListener("click", () => {
            //             currPage = page.innerText
            //             picRequest(currPage)
            //         })
            //     }
            // }

            // i++



            //     console.log(currPage)
            //    i++

            //     if(currPage >4){
            //         const triple = document.createElement("div")
            //         triple.innerText = "..."
            //         paginationWrapper.appendChild(triple)

            //     }
            //     if (i == 4) {
            //         const triple = document.createElement("div")
            //         triple.innerText = "..."
            //         paginationWrapper.appendChild(triple)
            //         const page = document.createElement("div")
            //         page.className = "pagButton"
            //         page.innerText = `${totalPages}`
            //         paginationWrapper.appendChild(page)
            //         break
            //     }
            //     const page = document.createElement("div")
            //     page.className = "pagButton"
            //     page.innerText = `${i}`
            //     paginationWrapper.appendChild(page)
            //     i++
            // }

            // next button
            if (!(totalPages <= 1)) {
                const next = document.createElement("div")
                next.className = "pagButton"
                next.setAttribute("id", "next")
                next.innerHTML = "&raquo;"
                paginationWrapper.appendChild(next)
                next.addEventListener("click", e => {
                    if (currPage == totalPages) return
                    currPage++
                    picRequest(currPage)
                })
            }


            
            const wrapper = document.getElementById("resultContainer")
            wrapper.innerHTML = ""

            queryResult.forEach(e => {
                const picPreview = document.createElement("div")
                picPreview.className = "preview"
                picPreview.style.backgroundImage = `url(${e.webformatURL})`
                picPreview.onclick = () => {
                    const bigPicture = document.createElement("div")
                    bigPicture.className = "bigPicture bigPicture_hidden"
                    bigPicture.innerHTML = ``
                    document.body.appendChild(bigPicture)
                    // Плавная анимация
                    requestAnimationFrame(() => {
                        bigPicture.classList.remove("bigPicture_hidden")
                    })

                    bigPicture.addEventListener("click", e => {
                        
                        if (e.target == bigPicture) bigPicture.remove()
                    })
                }
                wrapper.appendChild(picPreview)
            });
        })
}
window.localStorage.setItem("1","cat")
window.localStorage.setItem("1","dog")
console.log(window.localStorage)

