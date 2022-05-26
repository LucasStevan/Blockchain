/// <reference types="node" />
import { BinaryLike } from 'crypto';
export declare function hash(data: BinaryLike): string;
export declare function isHashProofed({ hash, difficulty, prefix }: {
    hash: string;
    difficulty?: number;
    prefix?: string;
}): boolean;
//# sourceMappingURL=helpers.d.ts.map