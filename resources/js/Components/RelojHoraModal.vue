<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div class="bg-grayDark rounded-xl p-8 shadow-xl flex flex-col items-center min-w-[260px] relative">
            <button @click="$emit('close')"
                    class="absolute top-2 right-2 text-[#BF616A] hover:scale-110 text-2xl font-bold rounded-full"
                    aria-label="Cerrar"
            >&times;</button>
            <div class="font-mono text-3xl text-[#88C0D0] mb-6 select-none">
                {{ reloj?.horaDigital }}
            </div>
            <div class="flex gap-8">
                <button
                    @mousedown="startHold('menos')"
                    @mouseup="stopHold"
                    @mouseleave="stopHold"
                    @touchstart="startHold('menos')"
                    @touchend="stopHold"
                    @touchcancel="stopHold"
                    class="w-14 h-14 rounded-full bg-[#3B4252] text-[#A3BE8C] hover:bg-[#4C566A] text-3xl flex items-center justify-center font-bold shadow transition"
                    aria-label="Menos"
                >-</button>
                <button
                    @mousedown="startHold('mas')"
                    @mouseup="stopHold"
                    @mouseleave="stopHold"
                    @touchstart="startHold('mas')"
                    @touchend="stopHold"
                    @touchcancel="stopHold"
                    class="w-14 h-14 rounded-full bg-[#3B4252] text-[#88C0D0] hover:bg-[#4C566A] text-3xl flex items-center justify-center font-bold shadow transition"
                    aria-label="Más"
                >+</button>
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
    data() {
        return {
            holdInterval: null
        }
    },
    methods: {
        tickMas() {
            this.reloj.tick && this.reloj.tick()
        },
        tickMenos() {
            this.reloj.retroceder && this.reloj.retroceder()
        },
        startHold(tipo) {
            if (tipo === 'mas') this.tickMas();
            else this.tickMenos();
            this.holdInterval = setInterval(() => {
                if (tipo === 'mas') this.tickMas();
                else this.tickMenos();
            }, 100);
        },
        stopHold() {
            clearInterval(this.holdInterval);
            this.holdInterval = null;
        }
    }
}
</script>
