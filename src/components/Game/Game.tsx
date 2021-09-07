import React, { Props } from 'react';
import PropTypes from 'prop-types';
import styles from './Game.module.css';
import Board from '../Board/Board'
import {Menu, Input, Select, CheckboxOptionType} from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Option} = Select;

type GameProps = {
  test:number,
}

type GameState = {
  history: Array<GameHistoryElement>,
  xIsNext: boolean,
  stepNumber: number ,
  test: Array<string>,
}

type GameHistoryElement = 
{squares: Array<string>, squareNumberFilledInThisMove: number }

class Game extends React.Component<GameProps, GameState> {

  constructor(props: GameProps){
    super(props);
    this.state = { 
      history: [{
        squares:Array(9).fill(null),
        squareNumberFilledInThisMove: -1,
      }],
      xIsNext: true,
      stepNumber: 0,
      test : Array.from(Array(3).keys()).map((i) => 'Test ' +(i+1)),
    }
  }  

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.generateNextSymbol();
    this.setState({
      history: history.concat([{
        squares:squares,
        squareNumberFilledInThisMove: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    }); 
  }

  generateNextSymbol() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  jumpTo(step: number){
    this.setState({
      stepNumber: step,
      xIsNext: (step%2) ===0,
    })
  }

  render() {
    const history = this.state.history;
    const currentStepNumber = this.state.stepNumber;
    const current = history[currentStepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move?
        'Go to move ':
        'Go to game start';
      var currentMove = move ? generateColRowString(step) : '';
      const isCurrentStepNumber = history.length - 1 == move;
        return (
          <li key={move}  className={isCurrentStepNumber ? 'bold' : undefined}>
            <button 
            onClick={() => this.jumpTo(move)}
            className={isCurrentStepNumber ? 'bold' : undefined}
              >{desc}{currentMove}</button>
          </li>
        );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }else{
       status = 'Next player: ' + this.generateNextSymbol();
    }
  
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className='Test'>
        <Menu
        // onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="2">La al {this.state.test[0]}</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
      <Input placeholder="Suchparameter"/>
      <Select placeholder="Typ">
        <Option value="type 1">{this.state.test[0]}</Option>
        <Option value="type2">arg</Option>
      </Select>
      </div>
      </div>
      
    );
  }
}


export default Game;

function generateColRowString(step: GameHistoryElement) {
  return generateStringFromNumber(step.squareNumberFilledInThisMove);
  function generateStringFromNumber(i:number) {
    const rowThree = '3,' + (i - 5);
    const rowTwoOrThree = (i < 6 ? '2,' + (i - 2) : rowThree);
    const rowOneTwoOrThree = i < 3 ? '1,' + (i + 1) : rowTwoOrThree;
    const total = '(' + (rowOneTwoOrThree) + ')';
    return total;
  }
}

function calculateWinner(squares:Array<string>) {
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