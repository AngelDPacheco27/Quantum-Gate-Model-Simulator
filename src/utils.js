// src/utils.js

/*Bitmask To Check If A Specific Bit Is Set In An Integer*/
export function isBitSet(index, Qubit) {
    return (index & (1 << Qubit)) !== 0;
}

/*Function To Find The Partner Index*/
export function getPartner(index, Qubit) {
    let partner_index = index ^ (1 << Qubit);
    return partner_index;
}

/*Function To Extract A Bit From An Integer*/
export function extractBit(index, Qubit) {
    return (index >> Qubit) & 1;
}

/*Function To Insert A Bit Into The Index At A Qubit Position; Allows For Faster Operations */
export function insertBit(index, Qubit) {
    let mask = (1 << Qubit) - 1;
    let lower_bits = index & mask;
    let higher_bits = (index & ~mask) << 1;
    return higher_bits | lower_bits;
}