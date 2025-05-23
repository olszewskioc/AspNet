
import './App.css'
import BemVindo from './components/BemVindo'
import CardProduto from './components/CardProdutos'
import CardUsuario from './components/CardUsuario'
import FotoProduto from './components/FotoProduto'
import FotoUsuario from './components/FotoUsuario'
import Painel from './components/Painel'
import produtos from './data/produtos'

function App() {

  return (
      <main id="App">
        {/* <BemVindo theme={style} message={"Olá Thiago"} />
        
        <Painel>
          <CardUsuario user={{name: 'Xingling', work: 'Computer Engineer'}} >
            <FotoUsuario url={'https://i.imgur.com/1bX5QH6.jpg'} />
          </CardUsuario>
          <CardUsuario user={{name: 'Xingwong', work: 'Civil Engineer'}} >
            <FotoUsuario url={'https://i.imgur.com/1bX5QH6.jpg'} />
          </CardUsuario>
          <CardUsuario user={{name: 'Xingwink', work: 'Engineer Engineer'}} >
            <FotoUsuario url={'https://i.imgur.com/1bX5QH6.jpg'} />
          </CardUsuario>
        </Painel> */}
        {produtos.map((produto) => {
          return (
            <CardProduto key={produto.id} produto={produto} >
              <FotoProduto url={produto.imagem} alt={'Foto Produto'} />
            </CardProduto>
          )
        })}
      </main>
  )
}

export default App
