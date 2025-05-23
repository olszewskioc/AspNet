const CardUsuario = ({user, children}) => {
    return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)'
    }}>
        {children}
        <div>
            <h2>{user.name}</h2>
            <p>{user.work}</p>
        </div>
    </div>
    )
}

export default CardUsuario;