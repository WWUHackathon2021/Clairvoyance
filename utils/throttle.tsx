// Limit a function to once per interval
export function throttle(callback:Function, time:number){
    let free:boolean = true;
    return function(this:any){
        if(free){
            callback.apply(this, arguments);
            free = false;
            setTimeout(() => {
                free = true;
            }, time);
        }
    }
}