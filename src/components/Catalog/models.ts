export namespace CatalogModel{
    export interface State{
        open: boolean,
        modalImgInfo: any,
        months: Array<Month>,
        years: Array<string>,
        selectedMonth: string,
        selectedYear: string,
    }

    export interface Props{
        getImgs: any,
        monthImages: any,
        clearArray: any
    }
}

class Month {
    monthName: string = '';
    monthValue: string = ''
}
