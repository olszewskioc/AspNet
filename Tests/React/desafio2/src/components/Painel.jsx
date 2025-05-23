const Painel = ({ children }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
                width: "100%",
                height: "100%",
                backgroundColor: "#0f0f0f",
            }}
        >
            {children}
        </div>
    );
};

export default Painel;
