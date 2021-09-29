
import * as React from 'react';
import { render } from 'react-dom';
import './style.scss';

/* 不可变性的优点（即不直接修改变量的值，而是使用新数据替换）
1.简单复杂的功能
例：回溯并复用游戏的历史记录
2.跟踪数据的改变
3.确定在React中何时重新渲染
*/

class App extends React.Component {
    render () {
        return <Game />
    };
}

/* Square */

class Square extends React.Component {

    /**
     * constructor 
     * 等于 es6中class 的constructor
     * 功能与小程序中的attached中类似
     */
    // constructor (props) {
    //     super(props);
    //     console.log('constructor')
    // }

    click () {
        this.props.onClick();
        console.log('Square点击事件')
    }

    render () {
        // this.props.onClick
        return (
            <button className="square" onClick={() => this.click()}>
                { this.props.value }
            </button>
        );
    }

    
    
}

/* 如果想写组件只包含一个render方法并不包含state，则使用函数组件更简单 */
// function Square (props) {
//     return (
//         <button className="square" onClick={props.onClick}>
//             { props.value }
//         </button>
//     )
// }
/* Square */


/* Board */
// class Board extends React.Component {

//     constructor (props) {
//         super(props);
        
//         this.state = {
//             squares: Array(9).fill(null),
//             xIsNext: true
//         }
//     }

//     handleClick (i) {
//         //不可变性的重要性
//         const squares = this.state.squares.slice();
//         if (calculateWinner(squares) || squares[i]) return;
//         squares[i] = this.state.xIsNext ? 'X' : 'O';
//         // this.state.squares[i] = 'X'
//         this.setState({
//             squares: squares,
//             xIsNext: !this.state.xIsNext
//         })
//     }

//     renderSquare (i) {
//         return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />
//     }

//     render () {
//         const winner = calculateWinner(this.state.squares);
//         let status;
    
//         if (winner) {
//             status = `Game Over: ${winner} win!`;
//         } else {
//             status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
//         }

//         return (
//             <div>
//                 <div>{ status }</div>
//                 <div className="board-row">
//                     {this.renderSquare(0)}
//                     {this.renderSquare(1)}
//                     {this.renderSquare(2)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(3)}
//                     {this.renderSquare(4)}
//                     {this.renderSquare(5)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(6)}
//                     {this.renderSquare(7)}
//                     {this.renderSquare(8)}
//                 </div>
//             </div>
//         );
//     }
// }

//提升后的
class Board extends React.Component {

    renderSquare (i) {
        return (
            <Square 
                value={this.props.squares[i]} 
                onClick={() => {
                    this.props.onClick(i);
                    console.log('board点击事件')
                }} 
            />
        )
    }

    render () {

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

/* Board */


class Game extends React.Component {
    constructor (props) {
        super(props);
        
        this.state = {
            history: [{
                squares: Array(9).fill(null)
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
                squares: squares
            }),
            xIsNext: !this.state.xIsNext
        })

        console.log(this.state.history, this.state.stepNumber)
    }

    jumpTo (step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) == 0
        })
    }

    render () {
        // const winner = calculateWinner(this.state.squares);
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)

        //渲染历史
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })
        

        let status;
    
        if (winner) {
            status = `Game Over: ${winner} win!`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }


        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares} 
                        onClick={(i) => {
                            this.handleClick(i);                    
                            console.log('Game点击事件');}
                        }
                    />
                </div>
                <div className="game-info">
                    <div className="status">{ status }</div>
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
        return squares[a];
      }
    }
    return null;
  }




render(<App />, window.document.getElementById('app'))