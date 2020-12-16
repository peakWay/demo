
import * as React from 'react';
import { render } from 'react-dom';
import './style.scss';

class App extends React.Component {
    render () {
        return <Game />
    };
}

/* Square */
function Square (props) {
    return (
        <button className={`square ${props.highLight ? 'high-light' : ''}`} onClick={props.onClick}>
            { props.value }
        </button>
    )
}
/* Square */


/* Board */
//提升后的
class Board extends React.Component {

    renderSquare (i) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]} 
                highLight={ this.props.winnerLines.includes(i) }
                onClick={() => {
                    this.props.onClick(i);
                    console.log('board点击事件')
                }} 
            />
        )
    }

    render () {

        const row = Array(3).fill(null)
        const column = Array(3).fill(null)

        let board = row.map((r, i) => {

            let rowSquares = column.map((c, j) => {
                return this.renderSquare(i * 3 + j);
            });
            
            return (
                <div key={i} className="board-row">
                    { rowSquares }
                </div>
            );

        })

        console.log(board)

        return (
            <div>
                {board}
            </div>
        );
    }
}

/* Board */

// function RedText (props) {
//     return (
//         <span style={{color: 'red'}}>{ props.text }</span>
//     )
// }

class Game extends React.Component {
    constructor (props) {
        super(props);
        
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                currentIndex: null
            }],
            xIsNext: true,
            stepNumber: 0,
            
        };
    }

    handleClick (i) {
        console.log(this, i)
        let history = this.state.history.slice(0, this.state.stepNumber + 1);
        let current = history[history.length - 1];

        let squares =  current.squares.slice();
        if (calculateWinner(squares) || squares[i]) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';


        //同一个setState对象的位置不会影响history的值,仍是设置之前的值
        this.setState({
            stepNumber: history.length,
            history: history.concat({
                squares: squares,
                currentIndex: i
            }),
            xIsNext: !this.state.xIsNext,
            isDescOrder: false
        })

        console.log(this.state.history, this.state.stepNumber)
    }

    jumpTo (step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) == 0
        })
    }

    handleChangeSort () {
        this.setState({
            isDescOrder: !this.state.isDescOrder
        })
    }

    _buildRedText (props) {
        return (
            <span key={props.text} style={{color: 'red'}}>{ props.text }</span>
        )
    }


    render () {
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)

        //渲染历史
        const moves = history.map((step, move) => {
            console.log(step, 'step')

            let list = step.squares.reduce((prev, cur, index) => {
                if (cur) {
                    const pos = `(${(index + 1) % 3 || 3}, ${Math.ceil((index + 1) / 3)})`
                    prev = index == step.currentIndex ?
                        prev.concat(this._buildRedText({text: pos})) :
                        prev.concat(pos)
                }
                
                return prev
            }, [])
            
            const desc = move ?
                <span>{list}</span>:
                'Go to game start';
                
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)} >
                        {desc}
                    </button>
                </li>
            )
        })

        if (this.state.isDescOrder) moves.reverse();

        let status;
    
        if (winner) {
            status = `Game Over: ${winner.player} win!`;
        } else if (this.state.stepNumber == 9) {
            status = `Game Over: 平局`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }


        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares} 
                        winnerLines={ winner ? winner.line : [] }
                        onClick={(i) => {
                            this.handleClick(i);                    
                            console.log('Game点击事件');}
                        }
                    />
                </div>
                <div className="game-info">
                    <div className="status">{ status }</div>
                    <button onClick={() => this.handleChangeSort()}>{ this.state.isDescOrder ? '升序' : '降序' }</button>
                    <ol>{ moves }</ol>
                </div>
            </div>
        );
    }
    
}

//判断胜者
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
            line: lines[i],
            player: squares[a]
        };
      }
    }
    return null;
  }




render(<App />, window.document.getElementById('app'))