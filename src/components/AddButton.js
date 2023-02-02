import { useState } from "react"
import { Box, Button, Card, CardActions, CardContent, IconButton, Modal, TextField, Typography } from "@mui/material"
import Resizer from "react-image-file-resizer"
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import { useLocalStorage } from "../hooks/localStorage.hook"


const style = {
    card: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    input: {
        marginBottom: '10px'
    },
    coverBox: {
        width: 145,
        height: 205,
        margin: '',
        alignItems: 'centr',
        boxShadow: '0px 1px 1px 0px',
        borderRadius: '5px',
        marginTop: '10px'
    }
}

export const AddButton = ({ fetch }) => {

    const [author, setAuthor] = useState()
    const [name, setName] = useState()
    const [cover, setCover] = useState()
    const [errorAuthor, setErrorAuthor] = useState(false)
    const [errorName, setErrorName] = useState(false)

    const { setBook } = useLocalStorage()

    const createHandler = () => {
        if (author && name) {
            setBook({ author, name, cover })
            fetch()
            setAuthor()
            setName()
            setCover()
            setErrorAuthor(false)
            setErrorName(false)
            handleClose()
        } else {
            !author && setErrorAuthor(true)
            !name && setErrorName(true)
        }
    }

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                145,
                205,
                "JPEG",
                100,
                0,
                (uri) => { resolve(uri) },
                "base64",
                145,
                205
            )
        })

    const uploadImage = async (event) => {
        const image = await resizeFile(event.target.files[0])
        setCover(image)
    }

    return (
        <>
            <Button variant={'contained'} onClick={handleOpen}>Добавить</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style.card}>
                    <CardContent style={style.cardContent}>
                        <Typography variant={'h4'} style={{ marginBottom: '20px' }}>Добавить книгу</Typography>
                        <TextField
                            value={author ? author : ''}
                            onChange={(event) => {
                                setAuthor(event.target.value)
                                setErrorAuthor(false)
                            }}
                            helperText={author === '' || errorAuthor ? 'Надо автора, дружище' : ''}
                            error={author === '' || errorAuthor}
                            label={'Автор'}
                            id="author"
                            type="text"
                            name="author"
                            style={style.input}
                        />
                        <TextField
                            value={name ? name : ''}
                            onChange={(event) => {
                                setName(event.target.value)
                                setErrorName(false)
                            }}
                            helperText={name === '' || errorName ? 'Без названия нельзя, приятель' : ''}
                            error={name === '' || errorName}
                            label={'Название'}
                            id="name"
                            type="text"
                            name="name"
                        />
                        <Box sx={style.coverBox} style={{ backgroundImage: `url(${cover})` }}>
                            <IconButton variant={cover ? "contained" : "outlined"} component="label" >
                                <AddToPhotosIcon fontSize="large" />
                                <input
                                    hidden
                                    accept="image/*"
                                    multiple
                                    type="file"
                                    onChange={uploadImage}
                                />
                            </IconButton>
                            {!cover && <Typography style={{ margin: '0 10px', textAlign: 'center' }}>Тут должна быть обложка</Typography>}
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={createHandler}
                            variant={'contained'}
                            type={'submit'}
                            style={{ marginRight: 10 }}
                        >
                            Создать
                        </Button>
                        <Button
                            variant={'outlined'}
                            type={'button'}
                            onClick={handleClose}
                        >
                            Закрыть
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </>
    )
}