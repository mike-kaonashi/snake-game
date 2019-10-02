import React, {Component} from 'react';
import Square from './Square.js';
import './Board.css';

class Board extends Component {


  constructor(props) {
    super(props);
    let size =  this.props.size;
    this.state = {
      matrix: [],
      snake: []
    }
    this.state.snake.push({
      x: Math.floor(size/2),
      y: Math.floor(size/2)
    })
    for(let i = 0; i < size; i++) {
      let squareStates = [];
      for(let j = 0; j < size; j++) {
        let check = this.isSnake(i,j)
        squareStates.push(check);
      }
      // this.state.matrix.push(items);
      this.state.matrix.push(squareStates);
    }
  }

  updateMatrix = (coord) => {
    let matrix = this.state.matrix;
    matrix[coord.x][coord.y] = true
    this.setState({
      matrix: matrix
    })
  }

  updateSnake = (ev) => {
    if(ev){
      let bx = 0;
      let by = 0;
      if(ev.keyCode === 38) {
        //left
        bx = -1;
        by = 0;
      } else if (ev.keyCode === 37) {
        //up
        bx = 0;
        by = -1;
      } else if (ev.keyCode === 40) {
        //right
        bx = 1;
        by = 0;
      } else if (ev.keyCode === 39) {
        //down
        bx = 0;
        by = 1;
      }
      let tmpSnake = this.state.snake;
      let head = tmpSnake.pop();
      let nextMoveX = (head.x + bx) >= this.props.size || (head.x + bx) < 0 ? head.x:head.x+bx;
      let nextMoveY = (head.y + by) >= this.props.size || (head.y + by) < 0 ? head.y:head.y+by;
      let mover = {
        x: nextMoveX,
        y: nextMoveY
      };
      tmpSnake.pop();
      tmpSnake.push(mover);
      this.setState({snake: tmpSnake});
      this.updateMatrix(mover)
      console.log(mover)
    }
    ev.preventDefault()
  };

  handler = ()=> {
    // this.setState
  }

  isSnake = (x,y)=>{
    let rs = false
    this.state.snake.forEach((item)=>{
      if(item.x === x && item.y === y) {
        rs = true
      }
    })
    return rs
  }

  render() {
    let boardSize = this.props.size;
    let boardRows = [];

    // this.updateSnake();
    for(let i = 0; i < boardSize; i++) {
      let items = [];
      for(let j = 0; j < boardSize; j++) {
        let check = this.isSnake(i,j)
        let curSquare = <Square x={i} y={j} snake={this.state.snake} mode={this.state.matrix[i][j]}/>;
        items.push(curSquare);
      }
      let rowElm = <div className="board-row">{items}</div>;
      boardRows.push(rowElm);
    }

    return (
      <div onKeyDown={ev=>this.updateSnake(ev)} tabIndex="0" >
        {boardRows}
      </div>
    )
  }
}

export default Board
