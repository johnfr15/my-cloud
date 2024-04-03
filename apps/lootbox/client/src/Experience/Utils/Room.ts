import { io }           from "socket.io-client"
import Experience       from "../Experience";
import Player           from "../World/Player";

export default class Room {
  private static _instance: Room | null; // Singleton

  // Class
  experience = Experience.Instance()
  players: { [key: string]: Player } = {}

  // State
  socket = io()

  constructor() {
    Room._instance = this
  }

  listen() {

    this.socket.on(`ready`, (players: Object) => {
      for (const socketID of Object.keys(players)) 
      {
        if (socketID !== this.socket.id)
        {
          this.players[socketID] = new Player(socketID)
        }
      }
    })

    this.socket.on("disconnect", () => {
      this.players = {}
    });
    this.socket.on("player disconnected", (socketID: string) => {
      delete this.players[socketID]
    })


    this.socket.on("player connected", (socketID: string) => {
      console.log("A new player has come: ", socketID)
      this.players[socketID] = new Player(socketID)
    })
    this.socket.on("keydown", (args: any) => {
      this.players[args.socketID].onKeydown(args.key)
    });
    this.socket.on("keyup", (args: any) => {
      this.players[args.socketID].onKeyup(args.key)
    });
    this.socket.on("move", (args: any) => {
      this.players[args.socketID].onMove(args)
    });
    
    this.socket.emit('ready');
  }

  public static Instance()
  {
    return this._instance || ( this._instance = new this() );
  }

  update() {
    Object.values(this.players).forEach((player) => player.update())
  }
}