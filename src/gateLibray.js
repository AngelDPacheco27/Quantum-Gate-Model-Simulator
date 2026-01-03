// src/gateLibrary.js

/* Predefined Single-Qubit Gates As 8-Element Arrays Representing 2x2 Complex Matrices */

/* Identity Gate */
export const IdentityGate = [1.0, 0.0, 0.0, 0.0,
                            0.0, 0.0, 1.0, 0.0];

/* Pauli-X Gate */
export const PauliXGate = [0.0, 0.0, 1.0, 0.0,
                           1.0, 0.0, 0.0, 0.0];

/* Pauli-Y Gate */
export const PauliYGate = [0.0, 0.0, 0.0, -1.0,
                           0.0, 1.0, 0.0, 0.0];
                           
/* Pauli-Z Gate */
export const PauliZGate = [1.0, 0.0, 0.0, 0.0,
                           0.0, 0.0, -1.0, 0.0];

/* Hadamard Gate */
export const HadamardGate = [Math.SQRT1_2, 0.0, Math.SQRT1_2, 0.0,
                             Math.SQRT1_2, 0.0, -Math.SQRT1_2, 0.0];
                            
/* Phase Gate (S Gate) */
export const PhaseGate = [1.0, 0.0, 0.0, 0.0,
                          0.0, 0.0, 0.0, 1.0];

/* T Gate */
export const TGate = [1.0, 0.0, 0.0, 0.0,
                      0.0, 0.0, Math.SQRT1_2, Math.SQRT1_2];

