interface ApiResponse<T> {
    statusCode: number,
    message?: string,
    data: T
}

interface Student {
    token: string,

    barcode: number,
    name: string,
    surname: string,

    group: {
        name: string
    }
}

export {
    Student,
    ApiResponse,
}