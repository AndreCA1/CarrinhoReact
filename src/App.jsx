import React, { useState } from "react";
import './App.css'

const produtosDisponiveis = [
  { id: 1, nome: "Camiseta", preco: 50 },
  { id: 2, nome: "Calça", preco: 100 },
  { id: 3, nome: "Tênis", preco: 200 },
];

export default function CarrinhoDeCompras() {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const itemExistente = prev.find((item) => item.id === produto.id);
      if (itemExistente) {
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
        .filter((item) => item.quantidade > 0)
    );
  };

  const total = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  return (
    <div className="container">
      <h1>Produtos disponíveis</h1>
      <ul className="produtos">
        {produtosDisponiveis.map((produto) => (
          <li key={produto.id} className="produto">
            <span>
              {produto.nome} - R$ {produto.preco}
            </span>
            <button onClick={() => adicionarAoCarrinho(produto)}>
              Adicionar
            </button>
          </li>
        ))}
      </ul>

      <h2>Carrinho</h2>
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <ul className="carrinho">
          {carrinho.map((item) => (
            <li key={item.id} className="item-carrinho">
              <span>
                {item.nome} - Quantidade: {item.quantidade}
              </span>
              <button onClick={() => removerUmaUnidade(item.id)}>
                Remover 1
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="total">Total de itens: {totalItens}</p>
      <p className="total">Total: R$ {total}</p>
    </div>
  );
}
