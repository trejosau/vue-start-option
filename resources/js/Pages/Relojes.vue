<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-fg leading-tight">Relojes Analógicos</h2>
        </template>
        <div class="min-h-screen bg-bg text-fg p-6 relative">

            <!-- Grid de relojes -->
            <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-4">
                <div
                    v-for="(reloj, idx) in viewModel.relojes"
                    :key="idx"
                    class="w-full max-w-sm bg-grayDark rounded-xl pt-4 pb-4 px-4 flex flex-col items-center shadow-lg mx-auto relative"
                >
                    <!-- Botón ojo, arriba derecha -->
                    <button
                        @click="viewModel.abrirModal(reloj)"
                        class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#3B4252] hover:bg-[#4C566A] transition shadow"
                        title="Ver"
                        style="z-index: 5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-[#88C0D0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"/>
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>

                    <!-- Contenido principal -->
                    <div class="flex flex-col items-center w-full">
                        <AnalogClock :reloj="reloj" />
                        <div class="mt-3 font-bold text-lg text-center break-words">{{ reloj.nombre }}</div>
                        <div
                            class="text-sm font-mono text-center"
                            :style="{ color: reloj.colorHoraDigital }"
                        >
                            {{ reloj.horaDigital }}
                        </div>
                    </div>

                    <!-- Botón pincel y dropdown -->
                    <div class="relative w-full flex flex-col items-center">
                        <button
                            @click="viewModel.abrirEditor(reloj)"
                            class="mt-6 w-12 h-12 flex items-center justify-center rounded-full bg-[#3B4252] hover:bg-[#4C566A] transition shadow"
                            title="Editar colores"
                            style="z-index: 5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-[#A3BE8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 19v2m6.5-11.5l-1 1M4 15l8.5-8.5a2.121 2.121 0 0 1 3 3L7 18H4v-3z" />
                            </svg>
                        </button>

                        <transition name="fade">
                            <div
                                v-if="viewModel.state.editorAbierto && viewModel.state.relojAEditar === reloj"
                                class="absolute left-1/2 top-full mt-2 -translate-x-1/2 z-50"
                                style="min-width: 270px;"
                            >
                                <RelojColorEditor :reloj="reloj" @close="viewModel.cerrarEditor" />
                            </div>
                        </transition>
                    </div>
                </div>
            </div>

            <!-- Botón flotante para agregar reloj -->
            <button
                class="fixed z-50 bottom-6 left-1/2 -translate-x-1/2 bg-[#88C0D0] text-[#2E3440] rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-4xl transition-transform duration-300 border-2 border-bg"
                :class="{ 'scale-110': viewModel.state.showForm }"
                @click="viewModel.toggleForm"
            >
                <span v-if="!viewModel.state.showForm">+</span>
                <span v-else class="text-2xl">×</span>
            </button>

            <!-- Formulario flotante para agregar reloj -->
            <transition name="fade">
                <div
                    v-if="viewModel.state.showForm"
                    class="fixed z-50 bottom-24 left-1/2 -translate-x-1/2"
                >
                    <RelojForm @add-reloj="agregarReloj"/>
                </div>
            </transition>

            <!-- MODAL de hora digital y botones -->
            <RelojHoraModal
                v-if="viewModel.state.modalAbierto"
                :reloj="viewModel.state.relojModal"
                @close="viewModel.cerrarModal"
            />
        </div>
    </AuthenticatedLayout>
</template>

<script>
import RelojForm from '@/Components/RelojForm.vue'
import AnalogClock from '@/Components/AnalogClock.vue'
import RelojHoraModal from '@/Components/RelojHoraModal.vue'
import RelojColorEditor from '@/Components/RelojColorEditor.vue'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import RelojViewModel from '@/viewmodels/RelojViewModel.js'

export default {
    name: 'Relojes',
    components: {
        RelojForm,
        AnalogClock,
        RelojHoraModal,
        RelojColorEditor,
        AuthenticatedLayout
    },
    data() {
        return {
            viewModel: new RelojViewModel()
        }
    },
    methods: {
        agregarReloj(reloj) {
            this.viewModel.agregarReloj(reloj)
            this.viewModel.state.showForm = false
        }
    },
    mounted() {
        this.viewModel.iniciarTick()
    },
    beforeUnmount() {
        this.viewModel.destruir()
    }
}
</script>
