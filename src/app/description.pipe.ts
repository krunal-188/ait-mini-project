import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
    name:'summary'
})
export class DescriptionSummmary implements PipeTransform{
    transform(value:string, actuallength?:number, limit?:number){
        if(!value)
        return null;
        let actualLimit=(limit)?limit:50;
        if (actualLimit< actuallength || actualLimit>actuallength){
        return value.substr(0,20)+' ....';
        }
        else if(actualLimit == actuallength)
            return value.substr(0,actualLimit)
    }
}