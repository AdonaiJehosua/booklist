import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useLocalStorage } from "../hooks/localStorage.hook"

const style = {
    coverContainer: {
        width: 145,
        height: 205,
        alignItems: 'center',
        display: 'flex',
        margin: 'auto'
    },
    cover: {
        boxShadow: '0px 1px 1px 0px',
        borderRadius: '5px',
        maxHeight: '205px'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    cardContent: {
        width: '250px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    authorName: {
        textAlign: 'center',
        boxShadow: '0px 1px 1px 0px',
        borderRadius: '5px',
        width: '90%',
        margin: '0 auto 5px auto',
        textWeigth: 'bold'
    }
}

export function ListComponent({ book, fetch }) {

    const { deleteBook } = useLocalStorage()

    const handleDelete = () => {
        deleteBook(book.id)
        fetch()
    }

    return (
        <Grid item>
            <Card style={style.card}>
                <CardContent style={style.cardContent}>
                    <Box style={{marginBottom: '10px', width: '100%'}}>
                        <Box style={style.authorName}>
                            {book.author}
                        </Box>
                        <Box style={style.authorName}>
                            <span style={{ fontWeight: 'bold' }}>{book.name}</span>
                        </Box>
                    </Box>
                    <Box sx={style.coverContainer}>
                        {book.cover ?
                            <CardMedia
                                style={style.cover}
                                component={'img'}
                                image={`${book.cover}`}
                                alt={'cover'}
                            />
                            : <Box>
                                <Typography sx={{ textAlign: 'center' }}>Здесь могла бы быть обложка</Typography>
                            </Box>}
                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleDelete}>Удалить</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}