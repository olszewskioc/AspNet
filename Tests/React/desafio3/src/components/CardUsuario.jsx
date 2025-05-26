import '../styles/CardUsuario.css'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const handleClick = (link) => {
    // navigate to the link in blank page
    window.open(link, '_blank');
}

const CardUsuario = ({user, handleEdit, children}) => {
    return (
    <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '5px 5px 25px rgba(12,130,252,0.5)',
        backgroundColor: "#f9f9f9",
    }}>
        <IconButton style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                }}
                aria-label="editar"
                onClick={() => handleEdit()}>
            <EditIcon />
        </IconButton>
        {/* Foto do usuário é esperada como children */}
        {children}
        <div>
            <h2 className="titulo-nome">{user.name}</h2>
            <p className="bio">{user.bio}</p>
        </div>
        {/* Botão para redirecionamento dinâmico de acordo com o link do github disposto */}
        <button style={{backgroundColor: "#0a0a0a", padding: "1rem", cursor: "pointer", borderRadius: "15px"}} onClick={() => handleClick(`https://github.com/${user.nick}`)}>
            Conhecer mais
        </button>
    </div>
    )
}

export default CardUsuario;