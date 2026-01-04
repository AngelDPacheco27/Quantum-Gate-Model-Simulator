// src/measurement.js

import { isBitSet, getPartner, extractBit, insertBit } from './utils.js';
import { QuantumMemory } from './memory.js';

/* Permuted Congruential Generator (PCG) For Pseudo-Random Number or "seed" Generation */
class PCG {

    /* Initializes The PCG With An Optional Seed */
    constructor(seed, streamID) {

        /* If No Seed Is Provided, Use Crypto API To Generate One */
        if (seed === undefined) {
            const buffer = new BigUint64Array(1);
            crypto.getRandomValues(buffer);
            this.state = buffer[0];
        }

        /* If Seed Is Provided, Convert It To A BigInt */
        else {
            this.state = BigInt(seed);
        }

        /* Initialize The Increment With A Fixed Odd Number */
        this.inc = (BigInt(streamID) << 1n) | 1n;

        /* Warm Up The Generator By Discarding Initial Values */
        for(let i=0; i<10; i++) {
            this.nextUint32();
        }
    }

    /* Create a New PCG Instance As A Child Generator for Parallel Processing */
    spawnchild() {
        return new PCG(this.nextUint32());
    }

    /* Generates The Next 32-Bit Unsigned Integer In The Sequence */
    nextUint32() {
        const oldstate = this.state;
        this.state = oldstate * 6364136223846793005n + this.inc;
        const xorshifted = Number(((oldstate >> 18n) ^ oldstate) >> 27n) & 0xFFFFFFFF;
        const rot = Number(oldstate >> 59n) & 0x1F;
        return ((xorshifted >> rot) | (xorshifted << ((-rot) & 31))) >>> 0;
    }

    /* Generates A Random Floating-Point Number In The Range [0, 1) */
    nextFloat() {
        return this.nextUint32() / 4294967296; // 2^32
    }
}

/* Generate A Probability Distribution For Measuring The Quantum State */
export function generateDFs(QuantumMemory) {
    let pdf = new Float64Array(QuantumMemory.num_states);
    let memory = QuantumMemory.memory;
    let cdf = new Float64Array(QuantumMemory.num_states);

    /* Calculate The Probability For Each Basis State */
    for (let i = 0; i < QuantumMemory.num_states; i++) {
        let real = memory[2 * i];
        let imag = memory[2 * i + 1];
        pdf[i] = real * real + imag * imag;
    }

    /* Create The Cumulative Distribution Function (CDF) */
    cdf[0] = pdf[0];
    for (let i = 1; i < QuantumMemory.num_states; i++) {
        cdf[i] = cdf[i - 1] + pdf[i];
    }

    /* Ensure The CDF  Ends At 1.0 */
    cdf[QuantumMemory.num_states - 1] = 1.0;

    return { pdf: pdf, cdf: cdf };
}

/* Runs Multiple Measurement Shots On The Quantum Memory */
export function runShots(QuantumMemory, numShots, seed, streamID) {

}