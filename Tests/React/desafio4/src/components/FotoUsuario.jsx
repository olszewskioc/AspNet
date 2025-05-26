const FotoUsuario = ({nick, alt, size}) => {
    console.log(nick)
    return (
        <img src={`https://github.com/${nick}.png`} alt={alt} width={size} height={size} style={{border: "1px solid #1aa1a1", borderRadius: "10%", boxShadow: '5px 10px 8px rgba(0,0,0,0.3)',}} />
    )
}

export default FotoUsuario;