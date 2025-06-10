<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50" @click="cerrarModal">
        <div class="bg-grayDark rounded-xl p-8 shadow-xl flex flex-col items-center min-w-[260px] relative" @click.stop>
            <button @click="cerrarModal"
                    class="absolute top-2 right-2 text-[#BF616A] hover:scale-110 text-2xl font-bold rounded-full w-8 h-8 flex items-center justify-center"
                    aria-label="Cerrar"
            >&times;</button>

            <div
                class="font-mono text-3xl mb-6 select-none"
                :style="{ color: reloj?.colorHoraDigital || '#88C0D0' }"
            >
                {{ reloj?.horaDigital}}
            </div>
            <div class="flex flex-col gap-4">
                <!-- Botones principales -->
                <div class="flex gap-8 justify-center">
                    <button
                        @click="tickMenos"
                        class="w-16 h-16 rounded-full bg-[#3B4252] text-[#A3BE8C] hover:bg-[#4C566A] text-3xl flex items-center justify-center font-bold shadow transition"
                        aria-label="Menos"
                    >-</button>
                    <button
                        @click="tickMas"
                        class="w-16 h-16 rounded-full bg-[#3B4252] text-[#88C0D0] hover:bg-[#4C566A] text-3xl flex items-center justify-center font-bold shadow transition"
                        aria-label="Más"
                    >+</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RelojHoraModal',
    props: {
        reloj: { type: Object, required: true }
    },
    emits: ['close'],
    methods: {
        cerrarModal() {
            this.$emit('close')
        },
        tickMas() {
            if (this.reloj && this.reloj.tick) {
                this.reloj.tick()
            }
        },
        tickMenos() {
            if (this.reloj && this.reloj.retroceder) {
                this.reloj.retroceder()
            }
        }
    }
}
</script>
