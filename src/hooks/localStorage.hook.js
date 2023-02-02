import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const storageName = 'books'


export const useLocalStorage = () => {

    const [books, setBooks] = useState()

    const setBook = (book) => {
        book.id = uuidv4()

        if (!localStorage.books) {
            localStorage.setItem(storageName, JSON.stringify([
                book
            ]))
        } else {
            const books = JSON.parse(localStorage.getItem(storageName))
            books.unshift(book)
            localStorage.setItem(storageName, JSON.stringify(books))
        }
    }

    const getBooks = useCallback(() => {
        const books = JSON.parse(localStorage.getItem(storageName))
        setBooks(books)
    }, [])

    const deleteBook = useCallback((id) => {
        const books = JSON.parse(localStorage.getItem(storageName))
        const deleted = books.findIndex(item => item.id === id)
        books.splice(deleted, 1)
        localStorage.setItem(storageName, JSON.stringify(books))
    }, [])

    return { setBook, getBooks, deleteBook, books }
}