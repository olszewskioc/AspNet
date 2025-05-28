import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from '@mui/material/Tooltip';

const BlocoNotas = () => {
    const [notas, setNotas] = useState([]);
    const input = useRef();

    useEffect(() => {
        input.current.focus();
        //searching for notes in local storage
        const storedNotes = localStorage.getItem("notas");
        if (storedNotes) {
            setNotas(JSON.parse(storedNotes));
        }

        return () => {};
    }, []);

    useEffect(() => {
        localStorage.setItem("notas", JSON.stringify(notas));
    }, [notas]);

    // Adiciona nova nota
    const handleClick = () => {
        const valor = input.current.value;
        if (valor === "") return;
        setNotas((prevNotas) => [...prevNotas, valor]);
        input.current.value = "";
        input.current.focus();
    };

    // Exclui uma nota
    const handleDelete = (index) => {
        const novasNotas = notas.filter((_, i) => i !== index);
        setNotas(novasNotas);
        input.current.focus();
    };

    return (
        <Box className="bloco-notas" sx={{ width: "25rem" }}>
            <Box className="bloco-header" sx={{ mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Bloco de Notas
                </Typography>
            </Box>
            <Stack
                component="form"
                noValidate
                autoComplete="off"
                spacing={2}
                sx={{ mb: 3 }}
            >
                <TextField
                    id="outlined-basic"
                    label="Note"
                    variant="outlined"
                    color="primary"
                    placeholder="Write your note"
                    fullWidth
                    inputRef={input}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault(); // evita comportamento padrão de form
                            handleClick();
                        }
                    }}
                />
                <Button
                    variant="contained"
                    endIcon={<EditIcon />}
                    fullWidth
                    onClick={handleClick}
                >
                    Take Note
                </Button>
            </Stack>
            {/* Lista de notas */}
            <Stack spacing={1}>
                {notas.length === 0 ? (
                    <Typography color="text.secondary">
                        Nenhuma nota salva.
                    </Typography>
                ) : (
                    notas.map((nota, index) => (
                        <Box
                            key={index}
                            sx={{
                                p: 2,
                                backgroundColor: "#f5f5f5",
                                borderRadius: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography color="textPrimary">{nota}</Typography>
                            <Tooltip title="Excluir">
                              <IconButton
                                  color="error"
                                  onClick={() => handleDelete(index)}
                              >
                                  <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                        </Box>
                    ))
                )}
            </Stack>
        </Box>
    );
};

export default BlocoNotas;
