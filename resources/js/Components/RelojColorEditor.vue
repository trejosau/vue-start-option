<template>
    <div class="bg-gray-800 rounded-xl shadow-xl p-4 z-40 flex flex-col gap-3 min-w-[240px]">
        <div
            v-for="item in colorProps"
            :key="item.prop"
            class="flex items-center gap-3"
        >
            <label class="flex-1 text-sm text-[#ECEFF4] font-semibold">
                {{ item.label }}
            </label>
            <input
                type="color"
                :value="reloj[item.prop]"
                @input="cambiarColor(item.prop, $event.target.value)"
                class="w-8 h-8 p-0 border-none bg-transparent"
                :style="{ background: reloj[item.prop], borderRadius: '0.5em' }"
            />
            <span class="ml-1 text-xs font-mono text-[#88C0D0]">{{ reloj[item.prop] }}</span>
        </div>
        <!-- Botón cerrar editor -->
        <button
            @click="$emit('close')"
            class="mt-4 bg-[#BF616A] hover:bg-[#d55] rounded-lg px-4 py-2 text-white font-bold self-end transition"
        >Cerrar</button>
    </div>
</template>

<script>
export default {
    name: 'RelojColorEditor',
    props: {
        reloj: { type: Object, required: true }
    },
    data() {
        return {
            colorProps: [
                { prop: 'colorHora',    label: 'Manecilla Hora'    },
                { prop: 'colorMinuto',  label: 'Manecilla Minuto'  },
                { prop: 'colorSegundo', label: 'Segundero'         },
                { prop: 'colorNumeros', label: 'Números'           },
                { prop: 'colorPuntos',  label: 'Puntos'            },
                { prop: 'colorFondo',   label: 'Fondo'             },
                { prop: 'colorBorde',   label: 'Borde'             },
            ]
        }
    },
    methods: {
        cambiarColor(prop, value) {
            this.reloj.setColor(prop, value)
        }
    }
}
</script>
