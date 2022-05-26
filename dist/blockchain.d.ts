export interface Block {
    header: {
        nonce: number;
        blockHash: string;
    };
    payload: {
        sequence: number;
        timestamp: number;
        data: any;
        previousHash: string;
    };
}
export declare class BlockChain {
    #private;
    private readonly difficulty;
    private powPrefix;
    constructor(difficulty?: number);
    private createGenesisBlock;
    private get lastBlock();
    get chain(): Block[];
    private getPreviousBlockHash;
    createBlock(data: any): {
        sequence: number;
        timestamp: number;
        data: any;
        previousHash: string;
    };
    mineBlock(block: Block['payload']): {
        minedBlock: {
            payload: {
                sequence: number;
                timestamp: number;
                data: any;
                previousHash: string;
            };
            header: {
                nonce: number;
                blockHash: string;
            };
        };
        minedHash: string;
        shortHash: string;
        mineTime: number;
    };
    verifyBlock(block: Block): true | undefined;
    pushBlock(block: Block): Block[];
}
//# sourceMappingURL=blockchain.d.ts.map