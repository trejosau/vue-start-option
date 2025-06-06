<template>
    <div class="bg-[#3B4252] border border-[#4C566A] rounded-xl px-4 py-3 inline-block">
        <div class="flex gap-2 items-center">
            <select
                v-model.number="hh"
                class="nord-select block w-18 h-12 rounded-md bg-[#3B4252] text-[#ECEFF4] border border-[#4C566A] font-mono text-base font-bold outline-none focus:border-[#81A1C1] appearance-none"
            >
                <option v-for="h in 24" :key="h" :value="h-1">
                    {{ (h-1).toString().padStart(2, '0') }}
                </option>
            </select>
            <span class="text-[#88C0D0]">:</span>
            <select
                v-model.number="mm"
                class="nord-select block w-18 h-12 rounded-md bg-[#3B4252] text-[#ECEFF4] border border-[#4C566A] font-mono text-base font-bold outline-none focus:border-[#81A1C1] appearance-none"
            >
                <option v-for="m in 60" :key="m" :value="m-1">
                    {{ (m-1).toString().padStart(2, '0') }}
                </option>
            </select>
            <span class="text-[#88C0D0]">:</span>
            <select
                v-model.number="ss"
                class="nord-select block w-18 h-12 rounded-md bg-[#3B4252] text-[#ECEFF4] border border-[#4C566A] font-mono text-base font-bold outline-none focus:border-[#81A1C1] appearance-none"
            >
                <option v-for="s in 60" :key="s" :value="s-1">
                    {{ (s-1).toString().padStart(2, '0') }}
                </option>
            </select>
        </div>
        <input type="hidden" :value="computedValue" @input="$emit('update:modelValue', computedValue)">
    </div>
</template>
<script>
export default {
    name: 'NordTimePicker',
    props: {
        modelValue: { type: String, default: '12:00:00' }
    },
    data() {
        const [h, m, s] = this.modelValue.split(':').map(x => Number(x) || 0)
        return { hh: h, mm: m, ss: s }
    },
    computed: {
        computedValue() {
            return [
                this.hh.toString().padStart(2, '0'),
                this.mm.toString().padStart(2, '0'),
                this.ss.toString().padStart(2, '0')
            ].join(':')
        }
    },
    watch: {
        modelValue(val) {
            const [h, m, s] = val.split(':').map(x => Number(x) || 0)
            this.hh = h
            this.mm = m
            this.ss = s
        },
        computedValue(val) {
            this.$emit('update:modelValue', val)
        }
    }
}
</script>

<style scoped>
.nord-select option {
    background: #2E3440;
    color: #ECEFF4;
}
.nord-select::-webkit-scrollbar {
    width: 8px;
    background: #3B4252;
}
.nord-select::-webkit-scrollbar-thumb {
    background: #81A1C1;
    border-radius: 5px;
}
</style>
