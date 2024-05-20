export function sorted_by_start_time(arr) {
    const ans = arr.sort((a,b) => {
        return new Date(a.start_time).getTime() - 
            new Date(b.start_time).getTime()
    });
    return ans;
}