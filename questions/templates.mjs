const blocks = {
    "Addition": {
        "blockType": "Addition",
        "fields": [
            {
                "fieldType": "operation",
                "value": null
            },
            {
                "fieldType": "operation",
                "value": null
            }
        ]
    },
    "Subtraction": {
        "blockType": "Subtraction",
        "fields": [
            {
                "fieldType": "operation",
                "value": null
            },
            {
                "fieldType": "operation",
                "value": null
            }
        ]
    },
    "Multiplication": {
        "blockType": "Multiplication",
        "fields": [
            {
                "fieldType": "operation",
                "value": null
            },
            {
                "fieldType": "operation",
                "value": null
            }
        ]
    },
    "Division": {
        "blockType": "Division",
        "fields": [
            {
                "fieldType": "operation",
                "value": null
            },
            {
                "fieldType": "operation",
                "value": null
            }
        ]
    },
    "Variable": {
        "blockType": "Variable",
        "variableName": null
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
                "fieldType": "operation",
                "value": null
            }
        ]
    },
    "Set": {
        "functionType": "Set",
        "fields": [
            {
                "fieldType": "variable",
                "value": null
            },
            {
                "fieldType": "operation",
                "value": null
            }
        ]
    }
}

export { blocks, functions };