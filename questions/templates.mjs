const blocks = {
    "Addition": {
        "blockType": "Operation",
        "operationName": "Addition",
        "fields": [
            {
                "fieldType": "Operation",
                "value": null
            },
            {
                "fieldType": "Operation",
                "value": null
            }
        ]
    },
    "Subtraction": {
        "blockType": "Operation",
        "operationName": "Subtraction",
        "fields": [
            {
                "fieldType": "Operation",
                "value": null
            },
            {
                "fieldType": "Operation",
                "value": null
            }
        ]
    },
    "Multiplication": {
        "blockType": "Operation",
        "operationName": "Multiplication",
        "fields": [
            {
                "fieldType": "Operation",
                "value": null
            },
            {
                "fieldType": "Operation",
                "value": null
            }
        ]
    },
    "Division": {
        "blockType": "Operation",
        "operationName": "Division",
        "fields": [
            {
                "fieldType": "Operation",
                "value": null
            },
            {
                "fieldType": "Operation",
                "value": null
            }
        ]
    },
    "Variable": {
        "blockType": "Variable",
        "variableName": null
    },
    "Number": {
        "blockType": "Number",
        "value": null
    }
}

const functions = {
    "Text": {
        "functionType": "Text",
        "content": null
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

export { blocks, functions };