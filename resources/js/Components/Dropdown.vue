<!-- resources/js/Components/NordDropdown.vue -->
<template>
    <div class="relative">
        <!-- Trigger Slot -->
        <div @click="toggleOpen">
            <slot name="trigger" />
        </div>

        <!-- Overlay para cerrar al hacer clic fuera -->
        <div
            v-show="open"
            class="fixed inset-0 z-40"
            @click="open = false"
        ></div>

        <!-- Animación del dropdown -->
        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <div
                v-show="open"
                class="absolute z-50 mt-2 rounded-md shadow-lg"
                :class="[widthClass, alignmentClasses]"
                style="display: none"
            >
                <div
                    class="rounded-md ring-1 ring-black ring-opacity-5"
                    :class="contentClasses"
                    @click="open = false"
                >
                    <slot name="content" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Dropdown',
    props: {
        align: {
            type: String,
            default: 'right',
        },
        width: {
            type: [String, Number],
            default: '48',
        },
        contentClasses: {
            type: Array,
            default: () => ['py-1', 'bg-grayDark'],
        },
    },
    data() {
        return {
            open: false,
            closeOnEscapeHandler: null,
        };
    },
    computed: {
        widthClass() {
            // Sólo mapeamos 48; si necesitas más, añade más entradas
            return { '48': 'w-48' }[this.width.toString()] || '';
        },
        alignmentClasses() {
            if (this.align === 'left') {
                return 'origin-top-left left-0';
            } else if (this.align === 'right') {
                return 'origin-top-right right-0';
            } else {
                return 'origin-top';
            }
        },
    },
    methods: {
        toggleOpen() {
            this.open = !this.open;
        },
        closeOnEscape(e) {
            if (this.open && e.key === 'Escape') {
                this.open = false;
            }
        },
    },
    mounted() {
        this.closeOnEscapeHandler = (e) => this.closeOnEscape(e);
        document.addEventListener('keydown', this.closeOnEscapeHandler);
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.closeOnEscapeHandler);
    },
};
</script>
