const openModalBtn = document.querySelector('.open-modal')
const modalScreen = document.querySelector('.modal-screen')
const modal = document.querySelector('.modal')
const closeModalXBtn = document.querySelector('.x-btn')
const closeModalBtn = document.querySelector('.close')
const createBookBtn = document.querySelector('.continue')
const titleInput = document.querySelector('.title-input')
const authorInput = document.querySelector('.author-input')
const releaseInput = document.querySelector('.release-input')
const tbody = document.querySelector('tbody')
const booksCountElement = document.querySelector('.books-count')



let books = []



function openModal() {
    modalScreen.classList.remove('hidden')
}



function closeModal() {
    modalScreen.classList.add('hidden')

    titleInput.value = ""
    authorInput.value = ""
    releaseInput.value = ""
}



document.addEventListener('keydown', (evt) => {
    if(evt.key === "Escape") {
        closeModal()
    }

    if(evt.key === "Enter") {
        createBook()
    }
})



document.addEventListener('click', (evt) => {
    if(!modal.contains(evt.target) && !openModalBtn.contains(evt.target)) {
        closeModal()
    }
})



function createBook() {
    let title = titleInput.value
    let author = authorInput.value
    let release = releaseInput.value

    if(title !== "" && author !=="" && release !== "") {
        let newBook = {
            title,
            author,
            release
        }

        books.push(newBook)

        closeModal()

        setDataToLocalstorage(books)

        showBooks()


        titleInput.value = ""
        authorInput.value = ""
        releaseInput.value = ""
    }

}




function setDataToLocalstorage(data) {
    localStorage.setItem('books', JSON.stringify(data))
}



function getDataFromLocalstorage() {
    let booksData = JSON.parse(localStorage.getItem('books'))

    if(booksData) {
        books = booksData
        showBooks()
    }
}

getDataFromLocalstorage()



function showBooks() {

    tbody.innerHTML = ""

    books.forEach((book) => {
        tbody.insertAdjacentHTML(
            'beforeend',
            `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.release}</td>
            </tr>

            `
        )
    })


  booksCountElement.textContent = books.length

}





openModalBtn.addEventListener('click', openModal)
closeModalXBtn.addEventListener('click', closeModal)
closeModalBtn.addEventListener('click', closeModal)
createBookBtn.addEventListener('click', createBook)

