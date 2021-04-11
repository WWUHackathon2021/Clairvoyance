const useLocalStore = (key:string, defaultValue?:any) => [
    JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultValue)),
    (key:string, newValue:any) => localStorage.setItem(key, JSON.stringify(newValue))
];