const templateFunctions = {
    "Text": {
        "functionType": "Text",
        "value": null
    },
    "Render": {
        "functionType": "Render",
        "fields": [
            {
                "fieldType": "Operation",
                "value": null
            }
        ]
    },
    "Set": {
        "functionType": "Set",
        "fields": [
            {
                "fieldType": "Variable",
                "value": null
            },
            {
                "fieldType": "Operation",
                "value": null
            }
        ]
    }
}

const fieldAcceptedBlockTypes = {
    "Variable": [
        "Variable"
    ],
    "Operation": [
        "Number",
        "Variable",
        "Operation"
    ]
}

export { templateFunctions, fieldAcceptedBlockTypes };