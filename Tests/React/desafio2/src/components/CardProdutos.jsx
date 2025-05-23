import { useState } from "react";
import "./CardProduto.css" // Importa o CSS

const CardProduto = ({ produto, children }) => {
    const [mostrarDescricao, setMostrarDescricao] = useState(false);
    const [produtoState, setProdutoState] = useState(produto);

    const handleCompra = () => {
        if (produtoState.stock > 0) {
            setProdutoState((prev) => ({
                ...prev,
                stock: prev.stock - 1,
            }));
        }
    };

    return (
        <div
            className="produto-card"
            onMouseEnter={() => setMostrarDescricao(true)}
            onMouseLeave={() => setMostrarDescricao(false)}
        >
            {children}
            <div className="produto-info">
                <h2 className="produto-nome">{produtoState.nome}</h2>
                {mostrarDescricao && (
                    <p className="produto-descricao">
                        {produtoState.descricao}
                    </p>
                )}
                <p className="produto-stock">
                    Disponível: {produtoState.stock}
                </p>
                <p className="produto-preco">
                    R$ {produtoState.preco.toFixed(2)}
                </p>
                <button
                    className="produto-botao"
                    onClick={handleCompra}
                    disabled={produtoState.stock <= 0}
                >
                    {produtoState.stock <= 0 ? "Esgotado" : "Comprar agora"}
                </button>
            </div>
        </div>
    );
};

export default CardProduto;
