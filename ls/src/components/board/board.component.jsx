import React from "react";
import { useState, ueef } from "react";

export default function Board() {
    let board = [];
    const rows = 9;
    const columns = 9;


    for(let i = 0; i < rows; i++){
        board.push([]);
        for (let j = 0; j < columns; j++) { 
            board[i].push({
               x: j,
               y: i,
               bombs: 0,
               isOpen: false,
               hasMine: false,
               hasFlag: false,
            });
        }    
    }
    
  return (
    <footer>
      <p>© D E I S @ I S EC</p>
    </footer>
  );
}
