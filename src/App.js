import './App.css'
import { Container } from '@mui/system'
import { ListComponent } from './components/ListComponent'
import { AddButton } from "./components/AddButton"
import { useEffect } from "react"
import { useLocalStorage } from "./hooks/localStorage.hook"
import { Grid } from '@mui/material'


function App() {

  const { getBooks, books } = useLocalStorage()

  useEffect(() => {
    getBooks()
  }, [getBooks])

  return (
    <Container style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', margin: '20px 0' }}>
      <AddButton fetch={getBooks} />
      <Grid container spacing={2} style={{ justifyContent: 'space-around', marginTop: '15px' }}>
        {books && books.map(el => <ListComponent fetch={getBooks} key={el.id} book={el} />)}
      </Grid>
    </Container>
  )
}

export default App
