// src/ALU.js
import { isBitSet, getPartner, extractBit, insertBit } from './utils.js';

/* Applies A Single-Qubit Gate To The Specified Qubit In The Quantum Memory */
function applyQubitGate(QuantumMemory, Qubit, Gate) {
    let loop_limit = QuantumMemory.num_states / 2;
    let memory = QuantumMemory.memory;
    let shiftQubit = 1 << Qubit;

    /* Localize Variables For Performance */
    let gateR00 = Gate[0];
    let gateI00 = Gate[1];
    let gateR01 = Gate[2];
    let gateI01 = Gate[3];
    let gateR10 = Gate[4];
    let gateI10 = Gate[5];
    let gateR11 = Gate[6];
    let gateI11 = Gate[7];

    /* Iterate Over All Relevant Basis States */
    for (let i = 0; i < loop_limit; i++) {

        /* Determine The Actual Basis State Indices */
        let stateIndexA = insertBit(i, Qubit, shiftQubit);
        let stateIndexB = getPartner(stateIndexA, Qubit, shiftQubit);

        /* Retrieve Current Amplitudes */
        let curRealA = memory[2 * stateIndexA];
        let curImagA = memory[2 * stateIndexA + 1];
        let curRealB = memory[2 * stateIndexB];
        let curImagB = memory[2 * stateIndexB + 1];

        /* Apply The Gate Transformation */
        let newRealA = ((gateR00*curRealA - gateI00*curImagA) + (gateR01*curRealB - gateI01*curImagB));
        let newImagA = ((gateR00*curImagA + gateI00*curRealA) + (gateR01*curImagB + gateI01*curRealB));
        let newRealB = ((gateR10*curRealA - gateI10*curImagA) + (gateR11*curRealB - gateI11*curImagB));
        let newImagB = ((gateR10*curImagA + gateI10*curRealA) + (gateR11*curImagB + gateI11*curRealB));

        /* Update The Quantum Memory With New Amplitudes */
        QuantumMemory.set_Amplitude(stateIndexA, newRealA, newImagA);
        QuantumMemory.set_Amplitude(stateIndexB, newRealB, newImagB);
    }
}