<template>
    <div
        class="clock relative flex items-center justify-center"
        :style="{
      width: '180px',
      height: '180px',
      background: reloj.colorFondo,
      border: '4px solid ' + reloj.colorBorde
    }"
    >
        <!-- Números -->
        <div
            v-for="num in [12,3,6,9]"
            :key="num"
            :style="{ ...coord(num, 70, 1.1), color: reloj.colorNumeros }"
            class="font-bold select-none"
        >
            {{ num }}
        </div>
        <!-- Puntos -->
        <div
            v-for="num in [1,2,4,5,7,8,10,11]"
            :key="'dot-'+num"
            :style="{ ...coord(num, 78, 0.8), color: reloj.colorPuntos }"
            class="select-none"
        >•</div>
        <!-- Manecillas -->
        <div :style="hand('hora')" class="hand"></div>
        <div :style="hand('min')" class="hand"></div>
        <div :style="hand('sec')" class="hand"></div>
        <!-- Centro -->
        <div
            :style="{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '16px',
        height: '16px',
        background: reloj.colorBorde,
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 15
      }"
        ></div>
    </div>
</template>

<script>
export default {
    name: 'AnalogClock',
    props: { reloj: Object },
    methods: {
        coord(num, r, fontSize) {
            const angle = (num * 30 - 90) * Math.PI / 180;
            const x = 90 + r * Math.cos(angle);
            const y = 84 + r * Math.sin(angle);
            return {
                position: 'absolute',
                left: `calc(${x}px - ${fontSize * 0.55}em)`,
                top: `calc(${y}px - ${fontSize * 0.7}em)`,
                fontSize: fontSize + 'em',
                textAlign: 'center'
            }
        },
        hand(tipo) {
            const config = {
                hora: { deg: this.reloj.anguloHoras(), l: 46, w: 8, c: this.reloj.colorHora,    z: 9 },
                min:  { deg: this.reloj.anguloMinutos(), l: 72, w: 4, c: this.reloj.colorMinuto,  z:10 },
                sec:  { deg: this.reloj.anguloSegundos(), l: 82, w: 2, c: this.reloj.colorSegundo, z:11 }
            };
            const h = config[tipo];
            return {
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: h.l + 'px',
                height: h.w + 'px',
                background: h.c,
                borderRadius: (h.w/1) + 'px',
                transformOrigin: `${h.w/2}px 50%`,
                transform: `rotate(${h.deg}deg) translateY(-50%)`,
                transition: 'all 0.13s linear',
                zIndex: h.z
            }
        }
    }
}
</script>

<style scoped>
.clock {
    border-radius: 50%;
    box-shadow: 0 4px 28px 0 rgba(80,250,123,0.18);
    overflow: hidden;
}
</style>
