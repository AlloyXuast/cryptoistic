const client = require("../index");
const RPCClient = require('@jskitty/bitcoin-rpc');
const express = require('express')
const app = express()
const http = require('http');
const port = 3310;

client.on("ready", async () => {

    let node = {
        "znz": { 
            status: "offline",
            blocks: 0,
            peers: 0,
            lastuptime: 0
        },
        "pivx": { 
            status: "offline",
            blocks: 0,
            peers: 0,
            lastuptime: 0
        },
        "fls": { 
            status: "offline",
            blocks: 0,
            peers: 0,
            lastuptime: 0
        },
        "dogec": { 
            status: "offline",
            blocks: 0,
            peers: 0,
            lastuptime: 0
        }
    }

    const RPCZNZ = new RPCClient(client.config.walletnodes.znz.user, client.config.walletnodes.znz.pass, client.config.walletnodes.znz.ip, client.config.walletnodes.znz.port)
    const RPCPIVX = new RPCClient(client.config.walletnodes.pivx.user, client.config.walletnodes.pivx.pass, client.config.walletnodes.pivx.ip, client.config.walletnodes.pivx.port)
    const RPCFLS = new RPCClient(client.config.walletnodes.fls.user, client.config.walletnodes.fls.pass, client.config.walletnodes.fls.ip, client.config.walletnodes.fls.port)
    const RPCDOGEC = new RPCClient(client.config.walletnodes.dogec.user, client.config.walletnodes.dogec.pass, client.config.walletnodes.dogec.ip, client.config.walletnodes.dogec.port)

    app.get('/', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.send("NODE WALLET API UP");
    })

    /* Initialize express server */
    app.get('/health', function (req, res) {
        res.json(node)
    })

    app.get('/pivx/tx', function (req, res) {
        RPCPIVX.call('listtransactions').then(otx => {
            res.json(otx)
        }).catch(err => {
            res.json(node.pivx)
        })
    })

    app.get('/pivx/cstx', function (req, res) {
        RPCPIVX.call('listcoldutxos').then(otx => {
            res.json(otx)
        }).catch(err => {
            res.json(node.pivx)
        })
    })

    app.get('/znz/tx', function (req, res) {
        RPCZNZ.call('listtransactions').then(otx => {
            res.json(otx)
        }).catch(err => {
            res.json(node.znz)
        })
    })

    app.get('/znz/cstx', function (req, res) {
        RPCZNZ.call('listcoldutxos').then(otx => {
            res.json(otx)
        }).catch(err => {
            res.json(node.znz)
        })
    })

    app.get('/fls/tx', function (req, res) {
        RPCFLS.call('listtransactions').then(otx => {
            res.json(otx)
        }).catch(err => {
            res.json(node.fls)
        })
    })

    app.get('/fls/cstx', function (req, res) {
        RPCFLS.call('listcoldutxos').then(otx => {
            res.json(otx)
        }).catch(err => {
            res.json(node.fls)
        })
    })

    app.get('/dogec/tx', function (req, res) {
        RPCDOGEC.call('listtransactions').then(otx => {
            res.json(otx)
        }).catch(err => {
            res.json(node.dogec)
        })
    })

    app.get('/dogec/cstx', function (req, res) {
        RPCDOGEC.call('listcoldutxos').then(otx => {
            res.json(otx)
        }).catch(err => {
            res.json(node.dogec)
        })
    })
   
    http.createServer(app).listen(port);



    function checkRPCDOGEC () {
        RPCDOGEC.call('getblockcount').then(blocks => {
          node.dogec.status = "online"
          console.log("[DOGEC] RPC Response: " + blocks + ", Node status changed to " + node.dogec.status)
          updateRPCDOGEC()
        }).catch(rpcErrorDOGEC)
      }
      
      checkRPCDOGEC()
      
      /* Fired repeatedly, updates node information periodically, if online */
      function updateRPCDOGEC() {
        if (node.dogec.status === "online") {
          RPCDOGEC.call('getblockcount').then(blocks => {
            node.dogec.blocks = blocks
            RPCDOGEC.call('getconnectioncount').then(conns => {
              node.dogec.lastuptime = Math.floor(Date.now() / 1000);
              node.dogec.peers = conns
              console.log("[DOGEC] RPC Updated: " + blocks + " blocks and " + conns + " peers")
            }).catch(rpcErrorDOGEC)
          }).catch(rpcErrorDOGEC)
        }
      }
      
      setInterval(updateRPCDOGEC, sec(10))
      
      /* Fired when the Monitor catches an RPC error */
      function rpcErrorDOGEC () {
        node.dogec.status = "offline"
        
        console.error("[DOGEC] RPC Error: Node status changed to " + node.dogec.status)
        setTimeout(checkRPCDOGEC, sec(60))
      }



    function checkRPCFLS () {
        RPCFLS.call('getblockcount').then(blocks => {
          node.fls.status = "online"
          console.log("[FLS] RPC Response: " + blocks + ", Node status changed to " + node.fls.status)
          updateRPCFLS()
        }).catch(rpcErrorFLS)
      }
      
      checkRPCFLS()
      
      /* Fired repeatedly, updates node information periodically, if online */
      function updateRPCFLS() {
        if (node.fls.status === "online") {
          RPCFLS.call('getblockcount').then(blocks => {
            node.fls.blocks = blocks
            RPCFLS.call('getconnectioncount').then(conns => {
              node.fls.lastuptime = Math.floor(Date.now() / 1000);
              node.fls.peers = conns
              console.log("[FLS] RPC Updated: " + blocks + " blocks and " + conns + " peers")
            }).catch(rpcErrorFLS)
          }).catch(rpcErrorFLS)
        }
      }
      
      setInterval(updateRPCFLS, sec(10))
      
      /* Fired when the Monitor catches an RPC error */
      function rpcErrorFLS () {
        node.fls.status = "offline"
        console.error("[FLS] RPC Error: Node status changed to " + node.fls.status)
        setTimeout(checkRPCFLS, sec(60))
      }

    function checkRPCPIVX () {
        RPCZNZ.call('getblockcount').then(blocks => {
          node.pivx.status = "online"
          console.log("[PIVX] RPC Response: " + blocks + ", Node status changed to " + node.pivx.status)
          updateRPCPIVX()
        }).catch(rpcErrorPIVX)
      }
      
      checkRPCPIVX()
      
      /* Fired repeatedly, updates node information periodically, if online */
      function updateRPCPIVX() {
        if (node.pivx.status === "online") {
          RPCPIVX.call('getblockcount').then(blocks => {
            node.pivx.blocks = blocks
            RPCPIVX.call('getconnectioncount').then(conns => {
              node.pivx.lastuptime = Math.floor(Date.now() / 1000);
              node.pivx.peers = conns
              console.log("[PIVX] RPC Updated: " + blocks + " blocks and " + conns + " peers")
            }).catch(rpcErrorPIVX)
          }).catch(rpcErrorPIVX)
        }
      }
      
      setInterval(updateRPCPIVX, sec(10))
      
      /* Fired when the Monitor catches an RPC error */
      function rpcErrorPIVX () {
        node.pivx.status = "offline"
        console.error("[PIVX] RPC Error: Node status changed to " + node.pivx.status)
        setTimeout(checkRPCPIVX, sec(60))
      }

    function checkRPCZNZ () {
        RPCZNZ.call('getblockcount').then(blocks => {
          node.znz.status = "online"
          console.log("[ZNZ] RPC Response: " + blocks + ", Node status changed to " + node.znz.status)
          updateRPCZNZ()
        }).catch(rpcErrorZNZ)
      }
      
      checkRPCZNZ()
      
      /* Fired repeatedly, updates node information periodically, if online */
      function updateRPCZNZ() {
        if (node.znz.status === "online") {
          RPCZNZ.call('getblockcount').then(blocks => {
            node.znz.blocks = blocks
            RPCZNZ.call('getconnectioncount').then(conns => {
              node.znz.lastuptime = Math.floor(Date.now() / 1000);
              node.znz.peers = conns
              console.log("[ZNZ] RPC Updated: " + blocks + " blocks and " + conns + " peers")
            }).catch(rpcErrorZNZ)
          }).catch(rpcErrorZNZ)
        }
      }
      
      setInterval(updateRPCZNZ, sec(10))
      
      /* Fired when the Monitor catches an RPC error */
      function rpcErrorZNZ () {
        node.znz.status = "offline"
        console.error("[ZNZ] RPC Error: Node status changed to " + node.znz.status)
        setTimeout(checkRPCZNZ, sec(60))
      }
           
      /* Converts seconds into miliseconds */
      function sec (s) {
        return s * 1000
      }
});