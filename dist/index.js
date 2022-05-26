"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("./blockchain");
const difficulty = Number(process.argv[2]) || 4;
const blockchain = new blockchain_1.BlockChain(Number(process.argv[2] || 4));
const blockNumber = +process.argv[3] || 10;
let chain = blockchain.chain;
for (let i = 1; i <= blockNumber; i++) {
    const block = blockchain.createBlock(`Block ${i}`);
    const mineInfo = blockchain.mineBlock(block);
    chain = blockchain.pushBlock(mineInfo.minedBlock);
}
console.log('--- GENERATED CHAIN ---\n');
console.log(chain);
//# sourceMappingURL=index.js.map