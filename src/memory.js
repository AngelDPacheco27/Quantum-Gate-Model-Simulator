// src/memory.js

/* QuantumMemory Class for managing quantum state memory */
class QuantumMemory {

    /* Initializes A New Quantum Memory For A Given Number Of Qubits */
    constructor(num_qubits) {
        this.num_qubits = num_qubits;
        this.num_states = 2 ** num_qubits;
        
        // Each State Has A Real And Imaginary Part
        this.memory = new Float64Array(this.num_states * 2);
        this.memory.fill(0);

        // Set The Initial State To |0...0>
        this.memory[0] = 1.0;
        return this.memory;
    }

    /* Resets The Quantum Memory To A Quantum Ground State */
    reset_Memory() {
        this.memory.fill(0);
        this.memory[0] = 1.0;
    }

    /* Returns The Current Amplitude Of A Given Basis State */
    get_Amplitude(stateIndex) {
        return {
            real: this.memory[2 * stateIndex],
            imag: this.memory[2 * stateIndex + 1]
        };
    }

    /* Sets The Amplitude Of A Given Basis State */
    set_Amplitude(stateIndex, real, imag) {
        this.memory[2 * stateIndex] = real;
        this.memory[2 * stateIndex + 1] = imag;
    }

    /* Validates The Quantum Memory State */
    validate_Memory() {
        let sum = 0.0;

        /* Calculate The Sum Of The Squares Of The Amplitudes */
        for (let i = 0; i < (this.num_states * 2); i += 2) {
            let real = this.memory[i];
            let imag = this.memory[i + 1];
            sum += real ** 2 + imag ** 2;
        }

        /* Check If The Sum Is Approximately Equal To 1 */
        return Math.abs(sum - 1.0) < 1e-10;
    }
}