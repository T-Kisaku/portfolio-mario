export const urlResolver = (url: string) => {
    return new URL(url, import.meta.url).pathname
}

export const publicUrlResolver = (url: string) => {
    return urlResolver(`../../public/${url}`)
}