const client = require("../index");
const RPCClient = require('@jskitty/bitcoin-rpc');
const express = require('express')
const app = express()
const http = require('http');
const fetch = require('node-fetch');
const port = 3310;

client.on("ready", async () => {

    let node = {
        "znz": { 
            status: "offline",
            synced: false,
            behind: 0,
            progress: "0%",
            blocks: 0,
            peers: 0,
            lastuptime: 0
        },
        "pivx": { 
            status: "offline",
            synced: false,
            behind: 0,
            progress: "0%",
            blocks: 0,
            peers: 0,
            lastuptime: 0
        },
        "fls": { 
            status: "offline",
            synced: false,
            behind: 0,
            progress: "0%",
            blocks: 0,
            peers: 0,
            lastuptime: 0
        },
        "dogec": { 
            status: "offline",
            synced: false,
            behind: 0,
            progress: "0%",
            blocks: 0,
            peers: 0,
            lastuptime: 0
        },
        "monk": { 
            status: "offline",
            synced: false,
            behind: 0,
            progress: "0%",
            blocks: 0,
            peers: 0,
            lastuptime: 0
        },
        "owo": { 
            status: "offline",
            synced: false,
            behind: 0,
            progress: "0%",
            blocks: 0,
            peers: 0,
            lastuptime: 0
        }
    }

    const RPCZNZ = new RPCClient(client.config.walletnodes.znz.user, client.config.walletnodes.znz.pass, client.config.walletnodes.znz.ip, client.config.walletnodes.znz.port)
    const RPCPIVX = new RPCClient(client.config.walletnodes.pivx.user, client.config.walletnodes.pivx.pass, client.config.walletnodes.pivx.ip, client.config.walletnodes.pivx.port)
    const RPCFLS = new RPCClient(client.config.walletnodes.fls.user, client.config.walletnodes.fls.pass, client.config.walletnodes.fls.ip, client.config.walletnodes.fls.port)
    const RPCDOGEC = new RPCClient(client.config.walletnodes.dogec.user, client.config.walletnodes.dogec.pass, client.config.walletnodes.dogec.ip, client.config.walletnodes.dogec.port)
    const RPCMONK = new RPCClient(client.config.walletnodes.monk.user, client.config.walletnodes.monk.pass, client.config.walletnodes.monk.ip, client.config.walletnodes.monk.port)
    const RPCOWO = new RPCClient(client.config.walletnodes.owo.user, client.config.walletnodes.owo.pass, client.config.walletnodes.owo.ip, client.config.walletnodes.owo.port)
    
    const globalresznz = await fetch('https://chainz.cryptoid.info/znz/api.dws?q=getblockcount');
    const globaldataznz = await globalresznz.text();
    
    const globalresdogec = await fetch('https://dogec.flitswallet.app/api/v1/');
    const globaldatadogec = await globalresdogec.json();
    
    const globalresfls = await fetch('https://fls.flitswallet.app/api/v1/');
    const globaldatafls = await globalresfls.json();
    
    const globalrespivx = await fetch('https://pivx.flitswallet.app/api/v1/');
    const globaldatapivx = await globalrespivx.json();
    
    const globalresmonk = await fetch('https://explorer.decenomy.net/coreapi/v1/coins/MONK/blocks?perPage=1&page=1');
    const globaldatamonk = await globalresmonk.json();
    
    const globalresowo = await fetch('https://explorer.decenomy.net/coreapi/v1/coins/OWO/blocks?perPage=1&page=1');
    const globaldataowo = await globalresowo.json();
    
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
    
    app.get('/monk/tx', function (req, res) {
        RPCMONK.call('listtransactions').then(otx => {
            res.json(otx)
        }).catch(err => {
            res.json(node.dogec)
        })
    })
    
    app.get('/owo/tx', function (req, res) {
        RPCOWO.call('listtransactions').then(otx => {
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
            if (blocks == globaldatadogec.backend.blocks) {
                node.dogec.synced = true
                node.dogec.behind = 0
                node.dogec.progress = "100%"
            } else if (globaldatadogec.backend.blocks - blocks < -1) {
                node.dogec.synced = true
                node.dogec.behind = 0
                node.dogec.progress = "100%"
            } else {
                node.dogec.synced = false
                node.dogec.behind = globaldatadogec.backend.blocks - blocks
                node.dogec.progress = (100.0 * blocks / globaldatadogec.backend.blocks).toFixed(2)
            }
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
            if (blocks == globaldatafls.backend.blocks) {
                node.fls.synced = true
                node.fls.behind = 0
                node.fls.progress = "100%"
            } else if (globaldatafls.backend.blocks - blocks < -1) {
                node.fls.synced = true
                node.fls.behind = 0
                node.fls.progress = "100%"
            } else {
                node.fls.synced = false
                node.fls.behind = globaldatafls.backend.blocks - blocks
                node.fls.progress = (100.0 * blocks / globaldatafls.backend.blocks).toFixed(2)
            }
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
            if (blocks == globaldatapivx.backend.blocks) {
                node.pivx.synced = true
                node.pivx.behind = 0
                node.pivx.progress = "100%"
            } else if (globaldatapivx.backend.blocks - blocks < -1) {
                node.pivx.synced = true
                node.pivx.behind = 0
                node.pivx.progress = "100%"
            } else {
                node.pivx.synced = false
                node.pivx.behind = globaldatapivx.backend.blocks - blocks
                node.pivx.progress = (100.0 * blocks / globaldatapivx.backend.blocks).toFixed(2)
            }
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
            if (blocks == globaldataznz) {
                node.znz.synced = true
                node.znz.behind = 0
                node.znz.progress = "100%"
            } else if (globaldataznz - blocks < -1) {
                node.znz.synced = true
                node.znz.behind = 0
                node.znz.progress = "100%"
            } else {
                node.znz.synced = false
                node.znz.behind = globaldataznz - blocks
                node.znz.progress = (100.0 * blocks / globaldataznz).toFixed(2)
            }
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
    
    
    
    
    
     
     function checkRPCMONK () {
        RPCMONK.call('getblockcount').then(blocks => {
          node.monk.status = "online"
          console.log("[MONK] RPC Response: " + blocks + ", Node status changed to " + node.monk.status)
          updateRPCMONK()
        }).catch(rpcErrorMONK)
      }
      
      checkRPCMONK()
      
      /* Fired repeatedly, updates node information periodically, if online */
      function updateRPCMONK() {
        if (node.monk.status === "online") {
          RPCMONK.call('getblockcount').then(blocks => {
            if (blocks == globaldatamonk.response[0].height) {
                node.monk.synced = true
                node.monk.behind = 0
                node.monk.progress = "100%"
            } else if (globaldatamonk.response[0].height - blocks < -1) {
                node.monk.synced = true
                node.monk.behind = 0
                node.monk.progress = "100%"
            } else {
                node.monk.synced = false
                node.monk.behind = globaldatamonk.response[0].height - blocks
                node.monk.progress = (100.0 * blocks / globaldatamonk.response[0].height).toFixed(2)
            }
            node.monk.blocks = blocks
            RPCMONK.call('getconnectioncount').then(conns => {
              node.monk.lastuptime = Math.floor(Date.now() / 1000);
              node.monk.peers = conns
              console.log("[MONK] RPC Updated: " + blocks + " blocks and " + conns + " peers")
            }).catch(rpcErrorMONK)
          }).catch(rpcErrorMONK)
        }
      }
      
      setInterval(updateRPCMONK, sec(10))
      
      /* Fired when the Monitor catches an RPC error */
      function rpcErrorMONK () {
        node.monk.status = "offline"
        console.error("[MONK] RPC Error: Node status changed to " + node.monk.status)
        setTimeout(checkRPCMONK, sec(60))
      }
    
    
    
    
      function checkRPCOWO () {
        RPCOWO.call('getblockcount').then(blocks => {
          node.owo.status = "online"
          console.log("[OWO] RPC Response: " + blocks + ", Node status changed to " + node.owo.status)
          updateRPCOWO()
        }).catch(rpcErrorOWO)
      }
      
      checkRPCOWO()
      
      /* Fired repeatedly, updates node information periodically, if online */
      function updateRPCOWO() {
        if (node.owo.status === "online") {
          RPCOWO.call('getblockcount').then(blocks => {
            if (blocks == globaldataowo.response[0].height) {
                node.owo.synced = true
                node.owo.behind = 0
                node.owo.progress = "100%"
            } else if (globaldataowo.response[0].height - blocks < -1) {
                node.owo.synced = true
                node.owo.behind = 0
                node.owo.progress = "100%"
            } else {
                node.owo.synced = false
                node.owo.behind = globaldataowo.response[0].height - blocks
                node.owo.progress = (100.0 * blocks / globaldataowo.response[0].height).toFixed(2)
            }
            node.owo.blocks = blocks
            RPCOWO.call('getconnectioncount').then(conns => {
              node.owo.lastuptime = Math.floor(Date.now() / 1000);
              node.owo.peers = conns
              console.log("[OWO] RPC Updated: " + blocks + " blocks and " + conns + " peers")
            }).catch(rpcErrorOWO)
          }).catch(rpcErrorOWO)
        }
      }
      
      setInterval(updateRPCOWO, sec(10))
      
      /* Fired when the Monitor catches an RPC error */
      function rpcErrorOWO () {
        node.owo.status = "offline"
        console.error("[OWO] RPC Error: Node status changed to " + node.owo.status)
        setTimeout(checkRPCOWO, sec(60))
      }
     
           
      /* Converts seconds into miliseconds */
      function sec (s) {
        return s * 1000
      }
});
