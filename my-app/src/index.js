import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Load mParticle 
(function (apiKey) {
        window.mParticle = window.mParticle || {EventType:{ Unknown:0,Navigation:1,Location:2,Search:3,Transaction:4,UserContent:5,UserPreference:6,Social:7,Other:8}};
        window.mParticle.eCommerce = { Cart: {} };
        window.mParticle.Identity = {};
        window.mParticle.config = window.mParticle.config || {};
        window.mParticle.config.isDevelopmentMode = true;

        // TMP configs for iOS 
        window.mParticle.config.useNativeSdk = true; 
        // window.mParticle.isIOS = true;

        window.mParticle.config.rq = [function(){
          /* eslint-disable  */
          window.mParticle.logEvent("Game Loaded", mParticle.EventType.Other, {"Game Name":"Tic Tac Toe"});
          /* eslint-enable  */
        }];
        window.mParticle.ready = function (f) {
            window.mParticle.config.rq.push(f);
        };

        /* eslint-disable  */
        function a(o, t) {
           return function() {
               t && (o = t + '.' + o);
               var e = Array.prototype.slice.call(arguments);
               e.unshift(o), 
               window.mParticle.config.rq.push(e)
           }
        }
        var x = ['endSession', 'logError', 'logEvent', 'logForm', 'logLink', 'logPageView', 'setSessionAttribute', 'setAppName', 'setAppVersion', 'setOptOut', 'setPosition', 'startNewSession', 'startTrackingLocation', 'stopTrackingLocation'],
           y = ['setCurrencyCode', 'logCheckout'],
           z = ['identify', 'login', 'logout', 'modify'];
        x.forEach(function(o) {
           window.mParticle[o] = a(o)
        }), y.forEach(function(o) {
           window.mParticle.eCommerce[o] = a(o, 'eCommerce')
        }), z.forEach(function(o) {
           window.mParticle.Identity[o] = a(o, 'Identity')
        });

       var mp = document.createElement('script');
       mp.type = 'text/javascript';
       mp.async = true;
       mp.src = ('https:' == document.location.protocol ? 'https://jssdkcdns' : 'http://jssdkcdn') + '.mparticle.com/js/v2/' + apiKey + '/mparticle.js';
       var s = document.getElementsByTagName('script')[0];
       s.parentNode.insertBefore(mp, s);
   })('API_KEY');
/* eslint-enable  */


/* Square - function component - meaning it's a full component but not a class */ 
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/* Board class */ 
class Board extends React.Component {

  constructor(props){
    super(props);

    // Initialize board state to have 9 empty squares (array)
    this.state = {
      numberOfMoves: 0,
      squares : Array(9).fill(null),
      xIsNext : true
    };
  }

  // Called by square - see the square props onClick() val
  handleClick(i) {

    // Grab current squares states 
    const squares = this.state.squares.slice();

    // Don't do anything if game is over or if square has already been clicked 
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // If game is in play then update square + square state
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    // Store state of squares to board 
    var numMoves = this.state.numberOfMoves + 1;
    this.setState({
      numberOfMoves : numMoves,
      squares : squares,
      xIsNext : !this.state.xIsNext
    });

    // Track square click 
    /* eslint-disable  */
    window.mParticle.logEvent("Square Clicked", mParticle.EventType.Other, {"Square Character" : squares[i], "Square Number" : i, "Move Number" : numMoves});
    /* eslint-enable  */
  }

  renderSquare(i) {
    // Render square based off boards square state 
    // Passes value to square AND handleClick function (parent/board function to square)
    return (
            <Square 
              value={this.state.squares[i]} 
              onClick={() => this.handleClick(i)}
            />
          );
  }

  render() {
    // Check if there's a winner 
    const winner = calculateWinner(this.state.squares);
    let status;

    // If winner then display the final text, otherwise update with turn 
    if (winner) {
      status = 'Winner: ' + winner;
      // Track square click 
    /* eslint-disable  */
    window.mParticle.logEvent("Game Over", mParticle.EventType.Other, {"Winner" : winner, "Total Moves" : this.state.numberOfMoves});
    /* eslint-enable  */
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
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

/* Game class */ 
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

/* Helper functions */ 

// Gets squares array, checks if winner, and returns X, O or Null 
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

// TODO: can add "time travel" -> https://reactjs.org/tutorial/tutorial.html#adding-time-travel
