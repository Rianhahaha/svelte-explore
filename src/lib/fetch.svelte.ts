type Article = {
    id:number,
    title:string,
}

class Strapi {
    data = $state<any[]>([]);
    status = $state('idle');

    async get(url:string) {
        this.status ='loading';
        try {
            const res = await fetch(url);
            this.data = await res.json();
            this.status = 'success'
        } catch (e) {
            this.status = 'error'
        }
    }

}

export const strapi = new Strapi();