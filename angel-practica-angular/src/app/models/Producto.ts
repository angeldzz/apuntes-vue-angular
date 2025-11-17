export class Producto{
    constructor(
        public id: number,
        public nombre: string,
        public categoria: string,
        public precio: number,
        public stock: number,
    ) {}
}
