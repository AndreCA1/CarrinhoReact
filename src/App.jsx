import React, { useState } from "react";

const produtosDisponiveis = [
  { id: 1, nome: "Camiseta", preco: 50 },
  { id: 2, nome: "Calça", preco: 100 },
  { id: 3, nome: "Tênis", preco: 200 },
];

export default function CarrinhoDeCompras() {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      //Retorna o item que satisfaz a condição (item.id === produto.id)
      const itemExistente = prev.find((item) => item.id === produto.id);
      if (itemExistente) {
        //Refaz o mapa dos itens, o que for = aumenta a qntd, o resto volta = 
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removerUmaUnidade = (produtoId) => {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        //remove o item que tenha quantidade <= 0
        .filter((item) => item.quantidade > 0)
    );
  };

  //.reduce passa pelo array e gera um resultado acumulativo, funciona pra operações matematicas, tranformar arrays em objetos e muitas outras funções
  const total = carrinho.reduce(
    //
    (total, item) => total + item.preco * item.quantidade, 0
  );

  //Conta a quantidade
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Produtos disponíveis</h1>
      <ul className="mb-6">
        {
          //mapea todos os produtos 
          produtosDisponiveis.map((produto) => (
            <li key={produto.id} className="mb-2">
              {produto.nome} - R$ {produto.preco}{" "}
              <button
                onClick={() => adicionarAoCarrinho(produto)}
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
              >
                Adicionar
              </button>
            </li>
          ))
        }
      </ul>

      <h2 className="text-lg font-semibold">Carrinho</h2>
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <ul className="mb-4">
          {carrinho.map((item) => (
            <li key={item.id}>
              {item.nome} - Quantidade: {item.quantidade}{" "}
              <button
                onClick={() => removerUmaUnidade(item.id)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Remover 1
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>Total de itens: {totalItens}</p>
      <p>Total: R$ {total}</p>
    </div>
  );
}
