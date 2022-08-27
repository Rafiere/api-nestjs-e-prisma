export type BookDTO = {
    id?: string; //O ID será opcional pois ele será definido pelo banco de dados.
    title: string;
    description: string;
    bar_code: string;
};