// Package main implements file reading functionality.
package main

import (
	"encoding/json"
	"os"
)

// ReadFileDefinition defines the read_file tool which can read the contents of a file.
var ReadFileDefinition = ToolDefinition{
	Name:        "read_file",
	Description: "Read the contents of a given relative file path. Use this when you want to see ewhat's insice a file. Do not use this with directory names.",
	InputSchema: ReadFileInputSchema,
	Function:    ReadFile,
}

// ReadFileInput defines the parameters needed for the read_file operation.
type ReadFileInput struct {
	Path string `json:"path" jsonschema_description:"The relative path of the fle in the working directory"`
}

// ReadFileInputSchema is the JSON schema for the read_file tool's input parameters.
var ReadFileInputSchema = GenerateSchema[ReadFileInput]()

// ReadFile reads the contents of a file at the given path and returns it as a string.
func ReadFile(input json.RawMessage) (string, error) {
	readFileInput := ReadFileInput{}
	err := json.Unmarshal(input, &readFileInput)
	if err != nil {
		return "", err
	}
	content, err := os.ReadFile(readFileInput.Path)
	if err != nil {
		return "", err
	}
	return string(content), nil
}
