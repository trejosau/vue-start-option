export default class Reloj {
    constructor({
                    nombre = '',
                    horas = 0,
                    minutos = 0,
                    segundos = 0,
                    colorHora = '#1256c6',
                    colorMinuto = '#ECEFF4',
                    colorSegundo = '#BF616A',
                    colorNumeros = '#88C0D0',
                    colorPuntos = '#81A1C1',
                    colorFondo = '#2E3440',
                    colorBorde = '#4C566A',
                    colorHoraDigital = '#88C0D0'
                } = {}) {
        this.nombre = nombre
        this._horas = Number(horas)
        this._minutos = Number(minutos)
        this._segundos = Number(segundos)
        this.colorHora = colorHora
        this.colorMinuto = colorMinuto
        this.colorSegundo = colorSegundo
        this.colorNumeros = colorNumeros
        this.colorPuntos = colorPuntos
        this.colorFondo = colorFondo
        this.colorBorde = colorBorde
        this.colorHoraDigital = colorHoraDigital
    }

    get horaDigital() {
        const hh = String(this._horas).padStart(2, '0')
        const mm = String(this._minutos).padStart(2, '0')
        const ss = String(this._segundos).padStart(2, '0')
        return `${hh}:${mm}:${ss}`
    }

    calcularAngulos() {
        return {
            rotacionHora: ((this._horas % 12) + this._minutos / 60) * 30,
            rotacionMinuto: this._minutos * 6 + this._segundos * 0.1,
            rotacionSegundo: this._segundos * 6
        };
    }

    tick() {
        this._segundos++;
        if (this._segundos >= 60) {
            this._segundos = 0;
            this._minutos++;
            if (this._minutos >= 60) {
                this._minutos = 0;
                this._horas = (this._horas + 1) % 24;
            }
        }
    }

    retroceder() {
        this._segundos--;
        if (this._segundos < 0) {
            this._segundos = 59;
            this._minutos--;
            if (this._minutos < 0) {
                this._minutos = 59;
                this._horas = (this._horas + 23) % 24;
            }
        }
    }

    setColor(prop, valor) {
        const validProps = [
            'colorHora', 'colorMinuto', 'colorSegundo',
            'colorNumeros', 'colorPuntos', 'colorFondo',
            'colorBorde', 'colorHoraDigital'
        ];
        if (validProps.includes(prop)) {
            this[prop] = valor;
        }
    }
}
