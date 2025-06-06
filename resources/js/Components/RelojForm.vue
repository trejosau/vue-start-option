<template>
    <form @submit.prevent="crearReloj" class="flex flex-col gap-4 max-w-sm mx-auto bg-[#2E3440] p-6 rounded-xl border border-[#4C566A] shadow">
        <label class="text-[#88C0D0] font-bold mb-0">Nombre del reloj</label>
        <input
            v-model.trim="nombre"
            required
            maxlength="22"
            class="rounded px-2 py-3 bg-[#3B4252] text-[#ECEFF4] border border-[#4C566A] focus:border-[#81A1C1] outline-none"
            placeholder="Ej: Torreon Coahuila"
            autocomplete="off"
        />
        <label class="text-[#88C0D0] font-bold mb-0">Hora inicio</label>
        <NordTimePicker v-model="hora" />
        <button
            class="bg-[#88C0D0] text-[#2E3440] py-2 rounded font-bold hover:bg-[#81A1C1] transition"
        >Agregar</button>
    </form>
</template>

<script>
import Reloj from '@/models/Reloj.js'
import NordTimePicker from '@/Components/NordTimePicker.vue'

export default {
    name: 'RelojForm',
    components: { NordTimePicker },
    data() {
        return {
            nombre: '',
            hora: '12:00:00'
        }
    },
    methods: {
        crearReloj() {
            const [h, m, s] = this.hora.split(':').map(Number)
            const nuevo = new Reloj({
                nombre: this.nombre,
                horas: h,
                minutos: m,
                segundos: s
            })
            this.$emit('add-reloj', nuevo)
            this.nombre = ''
            this.hora = '12:00:00'
        }
    }
}
</script>
