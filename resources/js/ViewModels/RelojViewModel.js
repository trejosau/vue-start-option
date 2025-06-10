export default class RelojViewModel {
    constructor() {
        this.relojes = []
        this.tickInterval = null

        this.state = {
            showForm: false,
            modalAbierto: false,
            relojModal: null,
            editorAbierto: false,
            relojAEditar: null
        }
    }

    agregarReloj(reloj) {
        this.relojes.push(reloj)
    }

    iniciarTick() {
        this.tickInterval = setInterval(() => {
            this.relojes.forEach(reloj => reloj.tick())
        }, 1000)
    }

    detenerTick() {
        if (this.tickInterval) {
            clearInterval(this.tickInterval)
            this.tickInterval = null
        }
    }

    toggleForm() {
        this.state.showForm = !this.state.showForm
    }

    abrirModal(reloj) {
        if (reloj) {
            this.state.relojModal = reloj
            this.state.modalAbierto = true
        }
    }

    cerrarModal() {
        this.state.modalAbierto = false
        this.state.relojModal = null
    }

    abrirEditor(reloj) {
        if (this.state.editorAbierto && this.state.relojAEditar === reloj) {
            this.cerrarEditor()
        } else {
            this.state.editorAbierto = true
            this.state.relojAEditar = reloj
        }
    }

    cerrarEditor() {
        this.state.editorAbierto = false
        this.state.relojAEditar = null
    }


    agregarSegundosAReloj(reloj, segundos) {
        if (!reloj || !reloj.agregarSegundos) return
        reloj.agregarSegundos(segundos)
    }

    agregarSegundosModal(segundos) {
        if (this.state.relojModal) {
            this.agregarSegundosAReloj(this.state.relojModal, segundos)
        }
    }

    destruir() {
        this.detenerTick()
    }
}
