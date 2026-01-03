// src/utils.js

/*BitshiftQubit To Check If A Specific Bit Is Set In An Integer*/
export function isBitSet(index, Qubit, shiftQubit) {
    return (index & shiftQubit) !== 0;
}

/*Function To Find The Partner Index*/
export function getPartner(index, Qubit, shiftQubit) {
    let partner_index = index ^ shiftQubit;
    return partner_index;
}

/*Function To Extract A Bit From An Integer*/
export function extractBit(index, Qubit) {
    return (index >> Qubit) & 1;
}

/*Function To Insert A Bit Into The Index At A Qubit Position; Allows For Faster Operations */
export function insertBit(index, Qubit, shiftQubit) {
    let mask = shiftQubit - 1;
    let lower_bits = index & mask;
    let higher_bits = (index & ~mask) << 1;
    return higher_bits | lower_bits;
}