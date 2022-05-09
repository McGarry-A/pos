export default {
    name: "product",
    type: "document",
    title: "Product",
    fields: [
        {
            name: "name",
            type: "string",
            title: "Name"
        },
        {
            name: "price",
            type: "number",
            title: "Price"
        },
        {
            name: "icon",
            type: "image", 
            title: "Icon"
        }
    ]
}