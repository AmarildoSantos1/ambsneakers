import React from 'react';
import Cookies from 'js-cookie';

const FavoriteItem = ({ item, onRemove }) => {
  const handleRemove = async () => {
    try {
        let token = Cookies.get('token')
      // Faça uma requisição para o backend para remover o item favorito
      const response = await fetch(`http://localhost:3000/user_items/${item_id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, *',
          'Authorization': "Bearer " + token
        },
      });

      if (response.ok) {
        // Se a remoção for bem-sucedida, chame a função onRemove localmente
        onRemove(item_id);
      } else {
        // Trate erros ou exiba uma mensagem ao usuário, se necessário
        console.error('Erro ao remover item favorito');
      }
    } catch (error) {
      console.error('Erro ao comunicar com o backend', error);
    }
  };

  return (
    <div className="favorite-item">
      <span>{item.name}</span>
      <button onClick={handleRemove}>Remover dos Favoritos</button>
    </div>
  );
};

export default FavoriteItem;
