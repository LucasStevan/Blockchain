"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BlockChain_chain;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockChain = void 0;
const helpers_1 = require("./helpers");
class BlockChain {
    constructor(difficulty = 4) {
        this.difficulty = difficulty;
        _BlockChain_chain.set(this, []);
        this.powPrefix = '0';
        __classPrivateFieldGet(this, _BlockChain_chain, "f").push(this.createGenesisBlock());
    }
    createGenesisBlock() {
        const payload = {
            sequence: 0,
            timestamp: +new Date(),
            data: 'Genesis Block',
            previousHash: ''
        };
        return {
            header: {
                nonce: 0,
                blockHash: (0, helpers_1.hash)(JSON.stringify(payload))
            },
            payload
        };
    }
    get lastBlock() {
        return __classPrivateFieldGet(this, _BlockChain_chain, "f").at(-1);
    }
    get chain() {
        return __classPrivateFieldGet(this, _BlockChain_chain, "f");
    }
    getPreviousBlockHash() {
        return this.lastBlock.header.blockHash;
    }
    createBlock(data) {
        const newBlock = {
            sequence: this.lastBlock.payload.sequence + 1,
            timestamp: +new Date(),
            data,
            previousHash: this.getPreviousBlockHash()
        };
        console.log('Created Block ${newBlock.sequence}: ${JSON.stringify(newBlock, null, 2)}');
        return newBlock;
    }
    mineBlock(block) {
        let nonce = 0;
        let startTime = +new Date();
        while (true) {
            const blockHash = (0, helpers_1.hash)(JSON.stringify(block));
            const proofingHash = (0, helpers_1.hash)(blockHash + nonce);
            if ((0, helpers_1.isHashProofed)({
                hash: proofingHash,
                difficulty: this.difficulty,
                prefix: this.powPrefix
            })) {
                const endTime = +new Date();
                const shortHash = blockHash.slice(0, 12);
                const mineTime = (endTime - startTime) / 1000;
                console.log(`Mined block ${block.sequence} in ${mineTime} seconds. Hash: ${shortHash} (${nonce} attempts)`);
                return {
                    minedBlock: { payload: Object.assign({}, block), header: { nonce, blockHash } },
                    minedHash: proofingHash,
                    shortHash,
                    mineTime
                };
            }
            nonce++;
        }
    }
    verifyBlock(block) {
        if (block.payload.previousHash !== this.getPreviousBlockHash()) {
            console.error(`Invalid block #${block.payload.sequence}: Previous block hash is "${this.getPreviousBlockHash().slice(0, 12)}" not "${block.payload.previousHash.slice(0, 12)}"`);
            return;
        }
        if (!(0, helpers_1.isHashProofed)({
            hash: (0, helpers_1.hash)((0, helpers_1.hash)(JSON.stringify(block.payload)) + block.header.nonce),
            difficulty: this.difficulty,
            prefix: this.powPrefix
        })) {
            console.error(`Invalid block #${block.payload.sequence}: Hash is not proofed, nonce ${block.header.nonce} is not valid`);
            return;
        }
        return true;
    }
    pushBlock(block) {
        if (this.verifyBlock(block))
            __classPrivateFieldGet(this, _BlockChain_chain, "f").push(block);
        console.log(`Pushed block #${JSON.stringify(block, null, 2)}`);
        return __classPrivateFieldGet(this, _BlockChain_chain, "f");
    }
}
exports.BlockChain = BlockChain;
_BlockChain_chain = new WeakMap();
//# sourceMappingURL=blockchain.js.map